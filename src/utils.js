const md5 = require('md5');

const getCheckSum = (token, properties = []) => md5(token + properties.join(''));

const getCheckSumForCheck = (token, payload) => getCheckSum(token, [...payload.Inputs, payload.Lang]);

const getCheckSumForPayment = (token, payload) => {
    const amount = payload.Amount.toString();
    return getCheckSum(token, [...payload.Inputs, amount, payload.TransactID]);
};

exports.getIp = (req) => {
    const ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // if the request will pass multiple proxies the ips will be comma separated strings ip,ip
    return ips.split(',')[0];
};

exports.isTrustedIp = (ips, ip) => {    
    if (!ips || ips.length === 0) return true;

    return ips.includes(ip);
};

exports.isValidChecksum = (payload, token, action) => {
    const checksum = action === 'check' ? getCheckSumForCheck(token, payload) : getCheckSumForPayment(token, payload);
    return checksum === payload.Checksum;
};

exports.getCheckSum = getCheckSum;