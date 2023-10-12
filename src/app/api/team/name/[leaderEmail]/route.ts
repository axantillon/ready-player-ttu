import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { leaderEmail: string } }
) {
  const { leaderEmail } = params;
  const session = await getServerSession();

  if (session?.user?.email !== leaderEmail) {
    return Response.error();
  }

  try {
    const team = await prisma.user.findFirst({
      where: {
        email: leaderEmail,
      },
      select: {
        groupName: true,
      },
    });
    return Response.json(team === null ? '' : team?.groupName);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

export async function POST(
  request: Request,
  { params }: { params: { leaderEmail: string } }
) {
  const { leaderEmail } = params;
  const { name } = await request.json();
  const session = await getServerSession();

  if (session?.user?.email !== leaderEmail) {
    return Response.error();
  }

  try {
    const team = await prisma.user.update({
      where: {
        email: leaderEmail,
      },
      data: {
        groupName: name,
      },
      select: {
        groupName: true,
      },
    });
    return Response.json(team === null ? '' : team?.groupName);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}