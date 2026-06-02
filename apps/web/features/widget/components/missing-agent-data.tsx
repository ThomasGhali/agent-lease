import { AlertCircle } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const MissingAgentData = () => (
  <main className="bg-background flex h-screen items-center justify-center p-4">
    <Card className="border-destructive/20 w-full max-w-sm shadow-md">
      <CardHeader className="text-center">
        <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <AlertCircle className="text-destructive h-6 w-6" />
        </div>
        <CardTitle className="text-foreground text-lg font-semibold tracking-tight">
          Configuration Error
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-sm">
          This widget is missing a valid <strong>agentId</strong> or{' '}
          <strong>hostname</strong>. Please check your embed code.
        </CardDescription>
      </CardHeader>
    </Card>
  </main>
)

export default MissingAgentData
