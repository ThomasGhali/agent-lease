import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Newsletter = () => {
  return (
    <section id="newsletter">
      <hr className="mx-auto w-11/12" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-3xl md:text-5xl font-bold">
          Join Our Daily{' '}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-muted-foreground mt-4 mb-8 text-center text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          // onSubmit={handleSubmit}
          // you'll need server action for this,
          // or convert file to client component.
        >
          <Input
            placeholder="leomirandadev@gmail.com"
            className="bg-muted/50 dark:bg-muted/80 h-9"
            aria-label="email"
          />
          <Button size="lg" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>

      <hr className="mx-auto w-11/12" />
    </section>
  )
}
