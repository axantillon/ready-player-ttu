import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

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
        groupMembers: true,
      },
    });
    return Response.json(team?.groupMembers);
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
        groupMembers: {
          push: name,
        },
      },
      select: {
        groupMembers: true,
      },
    });
    return Response.json(team.groupMembers);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { leaderEmail: string } }
) {
  const { leaderEmail } = params;
  const { members } = await request.json();
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
        groupMembers: {
          set: members,
        },
      },
    });
    return Response.json(team.groupMembers);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}
