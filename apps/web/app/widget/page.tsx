import Widget from '@/features/widget/components'

interface WidgetSearchParams {
  agentId: string
}

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<WidgetSearchParams>
}) {
  const { agentId } = await searchParams

  return <Widget agentId={agentId} />
}
