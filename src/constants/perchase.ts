export enum purchaseStatus {
  inCart = -1,
  all = 0,
  waitForConfirmation = 1,
  waitForGetting = 2,
  inProgress = 3,
  delivered = 4,
  cancelled = 5
}

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0
