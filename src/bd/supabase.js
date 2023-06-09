import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xucceinaotexbnfusfpl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2NlaW5hb3RleGJuZnVzZnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MjksImV4cCI6MTk5Mjc1MjYyOX0.ibXE3_mhGDUYKh3ZRqOgokqxkVNQ8VXN9YtROZc9YIg'

export const supabase = createClient(supabaseUrl, supabaseKey)
