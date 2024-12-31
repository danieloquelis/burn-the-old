import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const wish = await db.wish.create({
      data: {
        description: description,
      },
    });

    return NextResponse.json(wish);
  } catch (error) {
    console.error(error);
  }
}
