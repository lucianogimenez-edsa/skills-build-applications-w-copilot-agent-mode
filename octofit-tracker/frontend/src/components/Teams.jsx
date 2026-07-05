import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const response = await fetch(teamsApiUrl)

        if (!response.ok) {
          throw new Error(`Request failed for teams: ${response.status}`)
        }

        const data = normalizeCollection(await response.json())

        if (!ignore) {
          setTeams(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Team energy</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="data-card h-100">
              <div>
                <h2>{team.name}</h2>
                <p className="text-muted mb-0">{team.motto}</p>
              </div>
              <div className="metric-row">
                <span>{team.memberCount} members</span>
                <span>{team.totalPoints} pts</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
