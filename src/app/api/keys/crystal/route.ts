import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { leaderEmail: string } }
) {
  const attempt = request.nextUrl.searchParams.get("attempt");
  const leaderEmail = request.nextUrl.searchParams.get("leaderEmail");
  const key = process.env.CRYSTAL_KEY;

  if (!attempt || !key || !leaderEmail) {
    return new Response("No key or attempt provided", { status: 400 });
  }

  if (attempt.toLocaleLowerCase() === key.toLocaleLowerCase() && leaderEmail) {
    try {
      await prisma.user.update({
        where: {
          email: leaderEmail,
        },
        data: {
          crystalKey: true,
        },
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: true }), { status: 200 });
    }
  } else {
    return new Response(JSON.stringify({ error: true }), { status: 200 });
  }
}
