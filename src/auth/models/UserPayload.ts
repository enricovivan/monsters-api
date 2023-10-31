export interface UserPayload {
    sub: number
    username: string
    admin: boolean
    iat ?: number
    exp ?: number

}