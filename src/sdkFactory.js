const { isTrustedIp, isValidChecksum, getCheckSum } = require('./utils');
const { invalidIpError, invalidChecksumError } = require('./errors');

const nop = () => null;

const defaultIPs = [ 
    '81.16.2.55', 
    '185.44.228.240', 
    '212.42.207.83'
];

function EasyPaySDKFactory (configs = {}, onCheck = nop, onPayment = nop) {
    const { token, ips = defaultIPs } = configs;

    const authorizeRequest = (payload, ip, action) => {
        if (!isTrustedIp(ips, ip))
            throw invalidIpError(ip);

        if (!isValidChecksum(payload, token, action))
            throw invalidChecksumError(payload.Checksum);
    }

    const checkHandler = (payload, ip) => {
        authorizeRequest(payload, ip, 'check');
        const { message = 'Գործողությունը թույլատրված է։', properties = [] } = onCheck(payload, ip);

        return {
            ResponseMessage: message,
            ResponseCode: 0,
            Checksum: getCheckSum(token, [JSON.stringify(properties)]),
            PropertyList: properties
        };
    }
    
    const paymentHandler = (payload, ip) => {
        authorizeRequest(payload, ip, 'payment');
        const { message = 'Ընդունված է։', properties = [] } = onPayment(payload, ip);

        return {
            ResponseMessage: message,
            ResponseCode: 0,
            Checksum: getCheckSum(token, [payload.DtTime]), 
            PropertyList: properties,
            DtTime: payload.DtTime
        };
    }

    return {
        checkHandler,
        paymentHandler
    }
}

module.exports = EasyPaySDKFactory;