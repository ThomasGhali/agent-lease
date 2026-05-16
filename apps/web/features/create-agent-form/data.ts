import { InputField } from '@/features/create-agent-form/components/types'

export const inputFields: InputField[] = [
  {
    name: 'agentName',
    label: 'Agent Name',
    placeholder: 'e.g Dev Mentor',
    required: true,
  },
  {
    name: 'agentRole',
    label: 'Agent Role',
    placeholder: 'e.g Coding Mentor',
    required: true,
  },
  {
    name: 'domain',
    label: 'Domain',
    placeholder: 'e.g fakewebdevdomain.com',
    required: true,
  },
  {
    name: 'welcomeMessage',
    label: 'Welcome Message',
    placeholder: 'e.g Hello! How can I help you today?',
    required: true,
    type: 'textarea',
  },
  {
    name: 'systemPrompt',
    label: 'System Prompt',
    placeholder: 'e.g You are a helpful assistant.',
    required: true,
    type: 'textarea',
  },
  {
    name: 'fallbackMessage',
    label: 'Fallback Message',
    placeholder: 'e.g I am not sure how to help with that.',
    required: true,
    type: 'textarea',
  },
  { name: 'isActive', label: 'Is Active', required: true, type: 'switch' },
]
