'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import '@/app/highlight-theme.css'

export const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert max-w-none text-sm text-foreground/90 prose-p:leading-relaxed prose-pre:p-0">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ ...props }) => (
            <pre
              {...props}
              className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm"
            />
          ),
          table: ({ ...props }) => (
            <div className="my-4 w-full overflow-x-auto">
              <table
                {...props}
                className="w-full border-collapse border border-border text-left"
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              {...props}
              className="border border-border bg-muted/50 p-2 font-medium text-foreground"
            />
          ),
          td: ({ ...props }) => (
            <td {...props} className="border border-border p-2" />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
