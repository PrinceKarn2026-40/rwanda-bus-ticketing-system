import { z } from 'zod'

const datetimeSchema = z.string().refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid datetime' })

export const createScheduleSchema = z.object({
  routeId: z.string().uuid(),
  busId: z.string().uuid(),
  departureTime: datetimeSchema,
  arrivalTime: datetimeSchema.optional(),
  price: z.number().min(0),
})

export const updateScheduleSchema = createScheduleSchema.partial()
