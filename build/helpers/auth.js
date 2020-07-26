"use strict";

var _require = require('dotenv'),
    config = _require.config;

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

config();
var algorithm = 'aes-256-cbc';
var key = crypto.randomBytes(32);
var iv = crypto.randomBytes(16);

function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher["final"]()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

function decrypt(text) {
  var ivt = Buffer.from(text.iv, 'hex');
  var encryptedText = Buffer.from(text.encryptedData, 'hex');
  var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivt);
  var decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher["final"]()]);
  return decrypted.toString();
}

function generateId(_ref, size) {
  var text = _ref.text;
  var character = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = "".concat(text);

  for (var index = size; index > 0; index -= 1) {
    result += character[Math.floor(Math.random() * character.length)];
  }

  var uniqueString = crypto.createHash('sha256').update(result, 'utf8').digest('hex');
  return uniqueString.toLowerCase();
}

function generateToken(_ref2) {
  var id = _ref2.id;
  return jwt.sign({
    id: id
  }, process.env.JWT_KEY, {
    expiresIn: '24h'
  });
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  generateId: generateId,
  generateToken: generateToken
};