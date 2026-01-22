'use client'

import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* 可以在这里添加全局 Context Providers */}
      {/* 例如: ThemeProvider, AuthProvider 等 */}
      {children}
    </>
  )
}
