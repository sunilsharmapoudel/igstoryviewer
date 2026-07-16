export type StoryMediaType = 1 | 2;

export interface StoryItem {
  media_type: StoryMediaType;
  thumbnail_url: string;
  video_url?: string;
}

export interface ReelItem {
  code: string;
  thumbnail_url: string;
  video_url?: string;
  like_count: number;
  play_count: number | null;
  comment_count: number;
  permalink: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  cover_url: string;
  permalink: string;
}

export interface InstagramInfo {
  username: string;
  full_name: string;
  biography: string;
  follower_count: number;
  following_count: number;
  media_count: number;
  profile_pic_url_hd: string;
  is_private: boolean;
  is_verified: boolean;
  category: string;
}

export interface StoriesLookupState {
  status: "idle" | "success" | "error";
  errormessage: string;
  username: string | null;
  fullname: string | null;
  followerscount: number | null;
  followingcount: number | null;
  postscount: number | null;
  bio: string | null;
  avatar: string | null;
  isprivate: boolean | null;
  isverified: boolean | null;
  category: string | null;
  stories: StoryItem[];
}

export const initialStoriesLookupState: StoriesLookupState = {
  status: "idle",
  errormessage: "",
  username: null,
  fullname: null,
  followerscount: null,
  followingcount: null,
  postscount: null,
  bio: null,
  avatar: null,
  isprivate: null,
  isverified: null,
  category: null,
  stories: [],
};
