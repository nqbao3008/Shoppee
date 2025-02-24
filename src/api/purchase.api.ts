import { PurchaseListStatus } from '../constants/perchase'
import { Purchase } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/https'

const URL = 'purchases'
const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
