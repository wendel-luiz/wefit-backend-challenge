import z from "zod"
import { ContactType, PersonType } from "../../../database/types"

export const createPersonBodySchema = z.object({
  name: z.string(),
  document: z.string(),
  personType: z.nativeEnum(PersonType),
  contacts: z
    .object({
      contactType: z.nativeEnum(ContactType),
      value: z.string(),
    })
    .array()
    .min(1),
  addresses: z
    .object({
      zip: z.string(),
      publicArea: z.string(),
      number: z.string(),
      addOn: z.string(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
    })
    .array()
    .min(1),
})
export type CreatePerson = z.infer<typeof createPersonBodySchema>

export type CreatePersonResult = {
  id: string
  name: string
  document: string
  personType: PersonType
  addresses: Array<{
    zip: string
    publicArea: string
    number: string
    addOn: string
    district: string
    city: string
    state: string
  }>
  contacts: Array<{
    contactType: ContactType
    value: string
  }>
}
