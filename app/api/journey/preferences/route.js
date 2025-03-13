import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { JourneyTracker } from "@/lib/journeyTracker";
import { supabase } from "@/lib/supabase";

/**
 * Save user preferences
 */
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { preferences, save } = await request.json();
    if (!preferences || !Array.isArray(preferences)) {
      return NextResponse.json(
        { error: "Preferences array is required" },
        { status: 400 }
      );
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const result = await tracker.saveUserPreferences(preferences, save);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Get saved user preferences
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

    // Get saved preferences
    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .select("preference_name, preference_value")
      .eq("user_id", user.id)
      .eq("is_saved", true);

    if (error) {
      throw error;
    }

    return NextResponse.json(preferences || []);
  } catch (error) {
    console.error("Error retrieving preferences:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
