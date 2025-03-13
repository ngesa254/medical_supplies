import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { JourneyTracker } from "@/lib/journeyTracker";

/**
 * Record a user interaction
 */
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, content } = await request.json();
    if (!type || !content) {
      return NextResponse.json(
        { error: "Type and content are required" },
        { status: 400 }
      );
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const result = await tracker.recordInteraction(type, content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error recording interaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
