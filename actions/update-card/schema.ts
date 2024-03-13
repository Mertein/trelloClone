import {z} from 'zod'

export const UpdateCard = z.object({
  title: z.optional(z.string({
    required_error: 'El titulo es requerido',
    invalid_type_error: 'El titulo debe ser un string',
  }).min(3, {
    message: 'El titulo es muy corto',
  })),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(z.string({
    required_error: 'La descripcion es requerida',
    invalid_type_error: 'La descripcion debe ser un string',
  }).min(3, {
    message: 'La descripcion es muy corta',
  }))
})
