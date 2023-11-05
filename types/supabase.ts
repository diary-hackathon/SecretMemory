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
      answers: {
        Row: {
          answer: string
          created_at: string
          id: string
          question_id: string
          updated_at: string
          user_id: string
          written_date: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question_id: string
          updated_at?: string
          user_id: string
          written_date: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
          written_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      diaries: {
        Row: {
          content: string
          created_at: string
          id: string
          thumbnail_id: string | null
          title: string
          updated_at: string
          user_id: string
          written_date: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          thumbnail_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          written_date: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          thumbnail_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          written_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "diaries_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      diary_media: {
        Row: {
          diary_id: string
          media_id: string
        }
        Insert: {
          diary_id: string
          media_id: string
        }
        Update: {
          diary_id?: string
          media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diary_media_diary_id_fkey"
            columns: ["diary_id"]
            isOneToOne: false
            referencedRelation: "diaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          }
        ]
      }
      media: {
        Row: {
          created_at: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
