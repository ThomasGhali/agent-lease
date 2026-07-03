'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Check, Copy, PackageOpen, PencilIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Framework = 'nextjs' | 'react' | 'nuxt'
type RepoType = 'mono' | 'standard'

const FRAMEWORKS = [
  {
    id: 'react' as Framework,
    label: 'React',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
    filePath: (mono: boolean) =>
      mono ? 'apps/web/public/index.html' : 'public/index.html',
    fileNote: 'This is the main HTML file of your app — it loads before anything else.',
  },
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
    filePath: (mono: boolean) => (mono ? 'apps/web/app.vue' : 'app.vue'),
    fileNote: 'This is the root component of your Nuxt app — it wraps every page.',
  },
]

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="border-border/50 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-black/60">
      <div className="border-border/30 flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-[11px] text-zinc-500">{lang}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
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
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ScriptSnippet({
  agentId,
  framework,
}: {
  agentId: string
  framework: Framework
}) {
  type Block = { label: string; lang: string; code: string }

  const snippets: Record<Framework, Block[]> = {
    nextjs: [
      {
        label: '① Paste this at the very top of your file, with the other import lines:',
        lang: 'tsx',
        code: `import Script from 'next/script'`,
      },
      {
        label: '② Paste this inside the <body> tag, just before </body>:',
        lang: 'tsx',
        code: `<Script\n  src="https://your-domain.com/widget.js"\n  data-agent-id="${agentId}"\n  strategy="lazyOnload"\n/>`,
      },
    ],
    react: [
      {
        label: 'Paste this just before the closing </body> tag:',
        lang: 'html',
        code: `<script src="https://your-domain.com/widget.js" data-agent-id="${agentId}" defer><\/script>`,
      },
    ],
    nuxt: [
      {
        label: 'Paste this inside a <script setup> block at the top of app.vue:',
        lang: 'vue',
        code: `<script setup>\nuseHead({\n  script: [\n    {\n      src: 'https://your-domain.com/widget.js',\n      'data-agent-id': '${agentId}',\n      defer: true,\n    },\n  ],\n})\n<\/script>`,
      },
    ],
  }

  const blocks = snippets[framework]

  return (
    <div className="mt-3 space-y-3">
      {blocks.map((block, i) => (
        <div key={i}>
          <p className="text-muted-foreground mb-1.5 text-xs leading-relaxed">
            {block.label}
          </p>
          <CodeBlock lang={block.lang} code={block.code} />
        </div>
      ))}
    </div>
  )
}

export function AgentSetupGuide({ agentId }: { agentId: string }) {
  const [framework, setFramework] = useState<Framework>('react')
  const [repoType, setRepoType] = useState<RepoType>('standard')

  const fw = FRAMEWORKS.find(f => f.id === framework)!
  const filePath = fw.filePath(repoType === 'mono')

  const step3Body: Record<Framework, string> = {
    nextjs:
      'Click the pencil icon to edit the file. Follow the two steps below — first add the import line at the top, then add the Script tag inside the body. Click "Commit changes" when done.',
    react:
      'Click the pencil icon to edit the file. Find the closing </body> tag near the bottom of the file and paste the snippet just before it. Click "Commit changes" when done.',
    nuxt:
        'Click the pencil icon to edit the file. Paste the useHead snippet inside a <script setup> block at the top of app.vue, then click "Commit changes" when done.',
  }

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
      body: step3Body[framework],
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
                {step.snippet && <ScriptSnippet agentId={agentId} framework={framework} />}
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
