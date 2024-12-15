import {Table} from "../namespaces/table";

export const COLUMNS: Table.Column[] = [
    {
        name: 'priority',
        label: 'Приоритет',
    },
    {
        name: 'label',
        label: 'Наименование',
    },
    {
        name: 'date',
        label: 'Дата и время',
    },
    {
        name: 'shortDescription',
        label: 'краткое описание',
    },
    {
        name: 'actions',
        label: 'Time',
        type: 'actions',
    },
]
