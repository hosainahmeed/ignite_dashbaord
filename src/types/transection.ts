import type { UserRecord } from "./User";

export interface Itransaction {
    id: string,
    trasaction_id: string,
    amount: number,
    user: UserRecord,
    createdAt: string,
}