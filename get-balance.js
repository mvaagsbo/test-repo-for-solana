// get-balance.js
const web3 = require("@solana/web3.js");

async function getBalance() {
  // Koble til Solana Devnet (gratis og trygg for testing)
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  // Erstatt med din egen wallet-adresse (public key) – finn den i Phantom eller solana CLI
  const publicKey = new web3.PublicKey("DinPublicKeyHer11111111111111111111111111111"); // ← ENDRE DENNE!

  try {
    const balanceLamports = await connection.getBalance(publicKey);
    const balanceSol = balanceLamports / web3.LAMPORTS_PER_SOL;

    console.log("Hei fra Solana Devnet!");
    console.log(`Adresse: ${publicKey.toBase58()}`);
    console.log(`Balance: ${balanceSol} SOL (${balanceLamports} lamports)`);
    console.log("Dato:", new Date().toLocaleString());
  } catch (err) {
    console.error("Feil ved henting av balance:", err);
  }
}

getBalance();
