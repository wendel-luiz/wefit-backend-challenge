import z from "zod"
import { PersonType } from "../../../database/types"

export const createPersonBodySchema = z.object({
  name: z.string(),
  document: z.string(),
  personType: z.nativeEnum(PersonType),
  cellPhone: z.string(),
  telephone: z.string(),
  email: z.string().email(),
  zip: z.string(),
  publicArea: z.string(),
  number: z.string(),
  addOn: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
})
export type CreatePersonBody = z.infer<typeof createPersonBodySchema>

export type CreatePersonProps = CreatePersonBody
