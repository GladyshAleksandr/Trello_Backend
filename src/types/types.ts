export type CardsType =
    {
        id: number
        text: string
        columnId: number
        _order: number
    }


export type ColumnsTypes =
    {
        id: number
        columnId: number
        columnTitle: string
        cards: Array<CardsType>
    }


export type failureType = {
    err: Error
}


export type getAllDataSuccessType = {
    columns: Array<ColumnsTypes>
}


export type addColumnStartType = {
    columnTitle: string
    columnId: number
}


export type addColumnSuccessType = {
    id: number
    columnTitle: string
}


export type addCardStartType = {
    text: string
    columnId: number
    order: number
}


export type updateCardPositionStartType = {
    columns: Array<ColumnsTypes>
}


export type updateColumnPositionStartType = {
    columns: Array<ColumnsTypes>
}


export type deleteColumnStartType = {
    columns: Array<ColumnsTypes>
}


export type deleteCardStartType = {
    columns: Array<ColumnsTypes>
}


export type renameCardStartType = {
    text: string
    id: number
}


export type renameColumnStartType = {
    columnTitle: string
    columnId: number
}
