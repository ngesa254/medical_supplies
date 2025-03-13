import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { JourneyTracker } from "@/lib/journeyTracker";

/**
 * Save user constraints
 */
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { constraints } = await request.json();
    if (!constraints || !Array.isArray(constraints)) {
      return NextResponse.json(
        { error: "Constraints array is required" },
        { status: 400 }
      );
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const result = await tracker.saveUserConstraints(constraints);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving constraints:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Get user constraints
 */
export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from database
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get active constraints
    const { data: constraints, error } = await supabase
      .from("user_constraints")
      .select("constraint_name, constraint_value")
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (error) {
      throw error;
    }

    return NextResponse.json(constraints || []);
  } catch (error) {
    console.error("Error retrieving constraints:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
