import classNames from 'classnames'
import { order_type, sort_by_type } from '../../../../constants/product'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import { omit } from 'lodash'
import { QueryConfig } from '../../../../hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const pageNumber = Number(queryConfig.page)
  const { sort_by = sort_by_type.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: sort_by_type) => {
    return sortByValue === sort_by
  }

  const handleSort = (sortByValue: sort_by_type) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue.toString()
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: order_type) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sort_by_type.price,
        order: orderValue.toString()
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              ' bg-orange text-white  hover:bg-orange/80': isActiveSortBy(sort_by_type.view),
              ' bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_by_type.view)
            })}
            onClick={() => handleSort(sort_by_type.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              ' bg-orange text-white  hover:bg-orange/80': isActiveSortBy(sort_by_type.createdAt),
              ' bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_by_type.createdAt)
            })}
            onClick={() => handleSort(sort_by_type.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              ' bg-orange text-white  hover:bg-orange/80': isActiveSortBy(sort_by_type.sold),
              ' bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_by_type.sold)
            })}
            onClick={() => handleSort(sort_by_type.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 capitalize text-left outline-none', {
              ' bg-orange text-white  hover:bg-orange/80': isActiveSortBy(sort_by_type.price),
              ' bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_by_type.price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as order_type)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={order_type.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={order_type.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{pageNumber}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {pageNumber === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (pageNumber - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {pageNumber === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (pageNumber + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
