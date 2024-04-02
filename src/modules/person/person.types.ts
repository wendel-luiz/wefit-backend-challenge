import { NewAddress, NewContact, NewPerson } from "../../database/types"

export interface InsertPerson extends NewPerson {
  addresses: Array<Omit<NewAddress, "personId">>
  contacts: Array<Omit<NewContact, "personId">>
}
