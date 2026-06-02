import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const InvalidPaymentResult = () => (
  <div className="flex min-h-[80vh] items-center justify-center p-4">
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertCircle className="text-muted-foreground h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">Invalid Request</CardTitle>
        <CardDescription>
          We couldn&apos;t determine the status of your payment.
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

export default InvalidPaymentResult
