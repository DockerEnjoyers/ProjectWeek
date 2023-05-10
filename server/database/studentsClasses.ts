import { Database } from './database'

import { AStudent, AClass, AGuardian, ACompany } from '../interface/interface'

export class Students {
  private _database: Database

  constructor(Database: Database) {
    this._database = Database
  }

  // methoden
  async createStudent(
    image: string,
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: number,
    date_of_birth: Date,
    AHV_number: string,
    guardian_id: number | 'NULL',
    specialization: 'applicationDeveloper' | 'systemDeveloper',
    class_id: number,
    QV: string | 'NULL',
    marks: string | 'NULL',
    contract: string | 'NULL',
    job_desc: string | 'NULL',
    EFZ_copy: string | 'NULL'
  ): Promise<boolean> {
    try {
      const query = `
            INSERT INTO Students (
                student_id,
                image
                name,
                surname,
                street,
                city,
                zip,
                date_of_birth,
                AHV,
                guardian_id,
                specialization,
                class_id,
                QV,
                marks,
                contract,
                job_desc,
                EFZ_copy
            ) VALUES (
                NULL,
                ${this._database.preventSQLInjection(image)},
                '${this._database.preventSQLInjection(name)}',
                '${this._database.preventSQLInjection(surname)}',
                '${this._database.preventSQLInjection(street)}',
                '${this._database.preventSQLInjection(city)}',
                '${zip}',
                '${date_of_birth}',
                '${this._database.preventSQLInjection(AHV_number)}',
                '${guardian_id}',
                '${this._database.preventSQLInjection(specialization)}',
                '${class_id}',
                '${this._database.preventSQLInjection(QV)}',
                '${this._database.preventSQLInjection(marks)}',
                '${this._database.preventSQLInjection(contract)}',
                '${this._database.preventSQLInjection(job_desc)}',
                '${this._database.preventSQLInjection(EFZ_copy)}'

            );`

      if (await this._database.executeSQL(query)) {
        console.log(`Student ${name} ${surname} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async getAllStudents(): Promise<AStudent[]> {
    let arrayOfStudents: AStudent[] = await this._database.executeSQL(
      `SELECT * FROM Students`
    )

    let newPostsWithCommentsLikes: any[] = []

    for (let i = 0; i < arrayOfStudents.length; i++) {
      const student: AStudent = arrayOfStudents[i]
      
      let studentClass: AClass = await this._database.executeSQL(
        `SELECT * FROM Classes WHERE class_id = ${student.class_id}`
      )

      newPostsWithCommentsLikes.push({
        image: student.image,
        name: student.name,
        surname: student.surname,
        class_name: studentClass.class_name,
      })
    }
    return newPostsWithCommentsLikes
  }

  async getOneStudent(student_id: number): Promise<AStudent[] | boolean> {
    const student = await this._database.executeSQL(
      `SELECT * FROM Students WHERE userid = ${student_id}`
    )
    return student
  }

  async deleteStudent(student_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `DELETE FROM Students WHERE id = ${student_id}`
      )
    ) {
      return true
    }
    return false
  }

  async changeStudent(
    student_id: number,
    image: string,
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: number,
    date_of_birth: Date,
    AHV_number: string,
    guardian_id: number | "NULL",
    specialization: "applicationDeveloper" | "systemDeveloper",
    class_id: number,
    QV: string | "NULL",
    marks: string | "NULL",
    contract: string | "NULL",
    job_desc: string | "NULL",
    EFZ_copy: string | "NULL"
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE Students SET image = '${this._database.preventSQLInjection(image)}',
        name = '${this._database.preventSQLInjection(name)}'
        surname = '${this._database.preventSQLInjection(surname)}'
        street = '${this._database.preventSQLInjection(street)}'
        city = '${this._database.preventSQLInjection(city)}'
        zip = '${zip}'
        date_of_birth = '${date_of_birth}'
        AHV_number = '${this._database.preventSQLInjection(AHV_number)}'
        guardian_id = '${guardian_id}'
        specialization = '${this._database.preventSQLInjection(specialization)}'
        class_id = '${class_id}'
        QV = '${this._database.preventSQLInjection(QV)}'
        marks = '${this._database.preventSQLInjection(marks)}'
        contract = '${this._database.preventSQLInjection(contract)}'
        job_desc = '${this._database.preventSQLInjection(job_desc)}'
        EFZ_copy = '${this._database.preventSQLInjection(EFZ_copy)}'
        WHERE id = ${student_id}`
      )
    ) {
      return true
    }
    return false
  }

  async getAllClasses(): Promise<AClass[]> {
    let arrayOfClasses: AClass[] = await this._database.executeSQL(
      `SELECT * FROM Classes`
    )
    return arrayOfClasses
  }
  
  async createClass(
    class_name: string,
    QV_year: number,
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO Classes (
        id,
        class_name,
        QV_year
      ) VALUES (
        NULL,
        '${this._database.preventSQLInjection(class_name)}',
        '${QV_year}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`Class ${class_name} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async deleteClass(class_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM Classes WHERE id = ${class_id}`)
    ) {
      return true
    }
    return false
  }
  
  async changeClass(
    class_id: number,
    class_name: string,
    QV_year: string
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE classes SET class_name = '${this._database.preventSQLInjection(class_name)}',
         QV_year = '${this._database.preventSQLInjection(QV_year)}'
         WHERE id = ${class_id}`
      )
    ) {
      return true
    }
    return false
  }

  async getStudentsOfClass(class_id: number): Promise<AStudent[]> {
    let arrayOfStudents: AStudent[] = await this._database.executeSQL(
      `SELECT * FROM Students WHERE class_id = ${class_id}`
    )
    return arrayOfStudents
  }

  async getAllGuardians(): Promise<AGuardian[]> {
    let arrayOfGuardians: AGuardian[] = await this._database.executeSQL(
      `SELECT * FROM Guardians`
    )
    return arrayOfGuardians
  }

  async createGuardian(
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: number,
    phone: number,
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO Guardians (
        id,
        name,
        surname,
        street,
        city,
        zip,
        phone
      ) VALUES (
        NULL,
        '${this._database.preventSQLInjection(name)}',
        '${this._database.preventSQLInjection(surname)}',
        '${this._database.preventSQLInjection(street)}',
        '${this._database.preventSQLInjection(city)}',
        '${zip}',
        '${phone}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`Guardian ${name} ${surname} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async deleteGuardian(guardian_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM Guardians WHERE id = ${guardian_id}`)
    ) {
      return true
    }
    return false
  }

  async changeGuardian(
    guardian_id: number,
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: number,
    phone: number,
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE Guardians SET name = '${this._database.preventSQLInjection(name)}',
         surname = '${this._database.preventSQLInjection(surname)}',
         street = '${this._database.preventSQLInjection(street)}',
         city = '${this._database.preventSQLInjection(city)}',
         zip = '${zip}',
         phone = '${phone}'
         WHERE id = ${guardian_id}`
      )
    ) {
      return true
    }
    return false
  }

