import z from "zod"
import { PersonType } from "../../../database/types"

export const updatePersonBodySchema = z.object({
  name: z.string().optional(),
  document: z.string().optional(),
  personType: z.nativeEnum(PersonType).optional(),
  cellPhone: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().optional(),
  zip: z.string().optional(),
  publicArea: z.string().optional(),
  number: z.string().optional(),
  addOn: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})
export type UpdatePerson = z.infer<typeof updatePersonBodySchema>
export type UpdatePersonParams = {
  personId: string
}

export type UpdatePersonProps = UpdatePersonParams & UpdatePerson
