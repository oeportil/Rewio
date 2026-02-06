export interface IResponse<T> {
    msg?: string,
    value: T,
    status: boolean
}