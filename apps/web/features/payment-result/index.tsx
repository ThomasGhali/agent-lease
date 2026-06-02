import InvalidPaymentResult from '@/features/payment-result/invalid-payment-result'
import TruePaymentResult from '@/features/payment-result/true-payment-result'
import FalsePaymentResult from '@/features/payment-result/false-payment-result'

interface PaymentResultProps {
  success?: string
}

export default function PaymentResult({ success }: PaymentResultProps) {
  if (success === 'true') return <TruePaymentResult />
  else if (success === 'false') return <FalsePaymentResult />
  else return <InvalidPaymentResult />
}
