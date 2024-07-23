import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string(),
  dob_day: z.string(),
  dob_month: z.string(),
  dob_year: z.string(),
  about: z.string(),
  age: z.number(),
  show_interest: z.string().transform((e) => e === 'on'),
  gender_identity: z.string(),
  previas_interest: z.string(),
  previas_requests: z.array(z.string()),
  previas_created: z.array(z.string()),
  url_img: z.string().optional(),
  previas: z.array(z.string())
})

export const CreateUserFromSchema = CreateUserSchema.omit({
  age: true,
  previas: true,
  previas_requests: true,
  previas_created: true
})

export const CreateLoginSchema = z.object({
  email: z.string(),
  password: z.string()
})

export const CreatePreviaSchema = z.object({
  creator: z.string(),
  date: z.string().transform((e) => new Date(e)),
  description: z.string(),
  location: z.string(),
  images_previa_url: z.union([z.string(), z.array(z.string())]),
  participants: z.string(),
  passCode: z.string(),
  place_details: z.string(),
  show_location: z.preprocess((value) => value === 'on', z.boolean()),
  startTime: z.string(),
  previa_id: z.string(),
  v: z.number(),
  createdAt: z.string(),
  id: z.string(),
  updatedAt: z.string()
})

export const CreatePreviaFromSchema = CreatePreviaSchema.omit({
  previa_id: true,
  updatedAt: true,
  creator: true,
  createdAt: true,
  v: true,
  id: true,
  passCode: true
})

export const CreateRequestJoinSchema = z.object({
  intentions: z.string(),
  url_img: z.union([z.string(), z.array(z.string())]).optional(),
  attendants: z.string()
})

export const UpdatePreviaFromSchema = CreatePreviaSchema.omit({
  previa_id: true,
  updatedAt: true,
  creator: true,
  createdAt: true,
  v: true,
  id: true,
  passCode: true,
  images_previa_url: true
})
