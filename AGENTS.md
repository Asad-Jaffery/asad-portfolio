# Project Notes

## Secrets

Do not commit real secret values. Use `.env.local` locally and the host's env/secrets settings in production.

Server-side env vars:

| Variable | Use |
| --- | --- |
| `GITHUB_TOKEN` | GitHub contribution calendar |
| `SPOTIFY_CLIENT_ID` | Spotify app id |
| `SPOTIFY_CLIENT_SECRET` | Spotify app secret |
| `SPOTIFY_REFRESH_TOKEN` | My Spotify account authorization |

Never prefix these with `NEXT_PUBLIC_`; that would expose them in the browser.

### Spotify

Visitors do not log in. The site uses my refresh token on the server to fetch recent tracks.

| Credential | Notes |
| --- | --- |
| Authorization code | One-time setup value. Do not store it. |
| Access token | Lasts about 1 hour. The API route refreshes it automatically. |
| Refresh token | Long-lived, currently about 6 months for Spotify Developer Dashboard apps. Store in env. |
| Client ID | Usually stays the same. |
| Client secret | Usually stays the same. Rotate if exposed. |

To regenerate the Spotify refresh token:

1. Make sure `.env.local` has `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
2. Make sure the Spotify app has this redirect URI:

```text
http://127.0.0.1:3000/callback
```

3. Run:

```bash
npm run spotify:token
```

4. Open the printed Spotify URL, approve access, and paste the redirected URL back into the terminal.
5. Save the printed `SPOTIFY_REFRESH_TOKEN` in `.env.local` and production env vars.

The `/callback` page may show 404. That is fine; the useful part is the `code` in the address bar.

### Deployment

Production needs:

```text
GITHUB_TOKEN
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
```

After changing production env vars, redeploy or restart the app.
