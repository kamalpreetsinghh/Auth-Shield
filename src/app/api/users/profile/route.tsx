import { getTokenData } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/utils/actions";

export const GET = async (request: NextRequest) => {
  try {
    const userId = getTokenData(request);
    const user = await getUserById(userId);

    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
