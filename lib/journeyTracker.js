// lib/journeyTracker.js
import { supabase } from "./supabase";
import { auth } from "@clerk/nextjs";

/**
 * Journey Tracker for Medical Supply Chatbot
 * Tracks user interactions and journey through the chatbot flow
 */
export class JourneyTracker {
  constructor() {
    this.sessionId = null;
    this.journeyId = null;
    this.userId = null;
    this.isNewUser = true;
    this.currentStage = null;
  }

  /**
   * Initialize the journey tracker with user information
   */
  async initialize() {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    this.userId = userId;

    // Check if user exists in our database
    const { data: existingUser } = await supabase
      .from("users")
      .select("id, is_new_user, last_visit")
      .eq("clerk_user_id", userId)
      .single();

    if (existingUser) {
      // Returning user
      this.isNewUser = false;

      // Update last visit
      await supabase
        .from("users")
        .update({
          last_visit: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingUser.id);

      this.userId = existingUser.id;
    } else {
      // New user - create record
      const { data: newUser, error } = await supabase
        .from("users")
        .insert({
          clerk_user_id: userId,
          is_new_user: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_visit: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      this.userId = newUser.id;
      this.isNewUser = true;
    }

    // Create a new session
    const { data: session, error } = await supabase
      .from("user_sessions")
      .insert({
        user_id: this.userId,
        session_start: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    this.sessionId = session.id;

    // Initialize the journey based on user type
    const pathType = this.isNewUser ? "new_user" : "returning_user";
    const initialStage = this.isNewUser ? "first_interaction" : "recognition";

    const { data: journey, error: journeyError } = await supabase
      .from("user_journeys")
      .insert({
        session_id: this.sessionId,
        user_id: this.userId,
        path_type: pathType,
        current_stage: initialStage,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (journeyError) throw journeyError;
    this.journeyId = journey.id;
    this.currentStage = initialStage;

    return {
      isNewUser: this.isNewUser,
      currentStage: this.currentStage,
    };
  }

  /**
   * Update the current stage in the user journey
   * @param {string} stage - The new stage name
   */
  async updateStage(stage) {
    if (!this.journeyId) {
      throw new Error("Journey not initialized");
    }

    const { error } = await supabase
      .from("user_journeys")
      .update({
        current_stage: stage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", this.journeyId);

    if (error) throw error;
    this.currentStage = stage;

    return { currentStage: stage };
  }

  /**
   * Record a specific interaction in the current journey
   * @param {string} type - The type of interaction
   * @param {object} content - The content/data of the interaction
   */
  async recordInteraction(type, content) {
    if (!this.journeyId) {
      throw new Error("Journey not initialized");
    }

    const { data, error } = await supabase
      .from("journey_interactions")
      .insert({
        journey_id: this.journeyId,
        interaction_type: type,
        content,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Save user profile information during the profile building stage
   * @param {object} profileData - Profile data to save
   */
  async saveUserProfile(profileData) {
    if (!this.userId) {
      throw new Error("User ID not available");
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", this.userId)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from("user_profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingProfile.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          user_id: this.userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  /**
   * Save user constraints for product filtering
   * @param {array} constraints - Array of constraint objects
   */
  async saveUserConstraints(constraints) {
    if (!this.userId) {
      throw new Error("User ID not available");
    }

    // First deactivate all existing constraints
    await supabase
      .from("user_constraints")
      .update({ is_active: false })
      .eq("user_id", this.userId);

    // Then insert new constraints
    const constraintsToInsert = constraints.map((constraint) => ({
      user_id: this.userId,
      constraint_name: constraint.name,
      constraint_value: constraint.value,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("user_constraints")
      .insert(constraintsToInsert)
      .select();

    if (error) throw error;
    return data;
  }

  /**
   * Save user preferences for product sorting and filtering
   * @param {array} preferences - Array of preference objects
   * @param {boolean} save - Whether to save the preferences for future sessions
   */
  async saveUserPreferences(preferences, save = false) {
    if (!this.userId) {
      throw new Error("User ID not available");
    }

    const preferencesToInsert = preferences.map((pref) => ({
      user_id: this.userId,
      preference_name: pref.name,
      preference_value: pref.value,
      is_saved: save,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("user_preferences")
      .insert(preferencesToInsert)
      .select();

    if (error) throw error;
    return data;
  }

  /**
   * Record a product selection event
   * @param {string} productId - ID of the selected product
   * @param {string} action - Action taken on the product
   */
  async recordProductSelection(productId, action) {
    if (!this.userId || !this.sessionId) {
      throw new Error("User or session not initialized");
    }

    const { data, error } = await supabase
      .from("product_selections")
      .insert({
        user_id: this.userId,
        session_id: this.sessionId,
        product_id: productId,
        action_taken: action,
        selected_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Save a shortcut for quick access in future sessions
   * @param {string} name - Name of the shortcut
   * @param {object} shortcutData - Data to save for the shortcut
   */
  async saveShortcut(name, shortcutData) {
    if (!this.userId) {
      throw new Error("User ID not available");
    }

    // Check if shortcut with this name exists
    const { data: existingShortcut } = await supabase
      .from("user_shortcuts")
      .select("id")
      .eq("user_id", this.userId)
      .eq("shortcut_name", name)
      .single();

    if (existingShortcut) {
      // Update existing shortcut
      const { data, error } = await supabase
        .from("user_shortcuts")
        .update({
          shortcut_data: shortcutData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingShortcut.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new shortcut
      const { data, error } = await supabase
        .from("user_shortcuts")
        .insert({
          user_id: this.userId,
          shortcut_name: name,
          shortcut_data: shortcutData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  /**
   * End the current session
   */
  async endSession() {
    if (!this.sessionId) {
      throw new Error("Session not initialized");
    }

    const { error } = await supabase
      .from("user_sessions")
      .update({
        session_end: new Date().toISOString(),
        is_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", this.sessionId);

    if (error) throw error;

    // Update user to no longer be new after completing a session
    if (this.isNewUser) {
      await supabase
        .from("users")
        .update({
          is_new_user: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", this.userId);
    }

    return { sessionEnded: true };
  }

  /**
   * Get user journey stats for analytics
   */
  async getJourneyStats() {
    if (!this.userId) {
      throw new Error("User ID not available");
    }

    // Get count of sessions
    const { data: sessionCount, error: sessionError } = await supabase
      .from("user_sessions")
      .select("id", { count: "exact" })
      .eq("user_id", this.userId);

    if (sessionError) throw sessionError;

    // Get most recent interactions
    const { data: recentInteractions, error: interactionsError } =
      await supabase
        .from("journey_interactions")
        .select("interaction_type, content, created_at")
        .in("journey_id", function (qb) {
          qb.select("id")
            .from("user_journeys")
            .eq("user_id", this.userId)
            .order("created_at", { ascending: false })
            .limit(5);
        })
        .order("created_at", { ascending: false })
        .limit(10);

    if (interactionsError) throw interactionsError;

    // Get saved preferences
    const { data: savedPreferences, error: preferencesError } = await supabase
      .from("user_preferences")
      .select("preference_name, preference_value")
      .eq("user_id", this.userId)
      .eq("is_saved", true);

    if (preferencesError) throw preferencesError;

    // Get product selection history
    const { data: productHistory, error: productError } = await supabase
      .from("product_selections")
      .select("product_id, action_taken, selected_at")
      .eq("user_id", this.userId)
      .order("selected_at", { ascending: false })
      .limit(5);

    if (productError) throw productError;

    return {
      sessionCount: sessionCount?.length || 0,
      recentInteractions,
      savedPreferences,
      productHistory,
    };
  }
}

// Export a hook for easy use in React components
export function useJourneyTracker() {
  const tracker = new JourneyTracker();

  return {
    initialize: tracker.initialize.bind(tracker),
    updateStage: tracker.updateStage.bind(tracker),
    recordInteraction: tracker.recordInteraction.bind(tracker),
    saveUserProfile: tracker.saveUserProfile.bind(tracker),
    saveUserConstraints: tracker.saveUserConstraints.bind(tracker),
    saveUserPreferences: tracker.saveUserPreferences.bind(tracker),
    recordProductSelection: tracker.recordProductSelection.bind(tracker),
    saveShortcut: tracker.saveShortcut.bind(tracker),
    endSession: tracker.endSession.bind(tracker),
    getJourneyStats: tracker.getJourneyStats.bind(tracker),
  };
}
