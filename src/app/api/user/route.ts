import connectToDatabase from "@/lib/db";
import ResponseObj from "@/model/response";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

/**
 * Registering a user
 * @param req
 * @param param1
 * @returns
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  try {
    await connectToDatabase();
    const user = await User.create(body);
    const respObject = new ResponseObj(200, user, "User created");

    return NextResponse.json(respObject);
  } catch (error: Error | any) {
    const errorResp = new ResponseObj(500, error.errors, error._message);
    return NextResponse.json(errorResp);
  }
}
