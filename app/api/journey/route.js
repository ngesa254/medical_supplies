import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { JourneyTracker } from "@/lib/journeyTracker";

/**
 * Initialize a new journey
 */
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tracker = new JourneyTracker();
    const result = await tracker.initialize();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error initializing journey:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Update journey stage
 */
export async function PUT(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stage } = await request.json();
    if (!stage) {
      return NextResponse.json({ error: "Stage is required" }, { status: 400 });
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const result = await tracker.updateStage(stage);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating journey stage:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Get journey statistics
 */
export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const stats = await tracker.getJourneyStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error retrieving journey stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
