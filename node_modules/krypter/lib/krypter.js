const crypto = require('crypto');


class Crypt {
  /*
  Crypt class which is a wrapper around crypto module
  */

  constructor(key, iv){
    this.key = key || crypto.randomBytes(32);
    this.iv = iv || crypto.randomBytes(16);
    this.algorithm = 'aes-256-cbc';
  }

  encrypt(text){
    /*
    @param: {text} String : string to be encrypted
    @return: {Object}
    */
    let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
  
    return { 
      iv: this.iv.toString('hex'),
      key: this.key.toString('hex'),
      encryptedData: encrypted.toString('hex') 
    };

  }

  decrypt(text, key, iv){
    /*
    @param: {text} String: encryted string
    @param: {key} String: key used during encryption
    @param: {iv} String: iv used during encryption
    @return: String
    */
    if (!iv){
      throw new Error('iv is required to decrypt the string');
    }
    else if (!key){
      throw new Error('key is required to decrypt the string')
    }
    else {
      let _iv = Buffer.from(iv, 'hex');
      let _key = Buffer.from(key, 'hex');
      let encryptedText = Buffer.from(text, 'hex');
      let decipher = crypto.createDecipheriv(this.algorithm, _key, _iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString();
    }

  }
}

module.exports = Crypt;