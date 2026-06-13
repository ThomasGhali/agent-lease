import { Button } from '@/components/ui/button'

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted/40 my-20 py-14 sm:my-28">
      <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            All Your
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {' '}
              Ideas & Concepts{' '}
            </span>
            In One Interface
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-8 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button size="lg" className="w-full sm:w-auto">
            Request a Demo
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            View all features
          </Button>
        </div>
      </div>
    </section>
  )
}
