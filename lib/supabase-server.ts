import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-side Supabase client
export const createClient = async () => {
  const cookieStore = await cookies()
  
  // Debug: Log available cookies for troubleshooting
  const allCookies = cookieStore.getAll()
  const authCookies = allCookies.filter(cookie => 
    cookie.name.includes('supabase') || 
    cookie.name.includes('auth') ||
    cookie.name.includes('sb-')
  )
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Available auth cookies:', authCookies.map(c => ({ name: c.name, hasValue: !!c.value })))
  }
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const value = cookieStore.get(name)?.value
          if (process.env.NODE_ENV === 'development' && name.includes('supabase')) {
            console.log(`Getting cookie ${name}:`, value ? 'present' : 'missing')
          }
          return value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options)
            if (process.env.NODE_ENV === 'development' && name.includes('supabase')) {
              console.log(`Setting cookie ${name}:`, value ? 'with value' : 'empty')
            }
          } catch (error) {
            console.error(`Failed to set cookie ${name}:`, error)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
            if (process.env.NODE_ENV === 'development') {
              console.log(`Removing cookie ${name}`)
            }
          } catch (error) {
            console.error(`Failed to remove cookie ${name}:`, error)
          }
        },
      },
    }
  )
}

export default createClient