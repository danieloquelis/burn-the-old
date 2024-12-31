import { db } from "@/db/db";

export async function GET(req: Request) {
  try {
    const { description } = await req.json();

    await db.wish.findMany({
      where: {
        description: description,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
