import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

export default TruePaymentResult
