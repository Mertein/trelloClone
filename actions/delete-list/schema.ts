import {z} from 'zod'

export const DeletedList = z.object({
  id: z.string(),
  boardId: z.string(),
})