  async getAllCompanies(): Promise<ACompany[]> {
    let arrayOfCompanies: ACompany[] = await this._database.executeSQL(
      `SELECT * FROM Companies`
    )
    return arrayOfCompanies
  }

  async createCompany(
    company_name: string,
    street: string,
    city: string,
    zip: number,
    collaborative_contract: string
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO Companies (
        id,
        company_name,
        street,
        city,
        zip,
        collaborative_contract
      ) VALUES (
        NULL,
        '${this._database.preventSQLInjection(company_name)}',
        '${this._database.preventSQLInjection(street)}',
        '${this._database.preventSQLInjection(city)}',
        '${zip}',
        '${this._database.preventSQLInjection(collaborative_contract)}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`Company ${company_name} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async deleteCompany(company_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM Companies WHERE company_id = ${company_id}`)
    ) {
      return true
    }
    return false
  }

  async changeCompany(
    company_id: number,
    company_name: string,
    street: string,
    city: string,
    zip: number,
    collaborative_contract: string
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE Companies SET company_name = '${this._database.preventSQLInjection(company_name)}',
         street = '${this._database.preventSQLInjection(street)}',
         city = '${this._database.preventSQLInjection(city)}',
         zip = '${zip}',
         collaborative_contract = '${this._database.preventSQLInjection(collaborative_contract)}'
         WHERE company_id = ${company_id}`
      )
    ) {
      return true
    }
    return false
  }

  async getOneCompany(company_id: number): Promise<ACompany> {
    let company: ACompany = await this._database.executeSQL(
      `SELECT * FROM Companies WHERE company_id = ${company_id}`
    )
    return company
  }


}
