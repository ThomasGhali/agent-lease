export * from './plan-type'
import { SenderType } from '@repo/db'

type GlobalSenderType = SenderType | 'SYSTEM'

export interface Message {
  sender: GlobalSenderType
  message: string
}
