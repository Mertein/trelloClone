import {z} from 'zod'

export const DeletedBoard = z.object({
  id: z.string(),
})
