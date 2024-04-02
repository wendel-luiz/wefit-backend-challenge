import z from "zod"
import { onlyNumbers } from "./string.util"
import { PersonType } from "../../../database/types"
import { cnpj, cpf } from "cpf-cnpj-validator"

export const personSchema = z
  .object({
    name: z.string().max(255),
    document: z.string().transform((doc) => onlyNumbers(doc)),
    personType: z.nativeEnum(PersonType),
    cellPhone: z
      .string()
      .transform((phone) => onlyNumbers(phone))
      .pipe(z.string().min(10).max(11)),
    telephone: z
      .string()
      .transform((phone) => onlyNumbers(phone))
      .pipe(z.string().min(10).max(11)),
    email: z.string().max(255).email(),
    zip: z
      .string()
      .transform((zip) => onlyNumbers(zip))
      .pipe(z.string().length(8)),
    publicArea: z.string().max(255),
    number: z
      .string()
      .transform((number) => onlyNumbers(number))
      .pipe(z.string().max(6)),
    addOn: z.string().max(255).optional(),
    district: z.string().max(255),
    city: z.string().max(255),
    state: z.string().max(255),
  })
  .refine((schema) => {
    switch (schema.personType) {
      case PersonType.LEGAL:
        return cnpj.isValid(schema.document)
      case PersonType.NATURAL:
        return cpf.isValid(schema.document)
    }
  }, 'Invalid document at "document" ')
