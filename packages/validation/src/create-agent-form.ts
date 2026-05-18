import z from 'zod'

const baseSchema = z.object({
  agentName: z.string().min(1, 'Agent name is required').max(50).default('AI Support'),
  agentRole: z.string().min(1, 'Agent role is required').max(50).default('ChatBot'),
  isActive: z.boolean().default(false),
  domain: z.string().min(1, 'Domain is required').max(50),
  systemPrompt: z.string().min(1, 'System prompt is required').max(500),
  welcomeMessage: z.string().max(250).optional(),
  fallbackMessage: z.string().max(250).optional(),
  themeColor: z.string().max(50).default('#000000'),
})

export const createAgentFormSchema = baseSchema
  .transform(data => ({
    ...data,
    welcomeMessage:
      data.welcomeMessage ||
      `Welcome to ${data.domain}, I am your ${data.agentRole}`,
    fallbackMessage:
      data.fallbackMessage ||
      `I am not sure how to help you with that, please contact us at ${data.domain} for more information`,
  }))
  .pipe(
    z.object({
      agentName: z.string(),
      agentRole: z.string(),
      isActive: z.boolean(),
      domain: z.string(),
      systemPrompt: z.string(),
      welcomeMessage: z.string().min(1),
      fallbackMessage: z.string().min(1),
      themeColor: z.string(),
    })
  )
