import {z} from 'zod';

export const CreateCard= z.object({
  title: z.string({
    required_error: 'El titulo es requerido',
    invalid_type_error: 'El titulo debe ser un string'
  }).min(3, {
    message: 'El titulo es muy corto',
  }),
  boardId: z.string(),
  listId: z.string(),
});