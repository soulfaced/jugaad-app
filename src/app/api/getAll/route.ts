// pages/api/all-data.js

import connectMongoDB from "../../../../libs/mongodb";
import {User} from "../../../../models/user"; // Make sure to import the User model
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB(); // Connect to the MongoDB database

    // Retrieve all data from the database
    const allData = await User.find({});

    return NextResponse.json({ data: allData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all data:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
