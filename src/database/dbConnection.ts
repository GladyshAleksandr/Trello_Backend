import { } from 'dotenv/config'
import config from '../knexfile'
import knex from 'knex'

/* module.exports = require('knex')(config)
 */
const db = knex(config)
export default db