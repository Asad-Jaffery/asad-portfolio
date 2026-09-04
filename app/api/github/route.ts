import { NextResponse } from 'next/server';
import type { GithubCalendar } from '../../lib/types';

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token is not set.' },
      { status: 503 },
    );
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { login: 'Asad-Jaffery' },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'GitHub did not return the calendar.' },
      { status: 502 },
    );
  }

  const json = await res.json();
  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json(
      { error: 'No contribution calendar on this account.' },
      { status: 502 },
    );
  }

  const payload: GithubCalendar = {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map(
      (week: {
        contributionDays: {
          date: string;
          contributionCount: number;
          color: string;
        }[];
      }) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
        })),
      }),
    ),
  };

  return NextResponse.json(payload);
}
