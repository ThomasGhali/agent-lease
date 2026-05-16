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
]
