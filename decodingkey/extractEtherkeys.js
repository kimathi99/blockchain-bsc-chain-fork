const { Wallet } = require('ethers');
const fs = require('fs');

async function main() {
  // Adjust the path to your keystore file. Here we assume it's one level up.
  const keystore = fs.readFileSync('../keystore.json', 'utf8');
  // Use your password "kim99!!" to decrypt the keystore.
  const wallet = await Wallet.fromEncryptedJson(keystore, 'kim99!!');
  console.log('Private Key:', wallet.privateKey);
}

main().catch((err) => {
  console.error('Error extracting private key:', err);
});

