import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { JourneyTracker } from "@/lib/journeyTracker";

/**
 * Save user profile data
 */
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileData = await request.json();
    if (!profileData || Object.keys(profileData).length === 0) {
      return NextResponse.json(
        { error: "Profile data is required" },
        { status: 400 }
      );
    }

    const tracker = new JourneyTracker();
    await tracker.initialize();
    const result = await tracker.saveUserProfile(profileData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Get user profile data
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

    // Get profile data
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      throw error;
    }

    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
