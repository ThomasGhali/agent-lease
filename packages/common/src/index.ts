export * from './plan-type'
import { SenderType } from '@repo/db'

export interface Message {
  sender: SenderType
  message: string
}
