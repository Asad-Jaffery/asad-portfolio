export type ContributionDay = {
  date: string;
  count: number;
  color: string;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GithubCalendar = {
  total: number;
  weeks: ContributionWeek[];
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string;
  albumArt: string | null;
  playedAt: string;
  url: string;
};
