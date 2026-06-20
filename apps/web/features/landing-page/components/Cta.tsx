import { Button } from '@/components/ui/button'

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted my-15 py-15 sm:py-20 sm:my-20">
      <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            All Your
            <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {' '}
              AI Agents{' '}
            </span>
            In One Dashboard
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-8 md:text-xl">
            Create, customize, and manage all your chatbot agents from a single
            dashboard. Monitor conversations, adjust behavior, and deploy
            updates — all in real time.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button size="lg" className="w-full sm:w-auto">
            Try It Free
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            View All Features
          </Button>
        </div>
      </div>
    </section>
  )
}
