import {z} from 'zod';

export const CreateBoard = z.object({
  title: z.string({
    required_error: 'El titulo es requerido',
    invalid_type_error: 'El titulo debe ser un string'
  }).min(3, {
    message: 'El titulo es muy corto',
  }),
  image: z.string({
    required_error: 'La imagen es requerida',
    invalid_type_error: 'La imagen debe ser un string'
  }),
});