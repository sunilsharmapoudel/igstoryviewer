import type {
  HighlightItem,
  InstagramInfo,
  ReelItem,
  StoryItem,
} from "@/types/instagram";

const RAPIDAPI_HOST = "instagram120.p.rapidapi.com";

class InstagramApiError extends Error {}

interface RawUserInfoUser {
  username: string;
  full_name: string;
  biography: string;
  follower_count: number;
  following_count: number;
  media_count: number;
  hd_profile_pic_url_info: { url: string };
  is_private: boolean;
  is_verified: boolean;
  category: string | null;
}

interface RawUserInfoEntry {
  user: RawUserInfoUser;
}

interface RawImageCandidate {
  url: string;
  width: number;
  height: number;
}

interface RawVideoVersion {
  url: string;
  width?: number;
  height?: number;
}

interface RawStoryItem {
  image_versions2: { candidates: RawImageCandidate[] };
  video_versions?: RawVideoVersion[];
}

interface RawReelMedia {
  code: string;
  image_versions2: { candidates: RawImageCandidate[] };
  like_count: number;
  play_count: number | null;
  comment_count: number;
}

interface RawReelsResponse {
  edges: Array<{ node: { media: RawReelMedia } }>;
  page_info: { end_cursor: string | null; has_next_page: boolean };
}

interface RawHighlightItem {
  id: string;
  title: string;
  cover_media?: { cropped_image_version?: { url: string } };
}

function rapidApiHeaders() {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new InstagramApiError(
      "Server is missing the RAPIDAPI_KEY environment variable."
    );
  }
  return {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": RAPIDAPI_HOST,
    "Content-Type": "application/json",
  };
}

async function rapidApiPost<T>(
  path: string,
  requestBody: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`https://${RAPIDAPI_HOST}${path}`, {
    method: "POST",
    headers: rapidApiHeaders(),
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });

  const responseBody = await response.json();

  if (!response.ok || responseBody?.success === false) {
    throw new InstagramApiError(
      responseBody?.message ?? "Instagram lookup failed."
    );
  }

  return responseBody.result as T;
}

function bestUrl(
  candidates: Array<{ url: string; width?: number }> | undefined
): string | undefined {
  if (!candidates || candidates.length === 0) return undefined;
  return candidates.reduce((best, current) =>
    (current.width ?? 0) > (best.width ?? 0) ? current : best
  ).url;
}

export async function fetchInstagramInfo(
  usernameOrUrl: string
): Promise<InstagramInfo> {
  const [entry] = await rapidApiPost<RawUserInfoEntry[]>(
    "/api/instagram/userInfo",
    { username: usernameOrUrl }
  );
  const user = entry.user;

  return {
    username: user.username,
    full_name: user.full_name,
    biography: user.biography,
    follower_count: user.follower_count,
    following_count: user.following_count,
    media_count: user.media_count,
    profile_pic_url_hd: user.hd_profile_pic_url_info.url,
    is_private: user.is_private,
    is_verified: user.is_verified,
    category: user.category ?? "",
  };
}

export async function fetchInstagramStories(
  usernameOrUrl: string
): Promise<{ items: StoryItem[] }> {
  const rawItems = await rapidApiPost<RawStoryItem[]>(
    "/api/instagram/stories",
    { username: usernameOrUrl }
  );

  const items: StoryItem[] = rawItems.map((item) => {
    const video_url = bestUrl(item.video_versions);
    return {
      media_type: video_url ? 2 : 1,
      thumbnail_url: bestUrl(item.image_versions2?.candidates) ?? "",
      video_url,
    };
  });

  return { items };
}

export async function fetchInstagramReels(
  usernameOrUrl: string,
  maxId: string | null
): Promise<{ items: ReelItem[]; nextMaxId: string | null }> {
  const raw = await rapidApiPost<RawReelsResponse>("/api/instagram/reels", {
    username: usernameOrUrl,
    maxId: maxId ?? "",
  });

  const items: ReelItem[] = raw.edges.map(({ node }) => {
    const media = node.media;
    return {
      code: media.code,
      thumbnail_url: bestUrl(media.image_versions2?.candidates) ?? "",
      like_count: media.like_count,
      play_count: media.play_count,
      comment_count: media.comment_count,
      permalink: `https://www.instagram.com/reel/${media.code}/`,
    };
  });

  return {
    items,
    nextMaxId: raw.page_info.has_next_page ? raw.page_info.end_cursor : null,
  };
}

export async function fetchInstagramHighlights(
  usernameOrUrl: string
): Promise<HighlightItem[]> {
  const rawItems = await rapidApiPost<RawHighlightItem[]>(
    "/api/instagram/highlights",
    { username: usernameOrUrl }
  );

  return rawItems.map((item) => {
    const numericId = item.id.split(":")[1] ?? item.id;
    return {
      id: item.id,
      title: item.title,
      cover_url: item.cover_media?.cropped_image_version?.url ?? "",
      permalink: `https://www.instagram.com/stories/highlights/${numericId}/`,
    };
  });
}

export function toProxiedImageUrl(originalUrl: string) {
  return `https://phosphor.utils.elfsightcdn.com/?url=${encodeURIComponent(
    originalUrl
  )}`;
}

export function friendlyErrorMessage(detail: string, username: string) {
  if (detail === "The page not found.") {
    return `🧐 Please check again, ${username} account doesn't exist.`;
  }
  return detail;
}

export { InstagramApiError };
