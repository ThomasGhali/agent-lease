'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Check, Copy, PackageOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Framework = 'nextjs' | 'nuxt'
type RepoType = 'mono' | 'standard'

const FRAMEWORKS = [
  {
    id: 'nextjs' as Framework,
    label: 'Next.js',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
    filePath: (mono: boolean) =>
      mono ? 'apps/web/app/layout.tsx' : 'app/layout.tsx',
    fileNote: 'This is your root layout — every page loads through it.',
  },
  {
    id: 'nuxt' as Framework,
    label: 'Nuxt',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8073-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .2157-.7903 1.529 1.529 0 0 0-.224-.7878L17.3292 8.2946a1.5927 1.5927 0 0 0-.5862-.5752 1.6424 1.6424 0 0 0-.808-.2117 1.6421 1.6421 0 0 0-.8079.2117 1.5927 1.5927 0 0 0-.5862.5752l-1.0767 1.843-2.0586-3.5196a1.5943 1.5943 0 0 0-.587-.5752 1.6436 1.6436 0 0 0-.808-.2118c-.2844 0-.5645.072-.8079.2118a1.5943 1.5943 0 0 0-.587.5752L.2157 17.458A1.529 1.529 0 0 0 0 18.2458c0 .2778.074.5512.2157.7903a1.59 1.59 0 0 0 .5908.5732c.2455.1375.524.2098.8073.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.6508 1.0399-1.7762 3.1193 5.329-2.694 4.0981zm-7.7039-1.5L9.1 13.3694l3.1193 5.3292H5.7603zm13.2091 0h-3.1193l-3.1193-5.3292 1.0399-1.7762 5.1987 7.1054z" />
      </svg>
    ),
    filePath: (mono: boolean) => (mono ? 'apps/web/index.html' : 'index.html'),
    fileNote: 'This is the main HTML entry point of your site.',
  },
]

function ScriptSnippet({ agentId }: { agentId: string }) {
  const [copied, setCopied] = useState(false)
  const snippet = `<script src="http://localhost:3000/widget.js" data-agent-id="${agentId}"></script>`

  return (
    <div className="border-border/50 mt-3 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-black/60">
      <div className="border-border/30 flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-[11px] text-zinc-500">html</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(snippet)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed break-all whitespace-pre-wrap text-zinc-200">
        <code>{snippet}</code>
      </pre>
    </div>
  )
}

export function AgentSetupGuide({ agentId }: { agentId: string }) {
  const [framework, setFramework] = useState<Framework>('nextjs')
  const [repoType, setRepoType] = useState<RepoType>('standard')

  const fw = FRAMEWORKS.find(f => f.id === framework)!
  const filePath = fw.filePath(repoType === 'mono')

  const steps = [
    {
      n: 1,
      title: 'Open your repository on GitHub',
      body: 'Go to github.com, sign in, and click on the repository that hosts your website.',
    },
    {
      n: 2,
      title: `Navigate to ${filePath}`,
      body: fw.fileNote,
      badge: filePath,
    },
    {
      n: 3,
      title: 'Paste the snippet & save',
      body: 'Click the pencil ✏️ icon to edit the file. Paste the snippet just before the closing </body> tag, then click "Commit changes".',
      snippet: true,
    },
  ]

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight">
            Add Agent to Your Website
          </h2>
          <Badge variant="secondary" className="font-mono text-[10px]">
            {agentId.slice(0, 8)}…
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          3 simple steps — no coding required.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Framework picker */}
        <div className="bg-muted/70 flex gap-1 rounded-lg p-1">
          {FRAMEWORKS.map(f => (
            <button
              key={f.id}
              onClick={() => setFramework(f.id)}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
                framework === f.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Repo type picker */}
        <div className="flex items-center gap-2">
          <PackageOpen className="text-muted-foreground h-4 w-4" />
          <div className="bg-muted/70 flex gap-1 rounded-lg p-1 text-xs">
            {(['standard', 'mono'] as RepoType[]).map(type => (
              <button
                key={type}
                onClick={() => setRepoType(type)}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1.5 font-medium transition-all',
                  repoType === type
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {type === 'standard' ? 'Standard' : 'Monorepo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="border-border/50 bg-card/50 rounded-xl border p-6 shadow-sm">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <div key={step.n} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 ring-primary/30 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1">
                  <span className="text-primary font-mono text-[11px] font-semibold">
                    {step.n}
                  </span>
                </div>
                {!isLast && (
                  <div className="from-border/60 mt-2 w-px flex-1 bg-linear-to-b to-transparent" />
                )}
              </div>
              <div className={cn('min-w-0 flex-1 pb-7', isLast && 'pb-0')}>
                <h4 className="text-foreground text-sm leading-none font-semibold">
                  {step.title}
                </h4>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {step.body}
                </p>
                {'badge' in step && (
                  <span className="bg-muted/60 text-muted-foreground mt-2 inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px]">
                    📄 {step.badge}
                  </span>
                )}
                {step.snippet && <ScriptSnippet agentId={agentId} />}
              </div>
            </div>
          )
        })}

        <div className="mt-6 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5 shrink-0" />
            That&apos;s it! Your agent will appear on your site after the next
            page load.
          </p>

          <Button size="xs" variant="link" asChild>
            <Link href="/dashboard/my-agents">Show Agents</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
