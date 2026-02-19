interface SkeletonProps {
  className?: string;
}

/** Base skeleton pulse block */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded bg-lafa-border/30 ${className}`} />
  );
}

/** Skeleton for a row of table cells */
export function SkeletonTableRows({
  rows = 5,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-lafa-border/50">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="py-3 px-4">
              <Skeleton className="h-4 w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/** Skeleton for KPI stat cards */
export function SkeletonKPICards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-lafa-surface border border-lafa-border rounded-xl p-6"
        >
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}
