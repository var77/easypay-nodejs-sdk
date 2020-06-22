const { GetSDK } = require('../');

const SDKConfigs = {
    token: 'mySecretToken123!'
};

const onCheck = (payload, ip) => {
    console.log('Check passed return product info');
    console.log('Payload is::', payload);
    console.log('Ip is::', ip);

    // get your order info here

    return {
        message: 'Գործողությունը թույլատրված է։',
        properties: [
            {
                key: 'Օգտատեր',
                value: 'Անուն Ազգանուն'
            },
            {
                key: 'ID',
                value: '1234'
            }
        ]
    }
}

const onPayment = (payload, ip) => {
    console.log('Payment check passed return order info');
    console.log('Payload is::', payload);
    console.log('Ip is::', ip);

    // process your order here

    return {
        message: 'Գործարքը կատարված է:',
        properties: [
            {
                key: 'Գործարքի համար',
                value: 'TZ:123123421'
            }
        ]
    }
}

const SDK = GetSDK(SDKConfigs, onCheck, onPayment);

const checkResponse = SDK.checkHandler({
    "Checksum":"91aa5b55b7023274cb1afdf49a0be30a", 
    "Inputs":["2011","","",""],
    "Currency":"AMD",
    "Lang":"hy"
}, '127.0.0.1');

console.log(checkResponse);

const paymentResponse = SDK.paymentHandler({
    "Inputs":["2011","","",""],
    "Amount": "1000.0",
    "TransactID":"48055030",
    "Currency": "AMD",
    "Checksum":"38719b84c6d9d4515eb22e77a6b6343d", 
    "DtTime":"2017-06-23T16:06:56",
    "Lang": "hy"
}, '127.0.0.1');

console.log(paymentResponse);