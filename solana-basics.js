// solana-basics.js
import * as web3 from '@solana/web3.js';

const CLUSTER = 'devnet'; // ← bytt til 'mainnet-beta' senere hvis du vil
const connection = new web3.Connection(
  web3.clusterApiUrl(CLUSTER),
  'confirmed'
);

async function main() {
  // 1. Generer en ny lommebok (bare for testing – IKKE bruk i produksjon!)
  const payer = web3.Keypair.generate();
  console.log("Ny public key:", payer.publicKey.toBase58());

  // 2. Be om airdrop (kun devnet & testnet)
  try {
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      1 * web3.LAMPORTS_PER_SOL   // 1 SOL
    );
    await connection.confirmTransaction(airdropSignature);
    console.log("Airdrop gjennomført! ✅");
  } catch (err) {
    console.log("Airdrop feilet (mulig rate limit):", err.message);
  }

  // 3. Sjekk saldo
  const balance = await connection.getBalance(payer.publicKey);
  console.log(`Saldo: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
}

main().catch(err => console.error("Feil:", err));
main().catch(err => console.error("Feil:", err));
