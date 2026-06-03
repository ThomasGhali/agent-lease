import { InputField } from '@/features/create-agent-form/components/types'

export const inputFields: InputField[] = [
  {
    name: 'agentName',
    label: 'Agent Name',
    placeholder: 'e.g Dev Mentor',
    required: true,
    maxLength: 50,
    className:'md:col-span-1'
  },
  {
    name: 'agentRole',
    label: 'Agent Role',
    placeholder: 'e.g Coding Mentor',
    required: true,
    maxLength: 50,
    className:'md:col-span-1'
  },
  {
    name: 'hostname',
    label: 'Hostname',
    placeholder: 'e.g fakewebdevdomain.com',
    required: true,
    maxLength: 50,
  },
  {
    name: 'welcomeMessage',
    label: 'Welcome Message',
    placeholder: 'e.g Hello! How can I help you today?',
    required: false,
    type: 'textarea',
    maxLength: 250,
  },
  {
    name: 'systemPrompt',
    label: 'System Prompt',
    placeholder: 'e.g You are a helpful assistant.',
    required: true,
    type: 'textarea',
    maxLength: 500,
  },
  {
    name: 'fallbackMessage',
    label: 'Fallback Message',
    placeholder: 'e.g I am not sure how to help with that.',
    required: false,
    type: 'textarea',
    maxLength: 250,
  },
  {
    name: 'isActive',
    label: 'Is Active',
    required: true,
    type: 'switch',
  },
]
