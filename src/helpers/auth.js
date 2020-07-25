const { config } = require('dotenv');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

config();

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
}

function decrypt(text) {
  const ivt = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivt);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

function generateId({ text }, size) {
  const character = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = `${text}`;

  for (let index = size; index > 0; index -= 1) {
    result += character[Math.floor(Math.random() * character.length)];
  }

  const uniqueString = crypto
    .createHash('sha256')
    .update(result, 'utf8')
    .digest('hex');

  return uniqueString.toLowerCase();
}

function generateToken({ id }) {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '24h' });
}

module.exports = {
  encrypt,
  decrypt,
  generateId,
  generateToken,
};
