export interface Mission {
  id: string
  title: string
  description?: string
  reward: string
  icon: string
  color: string
  completed?: boolean
  progress?: number
  href?: string
  onAction?: () => void
}

export interface MissionSectionProps {
  title: string
  titleColor?: string
  missions: Mission[]
  columns?: 1 | 2
  icon?: string
  timer?: string
  actionLabel?: string
  onAction?: () => void
}
