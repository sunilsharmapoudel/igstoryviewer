"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import type {
  HighlightItem,
  ReelItem,
  StoriesLookupState,
  StoryItem,
} from "@/types/instagram";
import { getHighlights, getHighlightStories, getReels } from "@/lib/actions";
import DownloadButton from "@/components/DownloadButton";
import Skeleton from "@/components/Skeleton";
import {
  BadgeCheckIcon,
  UsersIcon,
  GridIcon,
  LockIcon,
  PlayIcon,
  HeartIcon,
  ExternalLinkIcon,
  StarIcon,
  ImageIcon,
  EyeOffIcon,
  ArrowRightIcon,
} from "@/components/icons";

type Tab = "stories" | "reels" | "highlights";
type IconComponent = React.ComponentType<{ className?: string }>;

function proxyImage(url: string) {
  return `https://phosphor.utils.elfsightcdn.com/?url=${encodeURIComponent(
    url
  )}`;
}

function formatCount(value: number | null | undefined) {
  if (value == null) return "-";
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

interface ReelsState {
  status: "idle" | "success" | "error";
  errormessage: string;
  items: ReelItem[];
  nextMaxId: string | null;
}

interface HighlightsState {
  status: "idle" | "success" | "error";
  errormessage: string;
  items: HighlightItem[];
}

interface HighlightDetailState {
  id: string;
  title: string;
  status: "success" | "error";
  errormessage: string;
  items: StoryItem[];
}

export default function ResultsPanel({ state }: { state: StoriesLookupState }) {
  const {
    username,
    fullname,
    followerscount,
    followingcount,
    postscount,
    bio,
    avatar,
    isprivate,
    isverified,
    category,
    stories,
  } = state;

  const [activeTab, setActiveTab] = useState<Tab>("stories");

  const [reels, setReels] = useState<ReelsState>({
    status: "idle",
    errormessage: "",
    items: [],
    nextMaxId: null,
  });
  const [isReelsPending, startReelsTransition] = useTransition();

  const [highlights, setHighlights] = useState<HighlightsState>({
    status: "idle",
    errormessage: "",
    items: [],
  });
  const [isHighlightsPending, startHighlightsTransition] = useTransition();

  const [highlightDetail, setHighlightDetail] =
    useState<HighlightDetailState | null>(null);
  const [isHighlightDetailPending, startHighlightDetailTransition] =
    useTransition();

  function loadReels(maxId: string | null) {
    if (!username) return;
    startReelsTransition(async () => {
      const result = await getReels(username, maxId);
      setReels((prev) => ({
        status: result.status,
        errormessage: result.errormessage,
        items: maxId ? [...prev.items, ...result.items] : result.items,
        nextMaxId: result.nextMaxId,
      }));
    });
  }

  function loadHighlights() {
    if (!username) return;
    startHighlightsTransition(async () => {
      const result = await getHighlights(username);
      setHighlights({
        status: result.status,
        errormessage: result.errormessage,
        items: result.items,
      });
    });
  }

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    if (tab !== "highlights") setHighlightDetail(null);
    if (tab === "reels" && reels.status === "idle") loadReels(null);
    if (tab === "highlights" && highlights.status === "idle") loadHighlights();
  }

  function openHighlight(highlight: HighlightItem) {
    const highlightId = highlight.id.split(":")[1] ?? highlight.id;
    setHighlightDetail({
      id: highlight.id,
      title: highlight.title,
      status: "success",
      errormessage: "",
      items: [],
    });
    startHighlightDetailTransition(async () => {
      const result = await getHighlightStories(highlightId);
      setHighlightDetail({
        id: highlight.id,
        title: highlight.title,
        status: result.status,
        errormessage: result.errormessage,
        items: result.items,
      });
    });
  }

  return (
    <div className="animate-fade-up mt-12">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:text-left">
          <div className="relative shrink-0">
            {avatar && (
              <div className="rounded-full bg-linear-to-br from-accent-pink via-accent-purple to-primary p-0.75">
                <div className="rounded-full bg-white p-0.75">
                  <Image
                    src={avatar}
                    alt={username ?? "Profile picture"}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>
              </div>
            )}
            {isverified && (
              <BadgeCheckIcon className="absolute -right-1 -bottom-1 h-6 w-6 text-primary drop-shadow" />
            )}
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-title">{username}</p>
            <p className="mt-0.5 text-sm text-muted">
              {fullname}
              {category ? ` · ${category}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={UsersIcon} label="Followers" value={formatCount(followerscount)} />
          <StatCard icon={UsersIcon} label="Following" value={formatCount(followingcount)} />
          <StatCard icon={GridIcon} label="Posts" value={formatCount(postscount)} />
          <StatCard icon={LockIcon} label="Private" value={isprivate ? "Yes" : "No"} />
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-semibold text-title">About</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{bio}</p>
      </div>

      <div className="mt-8 inline-flex w-full gap-1 rounded-full bg-surface p-1 text-sm font-medium sm:w-auto">
        <TabButton icon={GridIcon} label="Stories" active={activeTab === "stories"} onClick={() => selectTab("stories")} />
        <TabButton icon={PlayIcon} label="Reels" active={activeTab === "reels"} onClick={() => selectTab("reels")} />
        <TabButton icon={StarIcon} label="Highlights" active={activeTab === "highlights"} onClick={() => selectTab("highlights")} />
      </div>

      <div className="mt-6">
        {activeTab === "stories" && (
          <StoriesGrid stories={stories} isprivate={isprivate} />
        )}

        {activeTab === "reels" && (
          <ReelsGrid
            reels={reels}
            isPending={isReelsPending}
            onLoadMore={() => loadReels(reels.nextMaxId)}
          />
        )}

        {activeTab === "highlights" &&
          (highlightDetail ? (
            <HighlightDetail
              detail={highlightDetail}
              isPending={isHighlightDetailPending}
              onBack={() => setHighlightDetail(null)}
            />
          ) : (
            <HighlightsGrid
              highlights={highlights}
              isPending={isHighlightsPending}
              onSelect={openHighlight}
            />
          ))}
      </div>
    </div>
  );
}

function MediaCard({
  aspect = "aspect-9/16",
  onClick,
  children,
}: {
  aspect?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className = `group relative ${aspect} overflow-hidden rounded-2xl border border-border bg-surface-2${
    onClick ? " cursor-pointer" : ""
  }`;

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
        className={className}
      >
        {children}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}

function StoriesGrid({
  stories,
  isprivate,
}: {
  stories: StoriesLookupState["stories"];
  isprivate: boolean | null;
}) {
  if (stories.length === 0) {
    return (
      <EmptyState
        icon={isprivate ? EyeOffIcon : ImageIcon}
        message={
          isprivate
            ? "This account is private."
            : "No stories uploaded in the past 24 hours."
        }
      />
    );
  }

  return <StoryItemsGrid items={stories} />;
}

function StoryItemsGrid({ items }: { items: StoryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {items.map((story, index) => (
        <MediaCard key={index}>
          {story.media_type === 1 ? (
            <Image
              src={proxyImage(story.thumbnail_url)}
              alt="Instagram story"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <video
              controls
              src={story.video_url}
              className="h-full w-full object-cover"
            />
          )}
          <DownloadButton
            src={
              story.media_type === 1
                ? story.thumbnail_url
                : (story.video_url ?? story.thumbnail_url)
            }
          />
        </MediaCard>
      ))}
    </div>
  );
}

function ReelsGrid({
  reels,
  isPending,
  onLoadMore,
}: {
  reels: ReelsState;
  isPending: boolean;
  onLoadMore: () => void;
}) {
  if (reels.status === "error") {
    return <ErrorState message={reels.errormessage} />;
  }

  if (reels.items.length === 0) {
    if (isPending) return <SkeletonGrid />;
    return <EmptyState icon={PlayIcon} message="No reels found." />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {reels.items.map((reel) => (
          <MediaCard key={reel.code}>
            <Image
              src={proxyImage(reel.thumbnail_url)}
              alt="Instagram reel"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() =>
                window.open(
                  reel.video_url ?? reel.permalink,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              aria-label="Play reel"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-110">
                <PlayIcon className="h-5 w-5" />
              </span>
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/85 via-black/40 to-transparent px-3 py-3 text-xs font-medium text-white">
              <span className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <PlayIcon className="h-3 w-3" />
                  {formatCount(reel.play_count)}
                </span>
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-3 w-3" />
                  {formatCount(reel.like_count)}
                </span>
              </span>
              <a
                href={reel.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View reel on Instagram"
                className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-1 backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ExternalLinkIcon className="h-3 w-3" />
              </a>
            </div>
            <DownloadButton src={reel.video_url ?? reel.thumbnail_url} />
          </MediaCard>
        ))}
      </div>

      {reels.nextMaxId && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-2.5 text-sm font-semibold text-title shadow-soft transition-all hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-title/30 border-t-title" />
            )}
            {isPending ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}

function HighlightsGrid({
  highlights,
  isPending,
  onSelect,
}: {
  highlights: HighlightsState;
  isPending: boolean;
  onSelect: (highlight: HighlightItem) => void;
}) {
  if (highlights.status === "error") {
    return <ErrorState message={highlights.errormessage} />;
  }

  if (highlights.items.length === 0) {
    if (isPending) return <SkeletonGrid aspect="aspect-square" />;
    return <EmptyState icon={StarIcon} message="No highlights found." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {highlights.items.map((highlight) => (
        <MediaCard
          key={highlight.id}
          aspect="aspect-square"
          onClick={() => onSelect(highlight)}
        >
          <Image
            src={proxyImage(highlight.cover_url)}
            alt={highlight.title}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/85 via-black/30 to-transparent px-3 py-3 text-xs font-medium text-white">
            <span className="truncate">{highlight.title}</span>
            <a
              href={highlight.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View highlight on Instagram"
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-1 backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
          <DownloadButton src={highlight.cover_url} />
        </MediaCard>
      ))}
    </div>
  );
}

function HighlightDetail({
  detail,
  isPending,
  onBack,
}: {
  detail: HighlightDetailState;
  isPending: boolean;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-title hover:text-primary"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" />
        {detail.title}
      </button>

      {detail.status === "error" && <ErrorState message={detail.errormessage} />}

      {detail.status === "success" && detail.items.length === 0 && !isPending && (
        <EmptyState icon={StarIcon} message="No items found in this highlight." />
      )}

      {detail.status === "success" && detail.items.length === 0 && isPending && (
        <SkeletonGrid />
      )}

      {detail.status === "success" && detail.items.length > 0 && (
        <StoryItemsGrid items={detail.items} />
      )}
    </div>
  );
}

function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: IconComponent;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 transition-colors sm:flex-none sm:px-5 ${
        active ? "bg-white text-title shadow-soft" : "text-muted hover:text-title"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: IconComponent;
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3.5 transition-colors hover:bg-surface-2">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-2 text-lg font-bold text-title">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, message }: { icon: IconComponent; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
      <Icon className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-muted">{message}</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-error/20 bg-error-bg px-5 py-8 text-center text-sm font-medium text-error">
      {message}
    </div>
  );
}

function SkeletonGrid({ aspect = "aspect-9/16" }: { aspect?: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className={`${aspect} w-full`} />
      ))}
    </div>
  );
}
