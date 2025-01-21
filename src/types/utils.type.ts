export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NonUndefinedField<T> = {
  [P in keyof T]-?: NonUndefinedField<NonNullable<T[P]>>
}

type NonUndefined<T> = T extends undefined ? never : T

export type DeepClean<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepClean<NonUndefined<T[P]>> : NonUndefined<T[P]>
}
