import { renameCardStartType } from './../types/types';
import { Knex } from 'knex';
import { addCardStartType, addColumnStartType, deleteCardStartType, deleteColumnStartType, updateCardPositionStartType, renameColumnStartType, updateColumnPositionStartType } from '../types/types';
import { ColumnsTypes } from "../types/types"
import { } from 'dotenv/config'
/* 
const connection = require('./dbConnection')

class DatabaseMethodsClass {

    constructor() {
        let columnsTable = `create table if not exists trello_columns(
                id int primary key auto_increment,
                columnTitle varchar(255) not null,
                columnId int)`



        let cardsTable = `create table if not exists trello_cards(
                id int primary key auto_increment,
                text varchar(255),
                columnId int,
                orders int)ENGINE=InnoDB AUTO_INCREMENT=100;`

        connection.connect(function (err) {
            if (err) {
                console.log("Error in the connection", err)
                throw err
            }

            console.log("Database connected")

            connection.query(columnsTable, function (err, result) {
                if (err) throw err
                console.log('Columns table created')
                console.log(result)
                if (result.warningStatus === 0) {
                    let initColTable = `insert ignore into
               trello_columns(columnTitle,columnId)
               values
               ('Need to do', 1),
               ('In process', 2),
               ('Done', 3);`

                    connection.connect(function (err) {
                        if (err) {
                            console.log("Error in the connection", err)
                            throw err
                        }
                        connection.query(initColTable, function (err, result) {
                            if (err) throw err
                            console.log('Table was initialised')
                        })
                    })

                    connection.connect(function (err) {
                        if (err) {
                            console.log("Error in the connection", err)
                            throw err
                        }
                        connection.query(cardsTable, function (err, result) {
                            if (err) throw err
                            console.log('Cards table  was created')
                        })
                    })
                }
            })
        })
    }

    async getDataFromColumns() {
        let query = `select * from trello_columns;`
        return this.doQuery(query, 'Columns')
    }

    async getDataFromCards() {
        let query = `select * from trello_cards;`
        return this.doQuery(query, 'Cards')
    }

    async doQuery(queryToDo, str) {
        let promise = new Promise((resolve, reject) => {
            let query = queryToDo
            connection.query(query, function (err, result) {
                if (err) throw err
                console.log(`${str} from DB to model was provided`)
                resolve(result)

            })
        })
        return promise.then((value) => {
            return value
        })

    }


    addCard(ob: addCardStartType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let addCard = `insert into trello_cards (text, columnId, orders) values
            ('${ob.text}', ${ob.columnId}, ${ob.order})`

            connection.query(addCard, function (err, result) {
                if (err) throw err
                console.log('Card was added')
            })
        })
    }

    addColumn(ob: addColumnStartType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let addColumn = `insert into trello_columns (columnTitle, columnId) values
            ('${ob.columnTitle}', ${ob.columnId})`

            connection.query(addColumn, function (err, result) {
                if (err) throw err
                console.log('Column was added')
            })
        })
    }



    moveColumn(ob: updateColumnPositionStartType) {
        let arrayOfColumns = ob.columns.map((column) => {
            let tmpObj = {
                id: undefined,
                columnTitle: undefined,
                columnId: undefined
            }
            tmpObj.id = column.id
            tmpObj.columnTitle = column.columnTitle
            tmpObj.columnId = column.columnId
            return tmpObj
        })
        let arrayOfColumnsRes = arrayOfColumns.map(Object.values)
        console.log("ArrayOFColumns___", arrayOfColumnsRes)

        let arrOfCards = ob.columns.map((column) => {
            column.cards.map((card) => {
                let tmpObj = {
                    id: undefined,
                    text: undefined,
                    columnId: undefined,
                    orders: undefined
                }
                tmpObj.id = card.id
                tmpObj.text = card.text
                tmpObj.columnId = card.columnId
                tmpObj.orders = card.order
                return tmpObj
            })
            return column.cards
        })
        let arrOfCards2 = arrOfCards.map((card) => card.map(Object.values))



        let arrOfCardsRes = [].concat(...arrOfCards2)
        console.log('THE DATA IN MOVE COLUMN ___________', ob)
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }



            let truncateCards = `truncate table trello_cards`
            connection.query(truncateCards, function (err, result) {
                if (err) throw err
                console.log('Cards was truncated')
            })



            let insertCards = `insert into trello_cards (id, text, columnId, orders) values ?`
            connection.query(insertCards, [arrOfCardsRes], function (err, result) {
                if (err) throw err
                console.log('cards was inserted')
            })



            let truncateColumns = `truncate table trello_columns`
            connection.query(truncateColumns, function (err, result) {
                if (err) throw err
                console.log('Columns was truncated')
            })



            let insertColumns = `insert into trello_columns (id, columnTitle, columnId) values ?`
            connection.query(insertColumns, [arrayOfColumnsRes], function (err, result) {
                if (err) throw err
                console.log('Columns was inserted')
            })
        })
    }

    getArrayOfCardsForInsertInDB(columns: Array<ColumnsTypes>) {
        let arrOfCards = columns.map((column) => {
            column.cards.map((card) => {
                let tmpObj = {
                    id: undefined,
                    text: undefined,
                    columnId: undefined,
                    orders: undefined
                }
                tmpObj.id = card.id
                tmpObj.text = card.text
                tmpObj.columnId = card.columnId
                tmpObj.orders = card.order
                return tmpObj
            })
            return column.cards
        })
        let arrOfCards2 = arrOfCards.map((card) => card.map(Object.values))



        let arrOfCardsRes = [].concat(...arrOfCards2)
        columns = arrOfCardsRes
        console.log("RESULT FROM FUNC =", columns)
        return columns
    }

    moveCard(ob: updateCardPositionStartType) {

        let arrOfCards = ob.columns.map((column) => {
            column.cards.map((card) => {
                let tmpObj = {
                    id: undefined,
                    text: undefined,
                    columnId: undefined,
                    orders: undefined
                }
                tmpObj.id = card.id
                tmpObj.text = card.text
                tmpObj.columnId = card.columnId
                tmpObj.orders = card.order
                return tmpObj
            })
            return column.cards
        })
        let arrOfCards2 = arrOfCards.map((card) => card.map(Object.values))



        let arrOfCardsRes = [].concat(...arrOfCards2)
        console.log("Cards_ARDD_____", arrOfCardsRes)

        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let truncate = `TRUNCATE table trello_cards`

            connection.query(truncate, function (err, result) {
                if (err) throw err
                console.log('Cards table was truncated')
            })

            let swapCards = `insert into trello_cards (id,text,columnId,orders) values ?`
            connection.query(swapCards, [arrOfCardsRes], function (err, result) {
                if (err) throw err
                console.log('Cards was swapped')
            })


        })
    }

    deleteCard(ob: deleteCardStartType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let arrOfCards = ob.columns.map((column) => {
                column.cards.map((card) => {
                    let tmpObj = {
                        id: undefined,
                        text: undefined,
                        columnId: undefined,
                        orders: undefined
                    }
                    tmpObj.id = card.id
                    tmpObj.text = card.text
                    tmpObj.columnId = card.columnId
                    tmpObj.orders = card.order
                    return tmpObj
                })
                return column.cards
            })
            let arrOfCards2 = arrOfCards.map((card) => card.map(Object.values))



            let arrOfCardsRes = [].concat(...arrOfCards2)
            console.log(arrOfCardsRes)


            let truncateCards = `truncate table trello_cards`

            connection.query(truncateCards, function (err, result) {
                if (err) throw err
                console.log('Card table was truncated')
            })


            let swapCards = `insert into trello_cards (id,text,columnId,orders) values ?` //TODO не  будет работать бо массив не верный

            connection.query(swapCards, [arrOfCardsRes], function (err, result) {
                if (err) throw err
                console.log('Cards orders was changed')
            })
        })
    }

    deleteColumn(ob: deleteColumnStartType) {
        let arrayOfColumns = ob.columns.map((column) => {
            let tmpObj = {
                id: undefined,
                columnTitle: undefined,
                columnId: undefined
            }
            tmpObj.id = column.id
            tmpObj.columnTitle = column.columnTitle
            tmpObj.columnId = column.columnId
            return tmpObj
        })
        let arrayOfColumnsRes = arrayOfColumns.map(Object.values)
        console.log("ArrayOFColumns___", arrayOfColumnsRes)

        let arrOfCards = ob.columns.map((column) => {
            column.cards.map((card) => {
                let tmpObj = {
                    id: undefined,
                    text: undefined,
                    columnId: undefined,
                    orders: undefined
                }
                tmpObj.id = card.id
                tmpObj.text = card.text
                tmpObj.columnId = card.columnId
                tmpObj.orders = card.order
                return tmpObj
            })
            return column.cards
        })
        let arrOfCards2 = arrOfCards.map((card) => card.map(Object.values))



        let arrOfCardsRes = [].concat(...arrOfCards2)
        console.log('THE DATA IN MOVE COLUMN ___________', ob)
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }



            let truncateCards = `truncate table trello_cards`
            connection.query(truncateCards, function (err, result) {
                if (err) throw err
                console.log('Cards was truncated')
            })



            let insertCards = `insert into trello_cards (id, text, columnId, orders) values ?`
            connection.query(insertCards, [arrOfCardsRes], function (err, result) {
                if (err) throw err
                console.log('cards was inserted')
            })



            let truncateColumns = `truncate table trello_columns`
            connection.query(truncateColumns, function (err, result) {
                if (err) throw err
                console.log('Columns was truncated')
            })



            let insertColumns = `insert into trello_columns (id, columnTitle, columnId) values ?`
            connection.query(insertColumns, [arrayOfColumnsRes], function (err, result) {
                if (err) throw err
                console.log('Columns was inserted')
            })
        })
    }

    renameCard(ob: renameCardSuccessType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let renameCard = `update trello_cards
            set
            text = '${ob.text}'
            where
            columnId = ${ob.columnId} 
            and orders = ${ob.order}`

            connection.query(renameCard, function (err, result) {
                if (err) throw err
                console.log('Card was renamed')
            })
        })
    }

    renameColumn(ob: renameColumnStartType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let renameColumn = `update trello_columns
            set
            columnTitle = '${ob.columnTitle}'
            where
            columnId = ${ob.columnId} `

            connection.query(renameColumn, function (err, result) {
                if (err) throw err
                console.log('column was renamed')
            })
        })
    }
}

module.exports = DatabaseMethodsClass
 */

/* const knex: Knex = require('./dbConnection')
 */
import knex from './dbConnection'

class DatabaseMethodsClass {
    /* 
        constructor() {
    
        } */



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