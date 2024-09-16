import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { Action } from "@solana/actions-spec";

type NFT = {
  publicKey: string;
  name: string;
  uri: string;
  description: string;
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      nftAddress: string;
    };
  }
) => {
  const payload: Action<"completed"> = {
    icon: new URL(
      "/images/site/success.jpg",
      new URL(req.url).origin
    ).toString(),
    label: "✅ Success",
    description: "This is a success action",
    title: "Success",
    type: "completed",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    return Response.json("", {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error(error);
    return Response.json("An error occured", { status: 500 });
  }
};
