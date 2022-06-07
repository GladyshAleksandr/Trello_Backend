import { Request, Response } from 'express';
import { addCardStartType, addColumnStartType, updateColumnPositionStartType, updateCardPositionStartType, deleteCardStartType, deleteColumnStartType, renameCardStartType, renameColumnStartType } from "../types/types"
import dbMethods from '../database/dbMethods'
type ControlerType = {
    getDataFromTable: (req: Request, res: Response) => Promise<void> //? or just void
    addCard: (req: Request, res: Response) => Promise<void>
    moveColumn: (req: Request, res: Response) => Promise<void>
    addColumn: (req: Request, res: Response) => Promise<void>
    moveCard: (req: Request, res: Response) => Promise<void>
    deleteCard: (req: Request, res: Response) => Promise<void>
    deleteColumn: (req: Request, res: Response) => Promise<void>
    renameCard: (req: Request, res: Response) => Promise<void>
    renameColumn: (req: Request, res: Response) => Promise<void>
}

const conctroller = {} as ControlerType
/* const dbMethods = require('../database/dbMethods.ts')
 */
const DatabaseMethods = new dbMethods()

conctroller.getDataFromTable = async (req, res) => {
    try {
        const data = await DatabaseMethods.getDataFromColumns()
        res.json(data)
    } catch (error) {
        res.status(400)
    }
}

conctroller.addCard = async (req, res) => {
    try {
        const result = await DatabaseMethods.addCard(req.body as addCardStartType)
        res.send("Card was succesfully added")
    } catch (error) {
        res.status(400)

    }
}

conctroller.addColumn = async (req, res) => {
    try {
        const result = await DatabaseMethods.addColumn(req.body as addColumnStartType)
        res.send("Column was succesfully added")

    } catch (error) {
        res.status(400)

    }
}

conctroller.moveColumn = async (req, res) => {
    console.log('THE REQ BODY', req.body)
    try {
        const result = await DatabaseMethods.moveColumn(req.body as updateColumnPositionStartType)
        res.status(200).send("Columns position in database was succesfully changed")
    } catch (error) {
        console.log("EROOR CATCHED")
        res.status(400)

    }
}

conctroller.moveCard = async (req, res) => {
    console.log('THE MOVE CARD CALLED')
    try {
        const result = await DatabaseMethods.moveCard(req.body as updateCardPositionStartType)
        res.status(200).send("Card positions in database was succesfully changed")
    } catch (error) {
        res.status(400)

    }
}

conctroller.deleteCard = async (req, res) => {
    try {
        const result = await DatabaseMethods.deleteCard(req.body as deleteCardStartType)
        res.send("Card in database was sucesfully deleted")
    } catch (error) {
        res.status(400)
    }
}

conctroller.deleteColumn = async (req, res) => {
    try {
        const result = await DatabaseMethods.deleteColumn(req.body as deleteColumnStartType)
        res.send("Column in database was sucesfully deleted")
    } catch (error) {
        res.status(400)
    }
}

conctroller.renameCard = async (req, res) => {
    try {
        const result = await DatabaseMethods.renameCard({ text: req.body.text, id: +req.params.id } as renameCardStartType)
        res.send("Card in database was sucesfully renamed")
    } catch (error) {
        res.status(400)
    }
}

conctroller.renameColumn = async (req, res) => {
    try {
        const result = await DatabaseMethods.renameColumn({ columnTitle: req.body.columnTitle, columnId: +req.params.columnId } as renameColumnStartType)
        res.send("Column in database was sucesfully renamed")
    } catch (error) {
        res.status(400)
    }
}


export default conctroller