
export declare namespace Table {
    type CellType = 'actions'

    type Column = {
        name: string
        label: string
        type?: CellType
    }

    type TValue<T> = {
        title: string,
        value: T
    }
}