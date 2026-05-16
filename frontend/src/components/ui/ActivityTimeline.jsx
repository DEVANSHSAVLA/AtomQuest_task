import { CheckCircle, MessageSquare, AlertTriangle, Edit3 } from 'lucide-react';

export function ActivityTimeline({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-[#c7c4d7] text-sm">
        No recent activity to display.
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#0b1326]
                    ${activity.type === 'APPROVAL' ? 'bg-emerald-500/20 text-emerald-400' : 
                      activity.type === 'COMMENT' ? 'bg-blue-500/20 text-blue-400' : 
                      activity.type === 'ESCALATION' ? 'bg-rose-500/20 text-rose-400' : 
                      'bg-slate-500/20 text-gray-500 dark:text-[#c7c4d7]'}`}
                  >
                    {activity.type === 'APPROVAL' && <CheckCircle className="h-4 w-4" />}
                    {activity.type === 'COMMENT' && <MessageSquare className="h-4 w-4" />}
                    {activity.type === 'ESCALATION' && <AlertTriangle className="h-4 w-4" />}
                    {activity.type === 'EDIT' && <Edit3 className="h-4 w-4" />}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900 dark:text-[#dae2fd]">
                      {activity.content}{' '}
                      <span className="font-bold text-indigo-600 dark:text-[#c0c1ff]">{activity.target}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-500 dark:text-[#c7c4d7]">
                    <time dateTime={activity.datetime}>{activity.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

