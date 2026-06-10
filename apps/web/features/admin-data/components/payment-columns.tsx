'use client'

import { type ColumnDef } from '@tanstack/react-table'
import {
  MoreHorizontal,
  Copy,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { RecentPayment } from '@/features/admin-data/types'

/**
 * Renders a colored status badge based on the payment status.
 */
function StatusBadge({ status }: { status: string }) {
  if (status === 'succeeded') {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      >
        <CheckCircle2 className="size-3" />
        Paid
      </Badge>
    )
  }

  if (status === 'pending') {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      >
        <Clock className="size-3" />
        Pending
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20 gap-1.5"
    >
      <AlertCircle className="size-3" />
      {status}
    </Badge>
  )
}

/**
 * Formats a numeric amount with its currency code using `Intl.NumberFormat`.
 */
function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Row-level actions dropdown for a single payment row.
 */
function PaymentActions({ payment }: { payment: RecentPayment }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(payment.id)
            toast.success('Transaction ID copied to clipboard')
          }}
          className="cursor-pointer gap-2"
        >
          <Copy className="text-muted-foreground size-4" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          View Customer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const paymentColumns: ColumnDef<RecentPayment>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => (
      <div className="text-muted-foreground w-[120px] truncate font-mono text-xs">
        {row.getValue('id')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="text-foreground font-medium">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('date')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const { amount, currency } = row.original

      return (
        <div className="text-foreground text-right font-bold">
          {formatCurrency(amount, currency)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <PaymentActions payment={row.original} />,
  },
]
