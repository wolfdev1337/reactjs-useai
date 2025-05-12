import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Create a request to OpenAI API or any other API, with the require token saved in the environment variable
    const { prompt } = await request.json();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = { response: `You said: ${prompt}` };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
