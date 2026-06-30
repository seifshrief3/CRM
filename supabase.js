import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ajxxyyryqvqdrksssvak.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqeHh5eXJ5cXZxZHJrc3NzdmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE1NjYsImV4cCI6MjA5ODA1NzU2Nn0.0gph1a4hKeffkB7n6B6lLio9NjSMRIhIxgRj2RJNXzo"

export const supabase = createClient(supabaseUrl, supabaseKey)