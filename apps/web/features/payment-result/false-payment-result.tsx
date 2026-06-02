import Link from 'next/link'
import { XCircle } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

export default FalsePaymentResult
