```sh
 +-+-+-+-+-+-+-+
 |k|r|y|p|t|e|r|
 +-+-+-+-+-+-+-+
```

A node wrapper around the native crypto module which uses the below capabilities
- Algorithm: aes-256-cbc
- default key and iv generation
- **Crypt** main class
- **encrypt** method
- **decrypt** method



#### 🗝 Installation
```sh
npm i --save krypter
```


#### 🗝 Example Usage
```js
const Crypt = require('krypter');
const crypt = new Crypt();

let sample = "encrypt this string";

let encrypted = crypt.encrypt(sample);
console.log(encrypted);
/* 
{ iv: '38f2e0d02ad4fa9a2f862ee639f50427',
  key:
   '0189c23d14a571f04747de0c1c4cc4c65353c55978842e6c7901b3c9e13158e7',
  encryptedData:
   '765de3e7d2fe601b74a1c9c9fff9e46d01b2d31b7b420302eff23b27f73469e7' }
*/

let decrypted = crypt.decrypt(encrypted.encryptedData, 
                            encrypted.key, 
                            encrypted.iv);
console.log(decrypted);
/*
encrypt this string
*/
```

#### 🗝 Release History
- 1.0.0 Initial Release

#### 🗝 keywords
crypto, encryption, decryption, encrypt, decrypt, security
