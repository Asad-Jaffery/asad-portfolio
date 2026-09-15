"use client";

import { useEffect, useState } from "react";
import type { SpotifyTrack } from "../lib/types";
import styles from "./SpotifyRecent.module.css";

function SpotifyMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.spotifyMark}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M5.5 8.7c4.4-1.3 8.9-1 13 1.2M6.4 12.1c3.6-1 7.2-.7 10.7 1M7.3 15.3c2.8-.8 5.7-.5 8.3.8"
        fill="none"
        stroke="#121212"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SpotifyRecent() {
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/spotify", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load Spotify.");
        const body = await res.json();
        setTracks(body.tracks);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [attempt]);

  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <SpotifyMark />
          <span>Spotify</span>
        </div>
        <span className={styles.pill}>Recently played</span>
      </div>
      {error ? (
        <div className={styles.status} role="status">
          <p>The music will be back in a bit.</p>
          <button
            onClick={() => {
              setError(false);
              setAttempt((value) => value + 1);
            }}
          >
            Try again ↻
          </button>
        </div>
      ) : !tracks ? (
        <div className={styles.loading} role="status">
          <span>Finding the last few tracks…</span>
          <div className={styles.skeletons} aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} />
            ))}
          </div>
        </div>
      ) : tracks.length === 0 ? (
        <p className={styles.status}>
          Nothing played lately. Check back for the next track.
        </p>
      ) : (
        <ul className={styles.list}>
          {tracks.map((track) => (
            <li key={track.id}>
              <a
                className={styles.track}
                href={track.url || undefined}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${track.name} by ${track.artists} in Spotify`}
              >
                <div className={styles.artwork}>
                  {track.albumArt ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={track.albumArt}
                      alt={`${track.name} cover art`}
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                  ) : (
                    <span className={styles.placeholder} aria-hidden="true">
                      ♫
                    </span>
                  )}
                  <span className={styles.play} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="m8 5 11 7-11 7Z" />
                    </svg>
                  </span>
                </div>
                <strong title={track.name}>{track.name}</strong>
                <span className={styles.artist} title={track.artists}>
                  {track.artists}
                </span>
                <span className={styles.open}>
                  Listen on Spotify <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.bottom}>
        <span className={styles.equalizer} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>{" "}
        A little of what&apos;s been in my headphones.
      </div>
    </div>
  );
}
