import { Skeleton } from "@/components/ui/skeleton"

export default function QuoteSkeleton() {
    return (
      <div className="max-w-5xl w-full space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto dark:bg-zinc-700 bg-zinc-300" />
        <Skeleton className="h-8 w-full dark:bg-zinc-700 bg-zinc-300" />
        <Skeleton className="h-8 w-2/3 mx-auto dark:bg-zinc-700 bg-zinc-300" />
        <Skeleton className="h-6 w-1/4 ml-auto dark:bg-zinc-700 bg-zinc-300" />
      </div>
    )
  }
