const fs = require('fs');
const Wallet = require('ethereumjs-wallet').default;  // Try with .default first

// Adjust the path to your keystore file (one directory up)
const keystorePath = '../keystore.json';

try {
  const keystoreData = fs.readFileSync(keystorePath, 'utf8');
  const keystore = JSON.parse(keystoreData);
  
  // Decrypt the keystore with your password ("kim99!!")
  const wallet = Wallet.fromV3(keystore, 'kim99!!', true);

  // Try to extract the private key using several methods:
  if (typeof wallet.getPrivateKey === 'function') {
    console.log('Private Key: 0x' + wallet.getPrivateKey().toString('hex'));
  } else if (wallet.privKey) {
    console.log('Private Key: 0x' + wallet.privKey.toString('hex'));
  } else if (typeof wallet.getPrivateKeyString === 'function') {
    console.log('Private Key: ' + wallet.getPrivateKeyString());
  } else {
    console.log('Unable to extract the private key. Wallet object keys:', Object.keys(wallet));
  }
} catch (err) {
  console.error('Error decrypting keystore:', err);
}
