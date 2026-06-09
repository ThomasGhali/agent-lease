import { ReactNode } from 'react'

export interface NavItem {
  title: string
  url: string
  icon?: ReactNode
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface TeamInfo {
  name: string
  logo: ReactNode
  plan: string
}

export interface UserInfo {
  name: string
  email: string
  avatar: string
}

export interface ProjectItem {
  name: string
  url: string
  icon?: ReactNode
}

export interface ProjectByRole {
  title: string
  role: 'user' | 'admin'
  options: ProjectItem[]
}

export interface DashboardData {
  team: TeamInfo
  navMain: NavItem[]
  projects: ProjectByRole[]
}
