import PaymentResult from '@/features/payment-result'

interface ResultSearchParams {
  success?: string
}

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<ResultSearchParams>
}) {
  const { success } = await searchParams

  return <PaymentResult success={success} />
}
