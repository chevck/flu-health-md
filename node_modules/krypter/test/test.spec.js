const test = require('ava');
const Crypt = require('../index.js');

test.before('setting before hook', t =>{
  t.context.crypt = new Crypt();
})

test('should be able to encrypt a string', t => {
  let sample = 'encrypt me';
  let encrypted = t.context.crypt.encrypt(sample);
  let decrypted = t.context.crypt.decrypt(encrypted.encryptedData, encrypted.key, encrypted.iv );
  t.assert(sample === decrypted);
})

test('should be able to encrypt a complex string', t => {
  let sample = 'encrypt this ≈∫∫åø≤∂¬∑ø¨¬œ';
  let encrypted = t.context.crypt.encrypt(sample);
  let decrypted = t.context.crypt.decrypt(encrypted.encryptedData, encrypted.key, encrypted.iv );
  t.assert(sample === decrypted);
})

test('should be able to encrypt a emoji string', t => {
  let sample = '🤷‍♂️😎👻🤖';
  let encrypted = t.context.crypt.encrypt(sample);
  let decrypted = t.context.crypt.decrypt(encrypted.encryptedData, encrypted.key, encrypted.iv );
  t.assert(sample === decrypted);
})

test('should throw an error for missing iv', async t => {
  let sample = 'encrypt me';
  let encrypted = t.context.crypt.encrypt(sample);
  const error = await t.throwsAsync(async() => {
    t.context.crypt.decrypt(encrypted.encryptedData, encrypted.key, '')
  });
  t.assert(error.message === 'iv is required to decrypt the string')
})

test('should throw an error for missing key', async t => {
  let sample = 'encrypt me';
  let encrypted = t.context.crypt.encrypt(sample);
  const error = await t.throwsAsync(async() => {
    t.context.crypt.decrypt(encrypted.encryptedData, '', encrypted.iv)
  });
  t.assert(error.message === 'key is required to decrypt the string')
})