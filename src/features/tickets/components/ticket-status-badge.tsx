import { TicketStatus, TicketPriority, TICKET_STATUS_LABELS, TICKET_PRIORITY_LABELS } from '../types/ticket'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: TicketStatus
  className?: string
}

interface PriorityBadgeProps {
  priority: TicketPriority
  className?: string
}

export function TicketStatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusColor(status),
        className
      )}
    >
      {TICKET_STATUS_LABELS[status]}
    </span>
  )
}

export function TicketPriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getPriorityColor(priority),
        className
      )}
    >
      {TICKET_PRIORITY_LABELS[priority]}
    </span>
  )
}
