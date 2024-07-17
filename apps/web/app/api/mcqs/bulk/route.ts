import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req: NextRequest,request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to view submissions",
      },
      {
        status: 401,
      }
    );
  }

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const mcqId = searchParams.get("mcqId");

   
  if (!mcqId) {
    return NextResponse.json(
      {
        message: "Invalid problem id",
      },
      {
        status: 400,
      }
    );
  }

  const submissions = await db.mCQSubmission.findMany({
    where: {
      mcqProblemId: mcqId,
      userId: session.user.id,
    },
    take: 10,
    include: {
        mcqProblem: true,
        selectedOption: true,
        user: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(
    {
      submissions,
    },
    {
      status: 200,
    }
  );
}
