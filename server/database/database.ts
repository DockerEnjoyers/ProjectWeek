import mariadb from 'mariadb'
import { Pool } from 'mariadb'

export class Database {
  // Properties
  private _pool: Pool
  // Constructor
  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'projectweek',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }
  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
  }
    // users depends on roles, post depends on users and likes and comments depend on user and post

  public executeSQL = async (query: string) => {
    try {
      const conn = await this._pool.getConnection()
      const res = await conn.query(query)
      conn.end()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  public preventSQLInjection(text: string): string {
    text = text.replace(/'/g, "\\'")
    if (!text) text = "NULL"
    /*
    // Regular expresions are not needed, but maybe in the future
    const onlyLettersPattern = /^[A-Za-z0-9\s$/@#*+%&()=.'-?]+$/
    if (!text.match(onlyLettersPattern)) {
      return null
    }
    */
    return text
  }
}
