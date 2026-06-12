import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQList, FAQProps } from '@/features/shared/pricing/pricing-data'
import { JSX } from 'react'

export const PricingFaqs = (): JSX.Element => (
  <section id="faq" className="container py-24 sm:py-32">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
      Frequently Asked <span className="text-primary">Questions</span>
    </h2>

    <Accordion type="single" collapsible className="AccordionRoot w-full">
      {FAQList.map(({ question, answer, value }: FAQProps) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger className="cursor-pointer text-left">
            {question}
          </AccordionTrigger>

          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    <h3 className="mt-4 font-medium">
      Still have questions?{' '}
      <a
        rel="noreferrer noopener"
        href="#"
        className="text-primary border-primary transition-all hover:border-b-2"
      >
        Contact us
      </a>
    </h3>
  </section>
)
