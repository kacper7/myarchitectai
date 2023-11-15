export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_details: {
        Row: {
          created_at: string
          email: string | null
          id: number
          lemon_squeezy_id: string | null
          lemon_squeezy_subscription_id: string | null
          number_of_renders: number | null
          subscription_package: string | null
          subscription_renews_at: string | null
          subscription_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          lemon_squeezy_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          number_of_renders?: number | null
          subscription_package?: string | null
          subscription_renews_at?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          lemon_squeezy_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          number_of_renders?: number | null
          subscription_package?: string | null
          subscription_renews_at?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_user_renders_count: {
        Args: {
          userid: string
        }
        Returns: undefined
      }
      reset_number_of_renders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
