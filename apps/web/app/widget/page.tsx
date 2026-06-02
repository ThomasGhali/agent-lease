import Widget from '@/features/widget/components'

interface WidgetSearchParams {
  agentId: string
  hostname: string
}

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<WidgetSearchParams>
}) {
  const { agentId, hostname } = await searchParams

  return <Widget agentId={agentId} hostname={hostname} />
}
