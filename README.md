# EasyPay Nodejs SDK

### Attention this is not an official SDK

## Installation

`yarn add https://github.com/var77/easypay-nodejs-sdk`

### Use as a server
```
const { GetServer } = require('easypay-nodejs-sdk');

const serverConfigs = {
    token: 'mySecretToken123!', // your easyPay token
    ips: null, // if set to null the ip check won't be done // default is [easyPayIps]
    port: 8080, // port the server will listen default is 3031
    host: '0.0.0.0', // host the server will bind default is 127.0.0.1
    basePath: '/easyPay' // base path for the requests default is /
};

const onCheck = (payload, productId, ip) => {
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

const onPayment = (payload, productId, ip) => {
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

const EasyPayServer = GetServer(serverConfigs, onCheck, onPayment);

EasyPayServer.start();
```

### Use as standalone SDK

```
const { GetSDK } = require('easypay-nodejs-sdk');

const SDKConfigs = {
    token: 'mySecretToken123!' // your easyPay token,
    ips: null
};

const onCheck = (payload) => {
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

const onPayment = (payload) => {
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
});

console.log(checkResponse);

const paymentResponse = SDK.paymentHandler({
    "Inputs":["2011","","",""],
    "Amount": "1000.0",
    "TransactID":"48055030",
    "Currency": "AMD",
    "Checksum":"38719b84c6d9d4515eb22e77a6b6343d", 
    "DtTime":"2017-06-23T16:06:56",
    "Lang": "hy"
});

console.log(paymentResponse);
```


### TODO

 - Add Tests
