// pages/api/verify/get.js (or any appropriate file name)

import connectMongoDB from "../../../../libs/mongodb";
import { User } from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch all users with isValid set to false
    const invalidUsers = await User.find({ isVerified: false });

    return NextResponse.json({ data: invalidUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching invalid users:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
