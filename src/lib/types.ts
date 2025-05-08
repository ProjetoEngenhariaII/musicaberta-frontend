export type Sheet = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  songWriter: string;
  pdfUrl: string;
  mp3Url: string;
  badges: string[];
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};
export type Request = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  badges: string;
  status: string;
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  _count: {
    Sheet: number;
  };
};
export type MetaResponseBody = {
  current: number;
  path: string;
  prev: number | null;
  next: number | null;
  last: number;
  total: number;
};

export type SheetsResponseBody = {
  data: Sheet[];
  meta: MetaResponseBody;
};

export type FavoritesResponseBody = {
  favorites: {
    favoriteId: string;
    sheet: Sheet;
  }[];
};
