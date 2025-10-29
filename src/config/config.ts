// Quiz / Trivia Open API
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Supabase Config
const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseTokenKey = `sb-${SUPABASE_PROJECT_ID}-auth-token`;

export { API_URL, SUPABASE_PROJECT_ID, SUPABASE_URL, SUPABASE_ANON_KEY, supabaseTokenKey };
