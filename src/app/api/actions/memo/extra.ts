import { PublicKey } from "@solana/web3.js";

export const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  "nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5" // devnet wallet
);

export const DEFAULT_SOL_AMOUNT: number = 1.0;

// NOTE: Working
//
// export const POST = async (req: Request) => {
//   try {
//     const body: ActionPostRequest = await req.json();

//     console.log("Received request", body);
//     let account: PublicKey;
//     try {
//       account = new PublicKey(body.account);
//     } catch (error) {
//       return Response.json("Invalid account provided", {
//         status: 400,
//         headers: ACTIONS_CORS_HEADERS,
//       });
//     }

//     const transaction = new Transaction();
//     transaction.add(
//       // note: 'createPostResponse requires at least 1 non-memo instruction
//       ComputeBudgetProgram.setComputeUnitPrice({
//         microLamports: 1000,
//       }),
//       new TransactionInstruction({
//         programId: new PublicKey(MEMO_PROGRAM_ID),
//         data: Buffer.from("this is a simple memo message", "utf8"),
//         keys: [],
//       })
//     );

//     const connection = new Connection(
//       process.env.NEXT_PUBLIC_RPC || clusterApiUrl("devnet")
//     );

//     transaction.feePayer = account;
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash()
//     ).blockhash;

//     console.log("Sending transaction", transaction);

//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction,
//       },
//     });

//     console.log("Response", payload);

//     return Response.json(payload, {
//       headers: ACTIONS_CORS_HEADERS,
//     });
//   } catch (error) {
//     console.error(error);
//     return Response.json("An error occured", { status: 500 });
//   }
// };

// NOTE: Working Paid Spin Function
// export const POST = async (req: Request) => {
//   try {
//     const body: ActionPostRequest = await req.json();

//     const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(keyPair), {
//       skipValidation: true,
//     });

//     // const wallet = new Wallet(walletKeypair);

//     const provider = new AnchorProvider(
//       SolanaConnection,
//       walletKeypair as any,
//       {
//         commitment: "confirmed",
//       }
//     );

//     console.log("Received request", body);
//     let account: PublicKey;
//     try {
//       account = new PublicKey(body.account);
//     } catch (error) {
//       return Response.json("Invalid account provided", {
//         status: 400,
//         headers: ACTIONS_CORS_HEADERS,
//       });
//     }

//     const program = new Program(IDLM as ICrittersMultipliers, provider);

//     const asset = web3.Keypair.generate();

//     const mintToken = TokenAddress;

//     let multiplierCollectionAddress = null;
//     let multiplier = null;

//     const discount = false;

//     const multiplierOptions = {
//       discount,
//     };

//     const tx1 = await program.methods
//       .mintMultiplier(false)
//       .accounts({
//         asset: asset.publicKey,
//         payer: account.toBase58(),
//         collection: new PublicKey(MultiplierCollectionAddress),
//         collector: new PublicKey(
//           "8wgRap55UirQYxunXzTeYyPc4PYE2fKD8VLrMSMe5aci"
//         ),
//         crittersContract: new PublicKey(CrittersContractId),
//       })
//       .signers([asset])
//       .instruction();

//     const { blockhash } = await SolanaConnection.getLatestBlockhash();

//     // const message = new web3.TransactionMessage({
//     //   payerKey: account, // Public key of the account that will pay for the transaction
//     //   recentBlockhash: blockhash, // Latest blockhash
//     //   instructions: instructions, // Instructions included in transaction
//     // }).compileToV0Message();

//     // const transaction = new web3.VersionedTransaction(message);

//     const transaction = new Transaction().add(
//       ComputeBudgetProgram.setComputeUnitLimit({ units: 400_000 }),
//       tx1
//     );

//     transaction.feePayer = account;
//     transaction.recentBlockhash = blockhash;
//     transaction.sign(asset);

//     // const serializedTransaction = transaction.serialize({
//     //   requireAllSignatures: false,
//     // });

//     // console.log("Serialized Transaction", serializedTransaction);

//     // const tx = Transaction.from(serializedTransaction);

//     console.log("Asset", asset.publicKey.toString());

//     console.log("Sending transaction", transaction);

//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction: transaction,
//       },
//     });

//     console.log("Response", payload);

//     return Response.json(payload, {
//       headers: ACTIONS_CORS_HEADERS,
//     });
//   } catch (error) {
//     console.error(error);
//     return Response.json("An error occured", { status: 500 });
//   }
// };
