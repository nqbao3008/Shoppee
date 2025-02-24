import productApi from '../../api/product.api'
import Pagination from '../../components/Pagination'
import useQueryParams from '../../hooks/useQueryParams'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../api/category.api'
import useQueryConfig, { QueryConfig } from '../../hooks/useQueryConfig'

export default function ProductList() {
  const queryPrams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryPrams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: categorisData } = useQuery({
    queryKey: ['categories', queryPrams],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categorisData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
