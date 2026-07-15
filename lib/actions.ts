"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  InstagramApiError,
  fetchInstagramHighlights,
  fetchInstagramInfo,
  fetchInstagramReels,
  fetchInstagramStories,
  friendlyErrorMessage,
  toProxiedImageUrl,
} from "@/lib/instagram";
import {
  initialStoriesLookupState,
  type HighlightItem,
  type ReelItem,
  type StoriesLookupState,
} from "@/types/instagram";

async function getClientIp() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

async function rateLimitOrMessage() {
  const ip = await getClientIp();
  const { success } = await checkRateLimit(ip);
  return success
    ? null
    : "Too many requests, please try again later in 1 minute.";
}

export async function getStories(
  _prevState: StoriesLookupState,
  formData: FormData
): Promise<StoriesLookupState> {
  const username = formData.get("username")?.toString().trim();

  if (!username) {
    return {
      ...initialStoriesLookupState,
      status: "error",
      errormessage: "Enter username or userid or url.",
    };
  }

  const rateLimitMessage = await rateLimitOrMessage();
  if (rateLimitMessage) {
    return {
      ...initialStoriesLookupState,
      status: "error",
      errormessage: rateLimitMessage,
    };
  }

  try {
    const info = await fetchInstagramInfo(username);
    const { items: stories } = await fetchInstagramStories(username);

    const bio = info.biography || `${info.full_name.toUpperCase()} don't have bio`;

    return {
      status: "success",
      errormessage: "",
      username: info.username,
      fullname: info.full_name.toUpperCase(),
      followerscount: info.follower_count,
      followingcount: info.following_count,
      postscount: info.media_count,
      bio,
      avatar: toProxiedImageUrl(info.profile_pic_url_hd),
      isprivate: info.is_private,
      isverified: info.is_verified,
      category: info.category || null,
      stories,
    };
  } catch (error) {
    const detail =
      error instanceof InstagramApiError ? error.message : "Something went wrong. Please try again.";
    return {
      ...initialStoriesLookupState,
      status: "error",
      errormessage: friendlyErrorMessage(detail, username),
    };
  }
}

export interface ReelsLookupResult {
  status: "success" | "error";
  errormessage: string;
  items: ReelItem[];
  nextMaxId: string | null;
}

export async function getReels(
  username: string,
  maxId: string | null
): Promise<ReelsLookupResult> {
  const rateLimitMessage = await rateLimitOrMessage();
  if (rateLimitMessage) {
    return { status: "error", errormessage: rateLimitMessage, items: [], nextMaxId: null };
  }

  try {
    const { items, nextMaxId } = await fetchInstagramReels(username, maxId);
    return { status: "success", errormessage: "", items, nextMaxId };
  } catch (error) {
    const detail =
      error instanceof InstagramApiError ? error.message : "Something went wrong. Please try again.";
    return {
      status: "error",
      errormessage: friendlyErrorMessage(detail, username),
      items: [],
      nextMaxId: null,
    };
  }
}

export interface HighlightsLookupResult {
  status: "success" | "error";
  errormessage: string;
  items: HighlightItem[];
}

export async function getHighlights(
  username: string
): Promise<HighlightsLookupResult> {
  const rateLimitMessage = await rateLimitOrMessage();
  if (rateLimitMessage) {
    return { status: "error", errormessage: rateLimitMessage, items: [] };
  }

  try {
    const items = await fetchInstagramHighlights(username);
    return { status: "success", errormessage: "", items };
  } catch (error) {
    const detail =
      error instanceof InstagramApiError ? error.message : "Something went wrong. Please try again.";
    return {
      status: "error",
      errormessage: friendlyErrorMessage(detail, username),
      items: [],
    };
  }
}
