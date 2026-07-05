import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts')

        if (!ignore) {
          setWorkouts(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-4" key={workout._id ?? workout.title}>
            <article className="data-card h-100">
              <div>
                <h2>{workout.title}</h2>
                <p className="text-muted mb-0">
                  {workout.category} · {workout.difficulty} · {workout.durationMinutes} min
                </p>
              </div>
              <ul className="exercise-list">
                {(workout.exercises ?? []).map((exercise) => (
                  <li key={exercise}>{exercise}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
