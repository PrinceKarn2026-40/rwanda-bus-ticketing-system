import { z } from 'zod'

const datetimeSchema = z.string().refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid datetime' })

export const createScheduleSchema = z.object({
  routeId: z.string().min(1),
  busId: z.string().min(1),
  departureTime: datetimeSchema,
  arrivalTime: datetimeSchema.optional(),
  price: z.coerce.number().min(0),
})

export const updateScheduleSchema = createScheduleSchema.partial()
