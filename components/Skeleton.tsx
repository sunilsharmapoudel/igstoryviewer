export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer rounded-xl ${className ?? ""}`}
      aria-hidden
    />
  );
}
