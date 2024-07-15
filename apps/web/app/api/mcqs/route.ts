import { db } from "../../db";
import { NextResponse } from 'next/server';

export async function GET() {
  const mcqs = await db.mCQProblem.findMany({
    include: {
      options: true,
    },
  });
  console.log(mcqs);
  return NextResponse.json(mcqs);
}