import * as CryptoJS from 'crypto-js';

require('dotenv').config();

export const encrypt = async (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(text, process.env.KEY).toString();
  return ciphertext.replace(/\//g, ':');
}

export const decrypt = async (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext.replace(':', '/'), process.env.KEY);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}

export const hash = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 14; i++) {
        result += characters.charAt(Math.floor(Math.random() * 14));
    }
    return result;
}
