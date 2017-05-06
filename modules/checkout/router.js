var express = require('express')
var router = express.Router();
var path    = require("path");

var MyVisaCheckoutHelper = require('./libs/MyVisaCheckoutHelper.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
// define the about route
router.get('/getPaymentData', function (req, res) {
    if (typeof req.query.callId == 'undefined') {
        res.status(400).json({status: 'error', error: "callId is missing. "});
    }
    MyVisaCheckoutHelper.getPaymentData(req.query.callId, function(data){   // success
        console.log("MyVisaCheckoutHelper.getPaymentData call was successfull.", data);
        res.json({status: 'success', data: data});
    }, function(error, response, body) { // error
        console.log("MyVisaCheckoutHelper.getPaymentData call failed.", error, response, body);
        res.status(400).json({status: 'error', error: error});
    });
});

router.get('/updatePaymentInfo', function (req, res) {
    if (typeof req.query.callId == 'undefined') {
        res.status(400).json({status: 'error', error: "callId is missing. "});
    }

    var orderInfo = {
        "currencyCode": "USD",
        "discount": "5.25",
        "eventType": "Confirm",
        "giftWrap": "10.1",
        "misc": "3.2",
        "orderId": "testorderID",
        "promoCode": "testPromoCode",
        "reason": "Order Successfully Created",
        "shippingHandling": "5.1",
        "subtotal": "80.1",
        "tax": "7.1",
        "total": "101"
    };


    MyVisaCheckoutHelper.updatePaymentInfo(req.query.callId, orderInfo, function(data){   // success
        console.log("MyVisaCheckoutHelper.updatePaymentInfo call was successfull.", data);
        res.json({status: 'success', data: data});
    }, function(error, response, body) { // error
        console.log("MyVisaCheckoutHelper.updatePaymentInfo call failed.", error, response, body);
        res.status(400).json({status: 'error', error: error});
    });
});

module.exports = router