'use client';

import { useEffect, useState } from 'react';
import type { SpotifyTrack } from '../lib/types';
import styles from './SpotifyRecent.module.css';

export default function SpotifyRecent() {
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/spotify')
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? 'Could not load Spotify.');
        setTracks(body.tracks);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p className={styles.status}>{error}</p>;
  }

  if (!tracks) {
    return <p className={styles.status}>Loading recent tracks.</p>;
  }

  if (tracks.length === 0) {
    return <p className={styles.status}>No recent plays to show.</p>;
  }

  return (
    <ul className={styles.list}>
      {tracks.map((track) => (
        <li key={track.id}>
          <a className={styles.row} href={track.url} target="_blank" rel="noreferrer">
            {track.albumArt ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={track.albumArt} alt="" width={48} height={48} />
            ) : (
              <span className={styles.ph} />
            )}
            <span>
              <strong>{track.name}</strong>
              <em>{track.artists}</em>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
