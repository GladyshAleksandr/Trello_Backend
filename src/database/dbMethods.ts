import { renameCardStartType } from './../types/types';
import { addCardStartType, addColumnStartType, deleteCardStartType, deleteColumnStartType, updateCardPositionStartType, renameColumnStartType, updateColumnPositionStartType } from '../types/types';
import { ColumnsTypes } from "../types/types"
import { } from 'dotenv/config'
import knex from './dbConnection'

class DatabaseMethodsClass {


    getDataFromColumns() {
        const promise = new Promise((resolve, reject) => {
            knex(process.env.COLUMNS_TABLE_NAME)
                .select()
                .then(columns => {
                    knex(process.env.CARDS_TABLE_NAME)
                        .select()
                        .then(cards => {
                            if (columns) {
                                const data = {
                                    columns,
                                    cards
                                }
                                resolve(data)
                            }
                            else reject(new Error("Data is  empty"))
                        })
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(value => {
            console.log("VALUE =", value)
            return value
        })
    }



    addCard(ob: addCardStartType) {
        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .insert(ob)
                .then(result => {
                    console.log("The result of adding card___", result)
                    resolve(result)
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(value => {
            console.log("VALUE =", value)
            return value
        })
    }



    addColumn(ob: addColumnStartType) {
        const promise = new Promise((resolve, reject) => {
            knex(process.env.COLUMNS_TABLE_NAME)
                .insert(ob)
                .then(result => {
                    console.log("The result of adding column___", result)
                    resolve(result)
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(value => {
            console.log("VALUE =", value)
            return value
        })
    }



    moveColumn(ob: updateColumnPositionStartType) {
        const arrayOfCards = this.getArrayOfCardsForInsertInDB(ob.columns)
        const arrayOfColumns = this.getArrayOfColumnsForInsertInDB(ob.columns)
        console.log("THE CARDS ARR IN MOVE COLUMN =", arrayOfCards)

        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .truncate()
                .then(res => {
                    console.log('The result after truncate = ', res)
                    knex(process.env.CARDS_TABLE_NAME)
                        .insert(arrayOfCards)
                        .then(res => {
                            console.log('the result after insert cards = ', res)
                            knex(process.env.COLUMNS_TABLE_NAME)
                                .truncate()
                                .then(result => {
                                    console.log("The result after truncate columns table = ", result)
                                    knex(process.env.COLUMNS_TABLE_NAME)
                                        .insert(arrayOfColumns)
                                        .then(result => {
                                            console.log('the result after  insering  columns = ', result)
                                            resolve(result)
                                        })
                                })
                        })
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }



    getArrayOfColumnsForInsertInDB(columns: Array<ColumnsTypes>) {
        const arrayOfColumns = columns.map((column) => {
            const tmpObj = {
                id: column.id,
                columnTitle: column.columnTitle,
                columnId: column.columnId
            }
            return tmpObj
        })
        console.log("ArrayOFColumns___", arrayOfColumns)
        return arrayOfColumns
    }



    getArrayOfCardsForInsertInDB(columns: Array<ColumnsTypes>) {
        const arrOfCards = columns.map((column) => {
            column.cards.map((card) => {
                const tmpObj = {
                    id: card.id,
                    text: card.text,
                    columnId: card.columnId,
                    _order: card._order
                }
                return tmpObj
            })
            return column.cards
        })
        const arrOfCardsRes = [].concat(...arrOfCards)
        console.log("RESULT FROM FUNC =", arrOfCardsRes)
        return arrOfCardsRes
    }



    moveCard(ob: updateCardPositionStartType) {
        const arrayOfCards = this.getArrayOfCardsForInsertInDB(ob.columns)
        console.log('Array in move card___', arrayOfCards)
        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .truncate()
                .then(res => {
                    console.log('The result after truncate = ', res)
                    knex(process.env.CARDS_TABLE_NAME)
                        .insert(arrayOfCards)
                        .then(res => resolve(res))
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }



    deleteCard(ob: deleteCardStartType) {
        const arrayOfCards = this.getArrayOfCardsForInsertInDB(ob.columns)
        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .truncate()
                .then(res => {
                    console.log('The result after truncate = ', res)
                    knex(process.env.CARDS_TABLE_NAME)
                        .insert(arrayOfCards)
                        .then(res => resolve(res))
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }



    deleteColumn(ob: deleteColumnStartType) {
        const arrayOfCards = this.getArrayOfCardsForInsertInDB(ob.columns)
        const arrayOfColumns = this.getArrayOfColumnsForInsertInDB(ob.columns)

        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .truncate()
                .then(res => {
                    console.log('The result after truncate = ', res)
                    knex(process.env.CARDS_TABLE_NAME)
                        .insert(arrayOfCards)
                        .then(res => {
                            console.log('the result after insert cards = ', res)
                            knex(process.env.COLUMNS_TABLE_NAME)
                                .truncate()
                                .then(result => {
                                    console.log("The result after truncate columns table = ", result)
                                    knex(process.env.COLUMNS_TABLE_NAME)
                                        .insert(arrayOfColumns)
                                        .then(result => {
                                            console.log('the result after  inserting  columns = ', result)
                                            resolve(result)
                                        })
                                })
                        })
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }



    renameCard(ob: renameCardStartType) {
        console.log('IN rename car method', ob)
        const promise = new Promise((resolve, reject) => {
            knex(process.env.CARDS_TABLE_NAME)
                .update('text', ob.text)
                .where('id', ob.id)
                .then(result => {
                    console.log('The result after update card', result)
                    resolve(result)
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }



    renameColumn(ob: renameColumnStartType) {
        console.log("Data in  rename column =", ob)
        const promise = new Promise((resolve, reject) => {
            knex(process.env.COLUMNS_TABLE_NAME)
                .update('columnTitle', ob.columnTitle)
                .where('columnId', ob.columnId)
                .then(result => {
                    console.log('The result after update column', result)
                    resolve(result)
                })
        })
            .catch((error) => {
                console.log(error)
            })
        return promise.then(res => {
            console.log("Result =", res)
            return res
        })
    }


}

export default DatabaseMethodsClass