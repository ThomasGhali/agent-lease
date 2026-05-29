import Link from 'next/link'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PaymentResultProps {
  success?: string
}

export default function PaymentResult({ success }: PaymentResultProps) {
  if (success === 'true') return <TruePaymentResult />
  else if (success === 'false') return <FalsePaymentResult />
  else return <InvalidPaymentResult />
}

const InvalidPaymentResult = () => (
  <div className="flex min-h-[80vh] items-center justify-center p-4">
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertCircle className="text-muted-foreground h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">Invalid Request</CardTitle>
        <CardDescription>
          We couldn't determine the status of your payment.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center border-t-0 bg-transparent pt-0">
        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
)

const TruePaymentResult = () => (
  <div className="flex min-h-[80vh] items-center justify-center p-4">
    <Card className="animate-in fade-in zoom-in w-full max-w-md shadow-lg duration-500">
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100/80 dark:bg-green-900/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-200 dark:bg-green-900/40">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
        </div>
        <CardTitle className="mb-2 text-3xl font-bold tracking-tight">
          Payment Successful
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Thank you for your purchase. Your subscription is now active and your
          account has been updated.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col justify-center space-y-3 border-t-0 bg-transparent pt-0 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button asChild className="w-full" size="lg">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
)

const FalsePaymentResult = () => (
  <div className="flex min-h-[80vh] items-center justify-center p-4">
    <Card className="animate-in fade-in zoom-in w-full max-w-md shadow-lg duration-500">
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100/80 dark:bg-red-900/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-200 dark:bg-red-900/40">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
        </div>
        <CardTitle className="mb-2 text-3xl font-bold tracking-tight">
          Payment Failed
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Unfortunately, your payment could not be processed. Please try again
          or contact support if the issue persists.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col justify-center space-y-3 border-t-0 bg-transparent pt-0 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button
          asChild
          className="w-full sm:w-[50%]"
          variant="outline"
          size="lg"
        >
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
        <Button asChild className="w-full sm:w-[50%]" size="lg">
          <Link href="/pricing">Try Again</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
)
