import { Database } from './database'

import { AStudent, AClass, AGuardian, ACompany, AContactPerson, AContract } from '../interface/interface'

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
            INSERT INTO students (
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
      `SELECT * FROM students`
    )

    let newPostsWithCommentsLikes: any[] = []

    for (let i = 0; i < arrayOfStudents.length; i++) {
      const student: AStudent = arrayOfStudents[i]
      
      let studentClass: AClass = await this._database.executeSQL(
        `SELECT * FROM class WHERE class_id = ${student.class_id}`
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
      `SELECT * FROM students WHERE userid = ${student_id}`
    )
    return student
  }

  async deleteStudent(student_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `DELETE FROM students WHERE id = ${student_id}`
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
        `UPDATE students SET image = '${this._database.preventSQLInjection(image)}',
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
      `SELECT * FROM students WHERE class_id = ${class_id}`
    )
    return arrayOfStudents
  }

  async getAllGuardians(): Promise<AGuardian[]> {
    let arrayOfGuardians: AGuardian[] = await this._database.executeSQL(
      `SELECT * FROM guardians`
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
      const query = `INSERT INTO guardians (
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
      await this._database.executeSQL(`DELETE FROM guardians WHERE id = ${guardian_id}`)
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
        `UPDATE guardians SET name = '${this._database.preventSQLInjection(name)}',
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
      `SELECT * FROM companies`
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
      const query = `INSERT INTO companies (
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
      await this._database.executeSQL(`DELETE FROM companies WHERE company_id = ${company_id}`)
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
        `UPDATE companies SET company_name = '${this._database.preventSQLInjection(company_name)}',
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
      `SELECT * FROM companies WHERE company_id = ${company_id}`
    )
    return company
  }

  async getAllContactPersons(): Promise<AContactPerson[]> {
    let arrayOfContactPersons: AContactPerson[] = await this._database.executeSQL(
      `SELECT * FROM contact_person`
    )
    return arrayOfContactPersons
  }

  async createContactPerson(
    company_id: number,
    name: string,
    surname: string,
    email: string,
    phone: number,
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO contact_person (
        id,
        company_id,
        name,
        surname,
        email,
        phone
      ) VALUES (
        NULL,
        '${company_id}',
        '${this._database.preventSQLInjection(name)}',
        '${this._database.preventSQLInjection(surname)}',
        '${this._database.preventSQLInjection(email)}',
        '${phone}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`Contact person ${name} ${surname} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async deleteContactPerson(contact_person_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM contact_person WHERE id = ${contact_person_id}`)
    ) {
      return true
    }
    return false
  }

  async changeContactPerson(
    contact_person_id: number,
    company_id: number,
    name: string,
    surname: string,
    email: string,
    phone: number
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE contact_person SET company_id = '${company_id}',
         name = '${this._database.preventSQLInjection(name)}',
         surname = '${this._database.preventSQLInjection(surname)}',
         email = '${this._database.preventSQLInjection(email)}',
         phone = '${phone}'
         WHERE id = ${contact_person_id}`
      )
    ) {
      return true
    }
    return false
  }

  async getOneContactPerson(contact_person_id: number): Promise<AContactPerson> {
    let contact_person: AContactPerson = await this._database.executeSQL(
      `SELECT * FROM contact_person WHERE id = ${contact_person_id}`
    )
    return contact_person
  }

  async getContactsOFCompany(company_id: number): Promise<AContactPerson[]> {
    let arrayOfContactPersons: AContactPerson[] = await this._database.executeSQL(
      `SELECT * FROM contact_person WHERE company_id = ${company_id}`
    )
    return arrayOfContactPersons
  }

  async createContract(
    date_of_contract: Date,
    salary_y1: number,
    salary_y2: number,
    approval_date: Date,
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO contracts (
        id,
        date_of_contract,
        salary_y1,
        salary_y2,
        approval_date
      ) VALUES (
        NULL,
        '${date_of_contract}',
        '${salary_y1}',
        '${salary_y2}',
        '${approval_date}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`Contract was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async editContract(
    contract_id: number,
    date_of_contract: Date,
    salary_y1: number,
    salary_y2: number,
    approval_date: Date
    ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE contracts SET date_of_contract = '${date_of_contract}',
         salary_y1 = '${salary_y1}',
         salary_y2 = '${salary_y2}',
         approval_date = '${approval_date}'
         WHERE id = ${contract_id}`
      )
    ) {
      return true
    }
    return false
  }

  async deleteContract(contract_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM contracts WHERE id = ${contract_id}`)
    ) {
      return true
    }
    return false
  }

  async getOneContract(contract_id: number): Promise<AContract> {
    let contract: AContract = await this._database.executeSQL(
      `SELECT * FROM contracts WHERE id = ${contract_id}`
    )
    return contract
  }

  async getAllContracts(): Promise<AContract[]> {
    let arrayOfContracts: AContract[] = await this._database.executeSQL(
      `SELECT * FROM contracts`
    )
    return arrayOfContracts
  }

  async createUser(
    username: string,
    password: string,
    role: "admin" | "user"
  ): Promise<boolean> {
    try {
      const query = `INSERT INTO Users (
        id,
        username,
        password,
        role
      ) VALUES (
        NULL,
        '${this._database.preventSQLInjection(username)}',
        '${this._database.preventSQLInjection(password)}',
        '${this._database.preventSQLInjection(role)}'
      );`

      if (await this._database.executeSQL(query)) {
        console.log(`User ${username} was created`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async deleteUser(user_id: number): Promise<boolean> {
    if (
      await this._database.executeSQL(`DELETE FROM users WHERE id = ${user_id}`)
    ) {
      return true
    }
    return false
  }

  async changeUser(
    user_id: number,
    username: string,
    password: string,
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE users SET username = '${this._database.preventSQLInjection(username)}',
         password = '${this._database.preventSQLInjection(password)}'
         WHERE id = ${user_id}`
      )
    ) {
      return true
    }
    return false
  }


}
