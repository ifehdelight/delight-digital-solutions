import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => (
  <div className="min-h-screen">
    {/* Hero skeleton */}
    <div className="hero-gradient py-24">
      <div className="container mx-auto px-4 text-center space-y-4">
        <Skeleton className="h-4 w-32 mx-auto bg-primary-foreground/10" />
        <Skeleton className="h-12 w-96 max-w-full mx-auto bg-primary-foreground/10" />
        <Skeleton className="h-5 w-80 max-w-full mx-auto bg-primary-foreground/10" />
      </div>
    </div>
    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-16 space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border p-6 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PageSkeleton;
