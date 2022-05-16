const connection = require('./dbConnection')

type CardType = {
    id: string
    text: string
}

type ColumnType = {
    id: number
    columnTitle: string
}
type ColumnsTypes =
    {
        id: number
        columnTitle: string
        cards: Array<CardType>
    }
class DatabaseMethodsClass {

    constructor() {
        let columnsTable = `create table if not exists trello_columns(
                id int primary key auto_increment,
                columnTitle varchar(255) not null
            )`

        let cardsTable = `create table if not exists trello_cards(
                id int primary key auto_increment,
                cardId varchar(3), 
                text varchar(255) not null
            )`

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
        trello_columns(columnTitle)
        values
        ('Need to do'),
        ('In process'),
        ('Done');`

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
                }

            })

            connection.query(cardsTable, function (err, result) {
                if (err) throw err
                console.log(result)
                console.log('Cards table created')
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


    addCard(ob: CardType) {
/*         console.log("ADD  CARD DATA _________ = ", ob)
 */        connection.connect(function (err) {
        if (err) {
            return console.error('error with connection to DATABASE', err.message)
        }

        let addCard = `insert into trello_cards (cardId, text) values
            ('${ob.id}', '${ob.text}')`

        connection.query(addCard, function (err, result) {
            if (err) throw err
            console.log('Card was added')
        })
    })
    }

    addColumn(ob: ColumnType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let addColumn = `insert into trello_columns (columnTitle) values
            ('${ob.columnTitle}')`

            connection.query(addColumn, function (err, result) {
                if (err) throw err
                console.log('Column was added')
            })
        })
    }



    moveColumn(first: number, second: number, arr: Array<ColumnsTypes>) {
        console.log('THE DATA IN MOVE COLUMN ___________', first)
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let swapColumns = `update
            trello_columns t1 inner join trello_columns t2
            on (t1.id, t2.id) in ((${first},${second}),(${second},${first}))
            set
            t1.columnTitle = t2.columnTitle`
            console.log('The array of swapped cards which need throw to DB ____', arr)

            let combinedArr = []
            let i = 0
            while (i < arr.length) {
                combinedArr = combinedArr.concat(arr[i].cards)
                ++i
            }
            console.log('THE RESUL OF CUNCUTIING _____', combinedArr)
            i = 0
            let finalArr = []

            while (i < combinedArr.length) {
                finalArr[i] = Object.values(combinedArr[i])
                ++i
            }
            console.log('FINAL ARR ++__++____++____', finalArr)

            let deleteAllRows = `truncate trello_cards`
            let swapCards = `insert into trello_cards (cardId, text) values ? `

            connection.query(swapColumns, function (err, result) {
                if (err) throw err
                console.log('Columns was swapped')
            })

            connection.query(deleteAllRows, function (err, result) {
                if (err) throw err
                console.log('Columns was truncated')
            })


            connection.query(swapCards, [finalArr], function (err, result) {
                if (err) throw err
                console.log('Cards was swapped')
            })

        })
    }

    moveCard(ob: Array<CardType>) {
        console.log("THE MOVE CARD METHOD_____", ob)
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let sp = `update trello_cards
                        set cardId=if(cardId='${ob[0].id}','${ob[1].id}','${ob[0].id}')
                        where cardId in ('${ob[0].id}','${ob[1].id}');`

            connection.query(sp, function (err, result) {
                if (err) throw err
                console.log('Cards was swapped')
            })


        })
    }

    deleteCard(ob: CardType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let addCard = `delete from trello_cards where cardId = '${ob.id}'`

            connection.query(addCard, function (err, result) {
                if (err) throw err
                console.log('Card was deleted')
            })
        })
    }

    deleteColumn(ob: ColumnType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let deleteColumn = `delete from trello_columns where id = ${ob.id}`

            connection.query(deleteColumn, function (err, result) {
                if (err) throw err
                console.log('Column was deleted')
            })
        })
    }

    renameCard(ob: CardType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let renameCard = `update trello_cards
            set
            text = '${ob.text}'
            where
            cardId = '${ob.id}' `

            connection.query(renameCard, function (err, result) {
                if (err) throw err
                console.log('Card was renamed')
            })
        })
    }

    renameColumn(ob: ColumnType) {
        connection.connect(function (err) {
            if (err) {
                return console.error('error with connection to DATABASE', err.message)
            }

            let renameColumn = `update trello_columns
            set
            columnTitle = '${ob.columnTitle}'
            where
            id = ${ob.id} `

            connection.query(renameColumn, function (err, result) {
                if (err) throw err
                console.log('column was renamed')
            })
        })
    }
}

module.exports = DatabaseMethodsClass
