import { NextResponse } from 'next/server';
import type { SpotifyTrack } from '../../lib/types';

async function refreshAccessToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

export async function GET() {
  const access = await refreshAccessToken();
  if (!access) {
    return NextResponse.json(
      { error: 'Spotify is not connected.' },
      { status: 503 },
    );
  }

  const res = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=12',
    {
      headers: { Authorization: `Bearer ${access}` },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Spotify did not return recent tracks.' },
      { status: 502 },
    );
  }

  const data = await res.json();
  const tracks: SpotifyTrack[] = (data.items ?? []).map(
    (item: {
      played_at: string;
      track: {
        id: string;
        name: string;
        external_urls?: { spotify?: string };
        artists?: { name: string }[];
        album?: { images?: { url: string }[] };
      };
    }) => ({
      id: `${item.track.id}-${item.played_at}`,
      name: item.track.name,
      artists: (item.track.artists ?? []).map((a) => a.name).join(', '),
      albumArt: item.track.album?.images?.[1]?.url ?? item.track.album?.images?.[0]?.url ?? null,
      playedAt: item.played_at,
      url: item.track.external_urls?.spotify ?? '',
    }),
  );

  return NextResponse.json({ tracks });
}
