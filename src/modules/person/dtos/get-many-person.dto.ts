import {
  PaginatedQuery,
  paginatedQuerySchema,
  PaginatedResponse,
} from "../../../lib/paginated"
import { PersonResponse } from "../utils/build-response.util"

export const getManyPersonsQuerySchema = paginatedQuerySchema
export type GetManyPersonsQuery = PaginatedQuery
export type GetManyPersonsResponse = PaginatedResponse<PersonResponse>

export type GetManyPersonsProps = GetManyPersonsQuery
