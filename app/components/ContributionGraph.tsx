"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ContributionDay, GithubCalendar } from "../lib/types";
import styles from "./ContributionGraph.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const levelClasses: Record<ContributionDay["level"], string> = {
  NONE: styles.level0,
  FIRST_QUARTILE: styles.level1,
  SECOND_QUARTILE: styles.level2,
  THIRD_QUARTILE: styles.level3,
  FOURTH_QUARTILE: styles.level4,
};
type Tooltip = { day: ContributionDay; x: number; y: number };

export default function ContributionGraph() {
  const [data, setData] = useState<GithubCalendar | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [entered, setEntered] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load GitHub.");
        setData(await res.json());
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!data || !graphRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, [data]);

  if (error)
    return (
      <div className={styles.status} role="status">
        <p>The contribution calendar is taking a break.</p>
        <button
          onClick={() => {
            setError(false);
            setAttempt((value) => value + 1);
          }}
        >
          Try again ↻
        </button>
      </div>
    );
  if (!data)
    return (
      <div className={styles.status} role="status">
        <p>Loading a year of little steps…</p>
        <div className={styles.skeleton} aria-hidden="true" />
      </div>
    );

  return (
    <div
      className={`${styles.graph} ${entered ? styles.entered : ""}`}
      ref={graphRef}
    >
      <div className={styles.summary}>
        <p>
          <strong>{data.total.toLocaleString("en-US")}</strong> contributions{" "}
          <span>in the last year</span>
        </p>
        <span className={styles.live}>
          <i /> GitHub activity
        </span>
      </div>
      <div
        className={styles.scroll}
        tabIndex={0}
        role="region"
        aria-label="Scrollable contribution calendar"
        onScroll={() => setTooltip(null)}
      >
        <div className={styles.months} aria-hidden="true">
          {data.weeks.map((week, i) => {
            const date = week.days[0]?.date;
            const previous = data.weeks[i - 1]?.days[0]?.date;
            return (
              <span key={i}>
                {date &&
                (!previous || date.slice(0, 7) !== previous.slice(0, 7))
                  ? new Date(`${date}T00:00:00Z`).toLocaleString("en-US", {
                      month: "short",
                      timeZone: "UTC",
                    })
                  : ""}
              </span>
            );
          })}
        </div>
        <div
          className={styles.grid}
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year. Green squares indicate active days.`}
        >
          {data.weeks.map((week, i) => (
            <div className={styles.week} key={i}>
              {week.days.map((day, j) => (
                <span
                  key={day.date}
                  className={`${styles.day} ${levelClasses[day.level]}`}
                  data-active={day.count > 0}
                  style={
                    {
                      "--delay": `${day.count > 0 ? (i / Math.max(data.weeks.length - 1, 1)) * 400 + j * 14 : 1050 + (i / Math.max(data.weeks.length - 1, 1)) * 250 + j * 9}ms`,
                    } as CSSProperties
                  }
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setTooltip({
                      day,
                      x: Math.max(
                        145,
                        Math.min(
                          window.innerWidth - 145,
                          rect.left + rect.width / 2,
                        ),
                      ),
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
      <div className={styles.bottom}>
        <span>A little progress adds up.</span>
        <div
          className={styles.legend}
          aria-label="Contribution intensity from less to more"
        >
          Less{" "}
          {[
            styles.level0,
            styles.level1,
            styles.level2,
            styles.level3,
            styles.level4,
          ].map((level) => (
            <i key={level} className={level} />
          ))}{" "}
          More
        </div>
      </div>
      {tooltip && (
        <div
          className={styles.tooltip}
          role="tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <strong>
            {tooltip.day.count}{" "}
            {tooltip.day.count === 1 ? "contribution" : "contributions"}
          </strong>{" "}
          on {dateFormatter.format(new Date(`${tooltip.day.date}T00:00:00Z`))}
        </div>
      )}
    </div>
  );
}
