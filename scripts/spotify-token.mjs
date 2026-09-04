import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? 'http://127.0.0.1:3000/callback';
const scope = 'user-read-recently-played';
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running this script.');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('scope', scope);

console.log('\nOpen this URL and approve access:\n');
console.log(authUrl.toString());
console.log('\nAfter Spotify redirects, paste the full browser URL or just the code= value.\n');

const rl = createInterface({ input, output });
const pasted = (await rl.question('Spotify redirect URL or code: ')).trim();
rl.close();

let code = pasted;
try {
  const redirectUrl = new URL(pasted);
  code = redirectUrl.searchParams.get('code') ?? pasted;
} catch {
  if (pasted.includes('&')) {
    code = pasted.split('&')[0];
  }
}

const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  }),
});

const tokenBody = await tokenRes.json();

if (!tokenRes.ok) {
  console.error('\nSpotify token exchange failed:');
  console.error(JSON.stringify(tokenBody, null, 2));
  process.exit(1);
}

console.log('\nAdd this to .env.local:\n');
console.log(`SPOTIFY_REFRESH_TOKEN=${tokenBody.refresh_token}`);
