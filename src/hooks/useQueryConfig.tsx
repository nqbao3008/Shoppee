import { ProductListConfig } from '../types/product.type'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryPrams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryPrams.page || '1',
      limit: queryPrams.limit || '10',
      sort_by: queryPrams.sort_by,
      order: queryPrams.order,
      exclude: queryPrams.exclude,
      rating_filter: queryPrams.rating_filter,
      price_max: queryPrams.price_max,
      price_min: queryPrams.price_min,
      name: queryPrams.name,
      category: queryPrams.category
    },
    isUndefined
  )
  return queryConfig
}
