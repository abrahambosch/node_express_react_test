var request = require('request');
var VisaAPIClient = require('../libs/visaapiclient.js');
var config = require('../config/configuration.json');
var req = request.defaults();
var randomstring = require('randomstring');


function MyVisaCheckoutHelper() {};

var MyVisaCheckoutHelper = {
    constructor: MyVisaCheckoutHelper,

    getPaymentData: function(callId, callback, failCallback) {
        var visaAPIClient = new VisaAPIClient();

            var baseUri = 'wallet-services-web/';
            var resourcePath = 'payment/data/{callId}';
            resourcePath = resourcePath.replace('{callId}', callId);
            var queryParams = 'apikey=' + config.apiKey;
            visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, '', 'GET', {},
                function(err, response, body) {
                    if(!err) {
                        callback(JSON.parse(body));
                    } else {
                        //response.statusCode
                        failCallback(err, response, body);
                    }
                }
            );
    },


    updatePaymentInfo: function(callId, orderInfo, callback, failCallback) {
        var visaAPIClient = new VisaAPIClient();
        var updatePaymentInfoRequest = JSON.stringify({
            "orderInfo": orderInfo
        });

        var baseUri = 'wallet-services-web/';
        var resourcePath = 'payment/info/{callId}';
        resourcePath = resourcePath.replace('{callId}', callId);
        var queryParams = 'apikey=' + config.apiKey;
        visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, updatePaymentInfoRequest, 'PUT', {},
            function(err, responseCode, body) {
                if(!err) {
                    callback(JSON.parse(body));
                } else {
                    failCallback(err, response, body);
                }
            }
        );
    },

    completePurchase: function(callId, orderInfo, callback, failCallback) {
        var visaAPIClient = new VisaAPIClient();
        var updatePaymentInfoRequest = JSON.stringify({
            "orderInfo": orderInfo
            // "payInfo": {
            //     eventType: 'Capture',
            //     eventStatus:
            // }
        });

        var baseUri = 'wallet-services-web/';
        var resourcePath = 'payment/info/{callId}';
        resourcePath = resourcePath.replace('{callId}', callId);
        var queryParams = 'apikey=' + config.apiKey;
        visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, updatePaymentInfoRequest, 'PUT', {},
            function(err, responseCode, body) {
                if(!err) {
                    callback(body);
                } else {
                    failCallback(err, response, body);
                }
            }
        );
    }


};




module.exports = MyVisaCheckoutHelper;


var getPaymentDataResponseSample = {
    "paymentRequest": {
        "currencyCode": "USD",
        "total": "10"
    },
    "userData": {
        "userFirstName": "Abraham",
        "userLastName": "Bosch",
        "userFullName": "Abraham Bosch",
        "userName": "abraham.bosch@panasonic.aero",
        "userEmail": "abraham.bosch@panasonic.aero",
        "encUserId": "ub84UjW3u3RnLu1P6UFb7QaRF+ujpEpvSH4s2gkdzTQ="
    },
    "creationTimeStamp": 1494024174734,
    "paymentInstrument": {
        "id": "1onRbAbKqFMVEtbCJ9+mPeW1qIQlaPBABrKtNvJHlnY=",
        "lastFourDigits": "1111",
        "binSixDigits": "411111",
        "billingAddress": {
            "personName": "Abraham Bsoch",
            "firstName": "Abraham",
            "lastName": "Bsoch",
            "line1": "4200 Park Newport Apt 213",
            "city": "Newport Beach",
            "stateProvinceCode": "CA",
            "postalCode": "92660",
            "countryCode": "US",
            "phone": "7142251330",
            "default": false
        },
        "verificationStatus": "VERIFIED",
        "expired": false,
        "cardArts": {
            "cardArt": [
                {
                    "baseImageFileName": "https://sandbox.secure.checkout.visa.com/VmeCardArts/MPCOeeROV7zHu760yEhiXP_HIAB_Op3NpC8O-Jt5rAk.png",
                    "height": 105,
                    "width": 164
                }
            ]
        },
        "issuerBid": "null",
        "nameOnCard": "Abraham Bsoch",
        "cardFirstName": "Abraham",
        "cardLastName": "Bsoch",
        "expirationDate": {
            "month": "01",
            "year": "2020"
        },
        "paymentType": {
            "cardBrand": "VISA"
        }
    },
    "shippingAddress": {
        "id": "qNyt3ymn+f3IKm8J//9LiXM/7P3DrDo5/ZRdzAZYUEk=",
        "verificationStatus": "VERIFIED",
        "nickName": "Abraham Bosch",
        "personName": "Abraham Bsoch",
        "firstName": "Abraham",
        "lastName": "Bsoch",
        "line1": "4200 Park Newport Apt 213",
        "city": "Newport Beach",
        "stateProvinceCode": "CA",
        "postalCode": "92660",
        "countryCode": "US",
        "phone": "7142251330",
        "default": false
    },
    "riskData": {
        "advice": "UNAVAILABLE",
        "score": 0,
        "avsResponseCode": "0",
        "cvvResponseCode": "0",
        "ageOfAccount": 0
    },
    "visaCheckoutGuest": false,
    "partialShippingAddress": {
        "countryCode": "US",
        "postalCode": "92660"
    }
};


