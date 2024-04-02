import z from "zod"
import { PersonType } from "../../../database/types"

export const updatePersonBodySchema = z.object({
  name: z.string().optional(),
  document: z.string().optional(),
  personType: z.nativeEnum(PersonType).optional(),
})
export type UpdatePerson = z.infer<typeof updatePersonBodySchema>
export type UpdatePersonParams = {
  personId: string
}
