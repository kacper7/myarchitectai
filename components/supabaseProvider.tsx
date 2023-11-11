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
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
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

  async function fetchUser() {
    await supabase.auth.getUser().then(({ data }) => {
      const { user } = data
      if (user) setUser(user);
    })
  }

  async function signInWithEmail(email: string, password: string) {
    await supabase.auth.signInWithPassword({
      email,
      password
    }).then(({ data, error }) => {
      if (error) throw new Error(error.message);

      const { user } = data;
      if (user) setUser(user);
    }).catch((error) => {
      // TODO: Handle error
      console.log(error);
    })
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("myarchitectai_users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (data) {
        // console.log(data);

        switch (data.package) {
          case "free":
            break;
          case "pro":
            setPackageType("pro");
            break;
          default:
            break;
        }
      }
    }
  }

  useEffect(() => {
    fetchUser();
    checkUserPackage();
  }, []);

  return (
    <SupabaseContext.Provider
      value={
        { supabase, user, signInWithGoogle, signInWithEmail, packageType }
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
