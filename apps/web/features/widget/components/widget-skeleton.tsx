export default function WidgetSkeleton() {
  return (
    <div className="bg-background border-border/50 pointer-events-auto relative mt-auto flex h-screen w-full flex-col items-center justify-start overflow-hidden rounded-4xl border shadow-2xl">
      <header className="border-b-muted-foreground/30 flex h-[70px] w-full shrink-0 items-center justify-between border-b px-7 py-2">
        <div className="space-y-2">
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          <div className="bg-muted h-3 w-16 animate-pulse rounded" />
        </div>
        <div className="flex gap-3">
          <div className="bg-muted h-6 w-6 animate-pulse rounded-full" />
          <div className="bg-muted h-6 w-6 animate-pulse rounded-full" />
        </div>
      </header>

      <main className="w-full flex-1 space-y-6 overflow-hidden p-6">
        <div className="flex justify-center">
          <div className="bg-muted h-6 w-48 animate-pulse rounded-full" />
        </div>

        <div className="flex flex-col items-end space-y-1">
          <div className="bg-muted h-10 w-[60%] animate-pulse rounded-2xl rounded-tr-none" />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <div className="bg-muted h-16 w-[75%] animate-pulse rounded-2xl rounded-tl-none" />
        </div>

        <div className="flex flex-col items-end space-y-1">
          <div className="bg-muted h-10 w-[45%] animate-pulse rounded-2xl rounded-tr-none" />
        </div>
      </main>

      <footer className="absolute bottom-7 w-[calc(100%-3.5rem)]">
        <div className="bg-muted border-border/10 h-12 w-full animate-pulse rounded-3xl border" />
      </footer>
    </div>
  )
}
