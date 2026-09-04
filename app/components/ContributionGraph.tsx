'use client';

import { useEffect, useState } from 'react';
import type { ContributionDay, GithubCalendar } from '../lib/types';
import styles from './ContributionGraph.module.css';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const levelClasses: Record<ContributionDay['level'], string> = {
  NONE: styles.level0,
  FIRST_QUARTILE: styles.level1,
  SECOND_QUARTILE: styles.level2,
  THIRD_QUARTILE: styles.level3,
  FOURTH_QUARTILE: styles.level4,
};

type Tooltip = {
  day: ContributionDay;
  x: number;
  y: number;
};

export default function ContributionGraph() {
  const [data, setData] = useState<GithubCalendar | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

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
    <div className={styles.graph}>
      <p className={styles.total}>{data.total} contributions in the last year</p>
      <div className={styles.scroll}>
        <div className={styles.grid} role="img" aria-label="GitHub contribution calendar">
          {data.weeks.map((week, i) => (
            <div className={styles.week} key={i}>
              {week.days.map((day) => (
                <span
                  key={day.date}
                  className={`${styles.day} ${levelClasses[day.level]}`}
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setTooltip({
                      day,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {tooltip && (
        <div
          className={styles.tooltip}
          role="tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <strong>
            {tooltip.day.count}{' '}
            {tooltip.day.count === 1 ? 'contribution' : 'contributions'}
          </strong>{' '}
          on {dateFormatter.format(new Date(`${tooltip.day.date}T00:00:00Z`))}
        </div>
      )}
    </div>
  );
}
