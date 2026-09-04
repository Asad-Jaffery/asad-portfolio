export type ContributionDay = {
  date: string;
  count: number;
  color: string;
  level:
    | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE';
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
