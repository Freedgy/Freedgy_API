const CryptoJS = require("crypto-js")

exports.Encrypt = function(str, KE) {
    return CryptoJS.AES.encrypt(str, KE).toString();
}