import { getServerSession } from "next-auth";
import prisma from '@/lib/prisma';

export async function GET(request: Request) {

    const session = await getServerSession();
    const user = session?.user;

    if (!user) {
        return Response.error();
    }

    try {
        const keys = await prisma.user.findFirst({
            where: {
                email: user.email!!
            },
            select: {
                goldKey: true,
                goldKeyTime: true,
                emeraldKey: true,
                emeraldKeyTime: true,
                crystalKey: true,
                crystalKeyTime: true
            }
        })
        return Response.json(keys);
    } catch (error) {
        return Response.error();
    }
}