'use client';

import { useEffect, useState } from 'react';
import type { GithubCalendar } from '../lib/types';
import styles from './ContributionGraph.module.css';

export default function ContributionGraph() {
  const [data, setData] = useState<GithubCalendar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? 'Could not load GitHub.');
        setData(body);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p className={styles.status}>{error}</p>;
  }

  if (!data) {
    return <p className={styles.status}>Loading the contribution calendar.</p>;
  }

  return (
    <div>
      <p className={styles.total}>{data.total} contributions in the last year</p>
      <div className={styles.scroll}>
        <div className={styles.grid} role="img" aria-label="GitHub contribution calendar">
          {data.weeks.map((week, i) => (
            <div className={styles.week} key={i}>
              {week.days.map((day) => (
                <span
                  key={day.date}
                  className={styles.day}
                  title={`${day.date}: ${day.count}`}
                  style={{
                    background:
                      day.count === 0 ? 'var(--line)' : 'var(--forest)',
                    opacity: day.count === 0 ? 0.35 : Math.min(0.35 + day.count * 0.12, 1),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
