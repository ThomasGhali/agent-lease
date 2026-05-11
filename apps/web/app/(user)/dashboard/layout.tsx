import Dashboard from '@/features/dashboard-layout/components'
import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Dashboard>{children}</Dashboard>
}
