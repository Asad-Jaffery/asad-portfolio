# Asad Jaffery

Personal site. Next.js + TypeScript.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Env

| Variable | Why |
| --- | --- |
| `GITHUB_TOKEN` | GraphQL contribution calendar for `Asad-Jaffery` |
| `SPOTIFY_CLIENT_ID` | Spotify app |
| `SPOTIFY_CLIENT_SECRET` | Spotify app |
| `SPOTIFY_REFRESH_TOKEN` | Your account, one-time auth |

Without these, the GitHub and Spotify sections show a quiet error. The rest of the page still works.

## Spotify refresh token (once)

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Add a redirect URI such as `http://127.0.0.1:3000/callback`.
3. Open this URL in a browser (replace `CLIENT_ID`):

```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:3000/callback&scope=user-read-recently-played
```

4. Copy `code` from the redirect URL.
5. Exchange it with the helper:

```bash
npm run spotify:token
```

6. Put the printed `SPOTIFY_REFRESH_TOKEN` value in `.env.local`. Visitors never log in. Only your plays are shown.

## GitHub token

A classic or fine-grained token that can read public user data is enough. The calendar comes from GraphQL `contributionsCollection`, not REST.

## Hosting

Not decided yet. Next.js Route Handlers are ready for a later serverless host.
