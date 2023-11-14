"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: User | null;
  packageType: string;
  subscriptionActive: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string[]>;
  signUpWithEmail: (email: string, password: string) => Promise<string[]>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

interface SupabaseProviderProps {
  children: ReactNode; // Update the prop type to ReactNode
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ) as SupabaseClient;

  const [user, setUser] = useState<User | null>(null);
  const [packageType, setPackageType] = useState("free");
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  async function fetchUser() {
    await supabase.auth.getUser().then(({ data }) => {
      const { user } = data
      if (user) setUser(user);
    })
  }

  async function signInWithEmail(email: string, password: string) {
    const errors: string[] = [];
    await supabase.auth.signInWithPassword({
      email,
      password
    }).then(({ data, error }) => {
      if (error) {
        errors.push(error.message);
        throw new Error(error.message);
      }

      const { user } = data;
      if (user) setUser(user);
    }).catch((error) => {
      console.log(error);
    })
    return errors;
  }

  async function signUpWithEmail(email: string, password: string) {
    const errors: string[] = [];
    await supabase.auth.signUp({
      email,
      password,
    }).then(({ data, error }) => {
      if (error) {
        errors.push(error.message);
        throw new Error(error.message);
      }
    }).catch((error) => {
      console.log(error);
    })

    return errors;
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    }).then(({ data, error }) => {
      if (error) throw new Error(error.message);
    }).catch((error) => {
      // TODO: Handle error
      console.log(error);
    })
  }

  async function checkUserPackage() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const  { data, error } = await supabase.from("user_details").select("*").eq("user_id", user.id).single();
      if (error) throw error;
      if (!data) {
        setPackageType("free");
        return;
      }

      const {
        subscription_package,
        subscription_status,
        subscription_renews_at,
      } = data;
      const isSubscriptionActive = !["expired", "unpaid", "past_due"].includes(subscription_status)
        && !!subscription_renews_at
        && subscription_renews_at > new Date().toISOString();

      if (isSubscriptionActive) {
        setSubscriptionActive(true);
        setPackageType(subscription_package);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    checkUserPackage();
  }, []);

  return (
    <SupabaseContext.Provider
      value={
        { supabase, user, signInWithGoogle, signInWithEmail, signUpWithEmail, packageType, subscriptionActive }
      }
    >
      {children}
    </SupabaseContext.Provider>
  );
};

const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

export { SupabaseProvider, useSupabase };
