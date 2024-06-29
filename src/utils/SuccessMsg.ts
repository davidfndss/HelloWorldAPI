export interface ISuccessMsg {
  message: string
}

export const SuccessMsg = (message: string): ISuccessMsg => {
  return {message}
}