var getPaymentDataResponseSample2 = {
    "paymentRequest": {"currencyCode": "USD", "total": "10"},
    "userData": {
        "userFirstName": "Abraham",
        "userLastName": "Bosch",
        "userFullName": "Abraham Bosch",
        "userName": "abraham.bosch@panasonic.aero",
        "userEmail": "abraham.bosch@panasonic.aero",
        "encUserId": "ub84UjW3u3RnLu1P6UFb7QaRF+ujpEpvSH4s2gkdzTQ="
    },
    "creationTimeStamp": 1494024174734,
    "paymentInstrument": {
        "id": "1onRbAbKqFMVEtbCJ9+mPeW1qIQlaPBABrKtNvJHlnY=",
        "lastFourDigits": "1111",
        "binSixDigits": "411111",
        "billingAddress": {
            "personName": "Abraham Bsoch",
            "firstName": "Abraham",
            "lastName": "Bsoch",
            "line1": "4200 Park Newport Apt 213",
            "city": "Newport Beach",
            "stateProvinceCode": "CA",
            "postalCode": "92660",
            "countryCode": "US",
            "phone": "7142251330",
            "default": false
        },
        "verificationStatus": "VERIFIED",
        "expired": false,
        "cardArts": {
            "cardArt": [{
                "baseImageFileName": "https://sandbox.secure.checkout.visa.com/VmeCardArts/MPCOeeROV7zHu760yEhiXP_HIAB_Op3NpC8O-Jt5rAk.png",
                "height": 105,
                "width": 164
            }]
        },
        "issuerBid": "null",
        "nameOnCard": "Abraham Bsoch",
        "cardFirstName": "Abraham",
        "cardLastName": "Bsoch",
        "expirationDate": {"month": "01", "year": "2020"},
        "paymentType": {"cardBrand": "VISA"}
    },
    "shippingAddress": {
        "id": "qNyt3ymn+f3IKm8J//9LiXM/7P3DrDo5/ZRdzAZYUEk=",
        "verificationStatus": "VERIFIED",
        "nickName": "Abraham Bosch",
        "personName": "Abraham Bsoch",
        "firstName": "Abraham",
        "lastName": "Bsoch",
        "line1": "4200 Park Newport Apt 213",
        "city": "Newport Beach",
        "stateProvinceCode": "CA",
        "postalCode": "92660",
        "countryCode": "US",
        "phone": "7142251330",
        "default": false
    },
    "riskData": {
        "advice": "UNAVAILABLE",
        "score": 0,
        "avsResponseCode": "0",
        "cvvResponseCode": "0",
        "ageOfAccount": 0
    },
    "visaCheckoutGuest": false,
    "partialShippingAddress": {"countryCode": "US", "postalCode": "92660"}
};




