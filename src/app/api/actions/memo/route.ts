import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createActionHeaders,
  createPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const headers = createActionHeaders();

export const GET = (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL("/images/site/logo.jpg", new URL(req.url).origin).toString(),
    label: "Start",
    description: "This is an action chaining example",
    title: "Chaining Actions",
    type: "action",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();

    console.log("Received request", body);
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json("Invalid account provided", {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const transaction = new Transaction();
    transaction.add(
      // note: 'createPostResponse requires at least 1 non-memo instruction
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple memo message", "utf8"),
        keys: [],
      })
    );

    const connection = new Connection(
      process.env.NEXT_PUBLIC_RPC || clusterApiUrl("devnet")
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    console.log("Sending transaction", transaction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
      },
    });

    console.log("Response", payload);

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error(error);
    return Response.json("An error occured", { status: 500 });
  }
};
