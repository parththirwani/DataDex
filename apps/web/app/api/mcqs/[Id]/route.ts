import { NextResponse } from 'next/server';
import { db } from "../../../db"; // Make sure to import PrismaClient correctly
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";


export async function GET(request: Request) {
  try {
    // Extract ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Extracts the last segment of the URL

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Fetch the MCQ problem from the database
    const mcq = await db.mCQProblem.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });

    if (mcq) {
      return NextResponse.json(mcq);
    } else {
      return NextResponse.json({ message: 'MCQ not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch MCQ' }, { status: 500 });
  }
}

// POST endpoint to handle submissions
// export async function POST(request: Request) {
//     try {
//       const { selectedOptionId } = await request.json();
//       const url = new URL(request.url);
//       const mcqId = url.pathname.split('/').pop(); // Extracts the last segment of the URL

//       if (!mcqId || !selectedOptionId) {
//         return NextResponse.json({ error: 'mcqId and selectedOptionId are required' }, { status: 400 });
//       }
  
//       // Fetch the MCQ problem to get the correct answer
//       const mcq = await db.mCQProblem.findUnique({
//         where: { id: mcqId },
//         include: {
//           options: true,
//         },
//       });
  
//       if (!mcq) {
//         return NextResponse.json({ error: 'MCQ not found' }, { status: 404 });
//       }
  
//       // Find the correct answer option
//       const correctOption = mcq.options.find(option => option.isCorrect);
  
//       if (!correctOption) {
//         return NextResponse.json({ error: 'No correct option found' }, { status: 500 });
//       }
  
//       // Check if the selected option is correct
//       const isCorrect = selectedOptionId === correctOption.id;
  
//       return NextResponse.json({
//         isCorrect,
//         message: isCorrect ? 'Correct answer!' : 'Incorrect answer.',
//       });
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
//     }
// }

export async function POST(request: Request) {
    try {
const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
              {
                message: "You must be logged in to submit a problem",
              },
              {
                status: 401,
              }
            );
          }
        const userId = session.user.id;
      const { selectedOptionId } = await request.json();
      const url = new URL(request.url);
      const mcqId = url.pathname.split('/').pop(); // Extracts the last segment of the URL
  
      if (!mcqId || !selectedOptionId || !userId) {
        return NextResponse.json({ error: 'mcqId, selectedOptionId, and userId are required' }, { status: 400 });
      }
  
      // Fetch the MCQ problem to get the correct answer
      const mcq = await db.mCQProblem.findUnique({
        where: { id: mcqId },
        include: {
          options: true,
        },
      });
  
      if (!mcq) {
        return NextResponse.json({ error: 'MCQ not found' }, { status: 404 });
      }
  
      // Find the correct answer option
      const correctOption = mcq.options.find(option => option.isCorrect);
  
      if (!correctOption) {
        return NextResponse.json({ error: 'No correct option found' }, { status: 500 });
      }
  
      // Check if the selected option is correct
      const isCorrect = selectedOptionId === correctOption.id;
  
      // Create a new submission entry
      await db.mCQSubmission.create({
        data: {
          userId,
          mcqProblemId: mcqId,
          selectedOptionId,
        },
      });
  
      return NextResponse.json({
        isCorrect,
        message: isCorrect ? 'Correct answer!' : 'Incorrect answer.',
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
    }
  }





