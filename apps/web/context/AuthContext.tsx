'use client'

import { Session } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createAuthClient } from '../lib/supabase/client'
import { getInitialSession } from '../lib/auth/client'

type AuthContextType = {
  session: Session | null | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  useEffect(() => {
    const supabase = createAuthClient()

    const initSession = async () => {
      const initialSession = await getInitialSession()
      setSession(initialSession)
    }
    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: string, session: AuthContextType['session']) => {
        setSession(session)
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }

  return context
}
