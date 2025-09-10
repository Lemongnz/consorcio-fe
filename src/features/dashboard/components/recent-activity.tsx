import { 
  Ticket, 
  FileText, 
  Wrench, 
  Calendar, 
  Building2,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentActivity } from '../types/dashboard'

interface RecentActivityProps {
  activities: RecentActivity[]
}

const getActivityIcon = (type: RecentActivity['type']) => {
  switch (type) {
    case 'ticket':
      return Ticket
    case 'invoice':
      return FileText
    case 'workorder':
      return Wrench
    case 'meeting':
      return Calendar
    case 'building':
      return Building2
    default:
      return Clock
  }
}

const getActivityColor = (type: RecentActivity['type']) => {
  switch (type) {
    case 'ticket':
      return 'text-blue-600 bg-blue-100'
    case 'invoice':
      return 'text-green-600 bg-green-100'
    case 'workorder':
      return 'text-orange-600 bg-orange-100'
    case 'meeting':
      return 'text-purple-600 bg-purple-100'
    case 'building':
      return 'text-indigo-600 bg-indigo-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} min`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours}h`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `hace ${diffInDays}d`
}

export function RecentActivityComponent({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const colorClass = getActivityColor(activity.type)
            
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                    {activity.status && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                        {activity.status}
                      </span>
                    )}
                    {activity.priority && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activity.priority === 'high' 
                          ? 'bg-red-100 text-red-700'
                          : activity.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {activity.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
