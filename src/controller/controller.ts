const request = require('request')
type ControlerType = {
    addCard: (req: any, res: any) => void
    moveColumn: (req: any, res: any) => void
    addColumn: (req: any, res: any) => void
    moveCard: (req: any, res: any) => void
    deleteCard: (req: any, res: any) => void
    deleteColumn: (req: any, res: any) => void
    renameCard: (req: any, res: any) => void
    renameColumn: (req: any, res: any) => void
}

const conctroller = {} as any
const DatabaseMethods = require('../database/dbMethods.ts')

const dbMethods = new DatabaseMethods()

conctroller.getDataFromTable = async (req, res) => {
    let columns = await dbMethods.getDataFromColumns()
    /*     console.log("THE COLUMNS STORAGE IN CONTROLLER _____", columns)
     */
    let cards = await dbMethods.getDataFromCards()
/*     console.log("THE CARDS STORAGE IN CONTROLLER _____", cards)
 */    let data = {
        columns,
        cards
    }
    res.json(data)
}

conctroller.addCard = (req, res) => {
/*     console.log(req.body)
 */   /*  let dataFromDb = */ dbMethods.addCard(req.body)

    /*     console.log('DATA FROM DB TO SERVER ________ = ', dataFromDb)
     */
    res.status(200)
    res.redirect('/')
}

conctroller.addColumn = (req, res) => {
    dbMethods.addColumn(req.body)
    res.status(200)
    res.redirect('/')
}

conctroller.moveColumn = (req, res) => {
    let data = req.body
    console.log("THE DATA FROM MOVE COLUMN CONTROLLER__", data)
    dbMethods.moveColumn(data.first, data.second, data.arr)
    res.status(200)
    res.redirect('/')
}

conctroller.moveCard = (req, res) => {
    dbMethods.moveCard(req.body.arrForDb)
    res.status(200)
    res.redirect('/')
}

conctroller.deleteCard = (req, res) => {
    dbMethods.deleteCard(req.data) // was req.body, but now req.data
    res.status(200)
    res.redirect('/')
}

conctroller.deleteColumn = (req, res) => {
    dbMethods.deleteColumn(req.data)
    res.status(200)
    res.redirect('/')
}

conctroller.renameCard = (req, res) => {
    dbMethods.renameCard(req.body)
    res.status(200)
    res.redirect('/')
}

conctroller.renameColumn = (req, res) => {
    dbMethods.renameColumn(req.body)
    res.status(200)
    res.redirect('/')
}


module.exports = conctroller