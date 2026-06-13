import { Radar } from 'lucide-react'
import type { ReactElement } from 'react'

interface SponsorProps {
  icon: ReactElement
  name: string
}

const sponsors: SponsorProps[] = [
  { icon: <Radar size={34} />, name: "OpenAI" },
  { icon: <Radar size={34} />, name: "Vercel" },
  { icon: <Radar size={34} />, name: "Supabase" },
  { icon: <Radar size={34} />, name: "Stripe" },
  { icon: <Radar size={34} />, name: "AWS" },
  { icon: <Radar size={34} />, name: "Cloudflare" },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="mb-8 text-center text-base font-bold text-primary lg:text-xl">
        Powered by industry-leading technology
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>{icon}</span>
            <h3 className="text-xl  font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
