import { db } from "@/db/db";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    await db.wish.create({
      data: {
        description: description,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
