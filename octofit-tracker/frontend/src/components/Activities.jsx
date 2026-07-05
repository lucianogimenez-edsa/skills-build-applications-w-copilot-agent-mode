import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const response = await fetch(activitiesApiUrl)

        if (!response.ok) {
          throw new Error(`Request failed for activities: ${response.status}`)
        }

        const data = normalizeCollection(await response.json())

        if (!ignore) {
          setActivities(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Movement log</p>
        <h1>Activities</h1>
      </div>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
            <article className="data-card h-100">
              <div>
                <h2>{activity.activityType}</h2>
                <p className="text-muted mb-0">{activity.username}</p>
              </div>
              <div className="metric-row">
                <span>{activity.durationMinutes} min</span>
                <span>{activity.caloriesBurned} cal</span>
              </div>
              <p className="small text-muted mb-0">
                {activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'No date'}
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
