// pages/api/maxTotalMoneyByTeam.js


import connectMongoDB from "../../../../libs/mongodb";
import {User} from "../../../../models/user"; // Make sure to import the User model
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB(); // Connect to the MongoDB database

    const maxTotalMoneyByTeam = await User.aggregate([
      {
        $match: { isVerified: true }, // Filter verified users
      },
      {
        $group: {
          _id: "$teamName",
          maxTotalMoney: { $max: "$totalMoney" }, // Find the maximum totalMoney for each team
        },
      },
      {
        $project: {
          teamName: "$_id",
          maxTotalMoney: 1,
          _id: 0, // Exclude the _id field
        },
      },
    ]);

    return NextResponse.json({ data: maxTotalMoneyByTeam }, { status: 200 });
  } catch (error) {
    console.error('Error fetching max total money by team:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
