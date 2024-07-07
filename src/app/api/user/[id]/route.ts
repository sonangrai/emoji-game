import ResponseObj, { serverError } from "@/model/response";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    let user = await User.findOne({ Nickname: id });
    if (!user) {
      let respObject = new ResponseObj(404, {}, "User not Found");
      return NextResponse.json(respObject);
    }

    let respObject = new ResponseObj(200, user, "User found");
    return NextResponse.json(respObject);
  } catch (error) {
    serverError(error, NextResponse);
  }
}
