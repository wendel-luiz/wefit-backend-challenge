import z from "zod"
import { PersonType } from "../../../database/types"
import { onlyNumbers } from "../utils/string.util"
import { cnpj, cpf } from "cpf-cnpj-validator"

export const updatePersonBodySchema = z
  .object({
    name: z.string().max(255).optional(),
    document: z
      .string()
      .transform((doc) => onlyNumbers(doc))
      .optional(),
    personType: z.nativeEnum(PersonType).optional(),
    cellPhone: z
      .string()
      .transform((phone) => onlyNumbers(phone))
      .pipe(z.string().min(10).max(11))
      .optional(),
    telephone: z
      .string()
      .transform((phone) => onlyNumbers(phone))
      .pipe(z.string().min(10).max(11))
      .optional(),
    email: z.string().max(255).email().optional(),
    zip: z
      .string()
      .transform((zip) => onlyNumbers(zip))
      .pipe(z.string().length(8))
      .optional(),
    publicArea: z.string().max(255).optional(),
    number: z
      .string()
      .transform((number) => onlyNumbers(number))
      .pipe(z.string().max(6))
      .optional(),
    addOn: z.string().max(255).optional(),
    district: z.string().max(255).optional(),
    city: z.string().max(255).optional(),
    state: z.string().max(255).optional(),
  })
  .refine((schema) => {
    if (schema.document) {
      if (!schema.personType) {
        return false
      }

      switch (schema.personType) {
        case PersonType.LEGAL:
          return cnpj.isValid(schema.document)
        case PersonType.NATURAL:
          return cpf.isValid(schema.document)
      }
    }
    return true
  }, 'Invalid document at "document" ')
export type UpdatePerson = z.infer<typeof updatePersonBodySchema>
export type UpdatePersonParams = {
  personId: string
}

export type UpdatePersonProps = UpdatePersonParams & UpdatePerson
