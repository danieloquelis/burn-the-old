import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wishes = await db.wish.findMany({
      where: {
        deleted: false,
      },
    });

    return NextResponse.json(wishes);
  } catch (error) {
    console.error(error);
  }
}
