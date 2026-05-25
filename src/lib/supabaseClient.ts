import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ipglaoqszugjwbmbnotl.supabase.co'

const supabaseAnonKey = 'sb_publishable_KsULZ_E5ub6Xo3kwsff6mw_BIn-g2UZ'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)