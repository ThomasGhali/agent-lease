import { StripeService } from 'src/stripe/stripe.service';

export type StripeEvent = ReturnType<
  InstanceType<typeof StripeService>['webhooks']['constructEvent']
>;

export type StripeSubscription = Awaited<
  ReturnType<InstanceType<typeof StripeService>['subscriptions']['retrieve']>
>;

export type StripeCheckoutSession = Awaited<
  ReturnType<
    InstanceType<typeof StripeService>['checkout']['sessions']['retrieve']
  >
>;

export type StripeInvoice = Awaited<
  ReturnType<InstanceType<typeof StripeService>['invoices']['retrieve']>
>;
