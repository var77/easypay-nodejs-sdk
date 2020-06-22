const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getIp } = require('./utils');
const GetEasyPaySDK = require('./sdkFactory');

function GetServer (configs, onCheck, onPayment) {

    const { token, ips, port = 8080, host = '127.0.0.1', basePath = '/' } = configs;

    const SDK = GetEasyPaySDK({ token, ips }, onCheck, onPayment);

    const app = express();

    const _checkHandler = (req, res) => {
        try {
            const response = SDK.checkHandler(req.body, req.params.productId, getIp(req));
            res.json(response);
        } catch (err) {
            console.error(err);
            res.send({ error: err.message });
        }
    }

    const _paymentHandler = (req, res) => {
        try {
            const response = SDK.paymentHandler(req.body, req.params.productId, getIp(req));
            res.json(response);
        } catch (err) {
            console.error(err);
            res.json({ error: err });
        }
    }

    const _getRouter = () => {
        const router = express.Router()
        router.post('/:productId/check', _checkHandler);
        router.post('/:productId/payment', _paymentHandler);

        return router;
    }

    const _start = (cb = () => null) => {
        app.use(bodyParser.json());
        app.use(cors());

        const router = _getRouter();

        app.use(basePath, router);

        app.listen(port, host, () => {
            console.log(`🚀 EasyPay API Started on http://${host}:${port}`);
            console.log(`🚀 Check url is http://${host}:${port}${basePath}/:productId/check`);
            console.log(`🚀 Payment url is http://${host}:${port}${basePath}/:productId/payment`);
            cb();
        });
    }

    return {
        start: _start,
        getRouter: _getRouter
    };

}

module.exports = GetServer;