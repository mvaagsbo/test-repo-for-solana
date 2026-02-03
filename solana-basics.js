// solana-basics.js
import * as web3 from '@solana/web3.js';

const CLUSTER = 'devnet'; // bytt til 'mainnet-beta' senere hvis ønskelig

const connection = new web3.Connection(
  web3.clusterApiUrl(CLUSTER),
  'confirmed'
);

async function main() {
  // 1. Generer en ny lommebok (kun for testing – IKKE BRUK I PRODUKSJON!)
  const player = web3.Keypair.generate();
  console.log("Ny public key:", player.publicKey.toBase58());

  // 2. Be om airdrop (kun devnet & testnet)
  try {
    console.log("Ber om 1 SOL airdrop...");
    const airdropSignature = await connection.requestAirdrop(
      player.publicKey,
      1 * web3.LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature, 'confirmed');
    console.log("Airdrop gjennomført! ✅", airdropSignature);
  } catch (err) {
    console.log("Airdrop feilet (ofte rate limit):", err.message);
  }

  // 3. Sjekk saldo
  try {
    const balance = await connection.getBalance(player.publicKey);
    console.log(`Saldo: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.error("Feilet ved henting av saldo:", err);
  }
}

main().catch(err => {
  console.error("Noe gikk galt i main():", err);
});
