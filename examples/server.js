const { GetServer } = require('../');

const serverConfigs = {
    token: 'mySecretToken123!',
    ips: null,
    port: 3031,
    basePath: '/easyPay'
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

const EasyPayServer = GetServer(serverConfigs, onCheck, onPayment);

EasyPayServer.start(); // this will start an express server

// if you want to inject the routes to your own express server you can user
/*
 const router = EasyPayServer.getRouter();
 myApp.use(router);
*/

// if you want to use the SDK functions on your own check examples/sdk.js