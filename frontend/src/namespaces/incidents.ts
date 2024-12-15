import {Table} from "./table";

export type Priority = 'info' | 'low' | 'medium' | 'high'

export type IncidentItem = {
    date: string,
    time: string,
    label: string,
    priority: Priority,
    actions: Table.TValue<(args?: unknown) => unknown>[]
}