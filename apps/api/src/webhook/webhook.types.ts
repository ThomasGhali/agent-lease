import Stripe from 'stripe';

export type StripeEvent = ReturnType<
  InstanceType<typeof Stripe>['webhooks']['constructEvent']
>;

export type StripeSubscription = Awaited<
  ReturnType<InstanceType<typeof Stripe>['subscriptions']['retrieve']>
>;

export type StripeCheckoutSession = Awaited<
  ReturnType<InstanceType<typeof Stripe>['checkout']['sessions']['retrieve']>
>;

export type StripeInvoice = Awaited<
  ReturnType<InstanceType<typeof Stripe>['invoices']['retrieve']>
>;
