import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api'

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const response = await fetch(leaderboardApiUrl)

        if (!response.ok) {
          throw new Error(`Request failed for leaderboard: ${response.status}`)
        }

        const data = normalizeCollection(await response.json())

        if (!ignore) {
          setEntries(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry) => (
          <article className="leaderboard-item" key={entry._id ?? entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p className="text-muted mb-0">{entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
