import { Request, Response, Express } from 'express'
import { User, Students } from '../database'

import pkg from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { AUser, AStudent } from '../interface/interface'

export class API {
  // Properties
  app: Express
  user: User
  post: Post

  private SECRET: string = /* String(process.env.TOKEN_SECRET) |*/ 'FAKE_SECRET'

  // Constructor
  constructor(app: Express, user: User, post: Post) {
    this.app = app
    this.user = user
    this.post = post

    this.app.get('/api/Healthcheck', (req: Request, res: Response) =>
      res.status(200).send(1)
    )
    //Login and Logout
    this.app.post('/api/Login', this.login.bind(this))
    this.app.post('/api/Logout', this.logout.bind(this))
    //Students
    this.app.get('/api/Students', this.getAllStudents.bind(this))
    this.app.post('/api/Student', this.addStudent.bind(this))
    this.app.put('/api/Student', this.changeStudent.bind(this))
    this.app.delete('/api/Student', this.deleteStudent.bind(this))
    //Companies
    this.app.get('/api/Comapnies', this.getAllCompanies.bind(this))
    this.app.post('/api/Company', this.addCompany.bind(this))
    this.app.put('/api/Company', this.changeCompany.bind(this))
    this.app.delete('/api/Company', this.deleteCompany.bind(this))
    //Applications
    this.app.get('/api/Application', this.getApplication.bind(this))
    this.app.post('/api/Application', this.addApplication.bind(this))
    this.app.put('/api/Applications', this.changeApplication.bind(this))
    this.app.delete('/api/Application', this.deleteApplication.bind(this))
    //Users
    this.app.get('/api/Users', this.getAllUsers.bind(this))
    this.app.post('/api/User', this.addUser.bind(this))
    this.app.put('/api/User', this.changeUser.bind(this))
    this.app.delete('/api/User', this.deleteUser.bind(this))
  }

  // Methods

  private async validateUser(
    token: string,
    privliges: string[],
    res?
  ): Promise<AUser | boolean> {
    try {
      let id = await pkg.verify(token, this.SECRET).id

      const aUser: AUser[] = await this.user.getOneUserbyId(String(id))

      for (let i = 0; i < role.length; i++) {
        const element = role[i]
        if (aUser[0].role == element) {
          return aUser[0]
        }
      }
      if (res === undefined) {
        return false
      }
      res.status(403).json({
        error: 'You Are Not alowed to do this',
      })
      return false
    } catch (e) {
      if (res === undefined) {
        return false
      }
      res.status(403).json({
        error: 'You Are Not alowed to do this',
      })
      return false
    }
  }

  //await this.validateUser(req.cookies.token, ["Admin", "Moderator", "User"], res)

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  private async logout(req: Request, res: Response) {
    res.cookie('token', "", {
      httpOnly: true,
    })
    res.status(200).json({
      info: 'Logged out',
    })
    return
  }

  private async login(req: Request, res: Response) {
    try {
      const data: any = req.body
      if (!data.name) {
        res.status(401).json({
          error: 'Invalid name',
        })
        return
      }
      if (!data.password) {
        res.status(401).json({
          error: 'Invalid password',
        })
        return
      }

      const aUser: AUser[] = await this.user.getOneUserbyName(String(data.name))

      if (
        aUser.length == 0 ||
        !(await bcrypt.compare(String(data.password), aUser[0].passwdhash))
      ) {
        res.status(200).json({
          error: 'Invalid name or password',
        })
        return
      }

      const USER_ID = aUser[0].id

      const token = pkg.sign({ id: USER_ID }, this.SECRET, {
        expiresIn: '5h',
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      console.log(`UserID: ${USER_ID} Logged In`)

      res.status(201).json({
        info: 'Successfuly created Token',
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        error: 'Login Failed',
      })
    }
  }

  private async getAllCompanies(req: Request, res: Response) {
    res.status(200).json(await this.getAllCompanies.bind(this))
  }

  private async addCompany(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    this.post.addCompany(Number(data.company_id), String(data.company_name), String(data.street), String(data.city), Number(data.zip))

    res.status(201).json({
      info: 'added a Student',
    })
    return
  }

  // ToDo: Admin/moderator can delete all posts user just own
  private async deleteCompany(req: Request, res: Response) {
    const data: any = req.body

    if (!data.student_id) {
      res.status(406).json({
        error: 'Invalid student id',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      await this.post.deleteCompany(String(data.company_id))
      res.status(200).json({
        info:
          'deleted company',
      })
      return
    }

    res.status(400).json({
      error: 'didnt delete a company',
    })
    return
  }

  private async changeCompany(req: Request, res: Response) {
    const data: any = req.body

    if (!data.company_id) {
      res.status(406).json({
        error: 'Invalid student id',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      if (await this.companies.changeCompany(
        Number(data.company_id),
        String(data.company_name),
        String(data.street),
        String(data.city),
        Number(data.zip)
        )) {
        res.status(200).json({
          info:
            'changed company',
        })
        return
      }
      res.status(404).json({
        error: 'company does not exist',
      })
      return
    }
  }

  private async getAllUsers(req: Request, res: Response) {
    if (!(await this.validateUser(req.cookies.token, ['Admin'], res))) {
      return
    }
    res.status(200).json(await this.user.getAllUsers())
  }

  private async deleteUser(req: Request, res: Response) {
    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      const data: any = req.body

      if (!data.user_id) {
        res.status(406).json({
          error: 'Invalid username',
        })
        return
      }

      await this.user.deleteUserbyId(String(data.user_id))
      res.status(200).json({
        info: 'Deleted a User: ' + data.user_id,
      })
      return
    }
  }

  private async changeUser(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.newpassword) {
      res.status(406).json({
        error: 'Invalid new password',
      })
      return
    }
    if (
      !data.oldpassword ||
      !(await bcrypt.compare(String(data.oldpassword), user.passwdhash))
    ) {
      res.status(406).json({
        error: 'Invalid old password',
      })
      return
    }

    if (
      await this.user.changeUserPasswd(
        String(user.name),
        await this.hashPassword(String(data.newpassword))
      )
    ) {
      res.status(200).json({
        info: 'Password Changed',
      })
      return
    }
    res.status(404).json({
      error: 'didnt change the password',
    })
    return
  }

  private async addUser(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.newName) {
      res.status(406).json({
        error: 'Invalid newName',
      })
      return
    }

    if (await this.user.addUser(String(data.newName), user.name)) {
      res.status(200).json({
        info: 'Name has been changed',
      })
      return
    }
    res.status(404).json({
      error:
        'the provided name didnt check with the layout or probably alredy exists',
    })
    return
  }

  private async getAllStudents(req: Request, res: Response) {
    res.status(200).json(await this.getAllStudents.bind(this))
  }

  private async addStudent(req: Request, res: Response) {
    const student = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!student) {
      return
    }

    const data: any = req.body

    if (!data.titel) {
      res.status(406).json({
        error: 'Invalid title',
      })
      return
    }
    if (!data.content) {
      res.status(406).json({
        error: 'Invalid content',
      })
      return
    }
    if (!student.student_id) {
      res.status(406).json({
        error: 'Invalid id',
      })
      return
    }

    this.post.addStudent(String(data.titel), String(data.content), String(student.student_id))

    res.status(201).json({
      info: 'added a Student',
    })
    return
  }

  // ToDo: Admin/moderator can delete all posts user just own
  private async deleteStudent(req: Request, res: Response) {
    const data: any = req.body

    if (!data.student_id) {
      res.status(406).json({
        error: 'Invalid student id',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      await this.post.deleteStudent(String(data.student_id))
      res.status(200).json({
        info:
          'deleted student',
      })
      return
    }

    res.status(400).json({
      error: 'didnt delete a student',
    })
    return
  }

  private async changeStudent(req: Request, res: Response) {
    const data: any = req.body

    if (!data.student_id) {
      res.status(406).json({
        error: 'Invalid student id',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      if (await this.students.changeStudent(
        Number(data.student_id),
        String(data.image),
        String(data.name),
        String(data.surname),
        String(data.street),
        String(data.city),
        Number(data.zip),
        Date(data.date_of_birth),
        String(data.AHV_number),
        
        Number(data.class_id)

      )) {
        res.status(200).json({
          info:
            'changed student',
        })
        return
      }
      res.status(404).json({
        error: 'student does not exist',
      })
      return
    }
  }

  private async getApplication(req: Request, res: Response) {
    if (!(await this.validateUser(req.cookies.token, ['Admin'], res))) {
      return
    }
    res.status(200).json(await this.AApplication.getApplication())
  }

  private async deleteApplication(req: Request, res: Response) {
    let user = await this.validateUser(req.cookies.token, ['Admin'])
    if (user !== false) {
      const data: any = req.body

      if (!data.user_id) {
        res.status(406).json({
          error: 'Invalid username',
        })
        return
      }

      await this.user.deleteApplicationById(Number(data.application_id))
      res.status(200).json({
        info: 'Deleted a User: ' + data.application_id,
      })
      return
    }
  }

  private async changeApplication(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.newpassword) {
      res.status(406).json({
        error: 'Invalid new password',
      })
      return
    }
    if (
      !data.oldpassword ||
      !(await bcrypt.compare(String(data.oldpassword), user.passwdhash))
    ) {
      res.status(406).json({
        error: 'Invalid old password',
      })
      return
    }

    if (
      await this.user.changeUserPasswd(
        String(user.name),
        await this.hashPassword(String(data.newpassword))
      )
    ) {
      res.status(200).json({
        info: 'Password Changed',
      })
      return
    }
    res.status(404).json({
      error: 'didnt change the password',
    })
    return
  }

  private async addApplication(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.application_id) {
      res.status(406).json({
        error: 'Invalid newName',
      })
      return
    }

    if (await this.user.addUser(String(data.newName), user.name)) {
      res.status(200).json({
        info: 'Name has been changed',
      })
      return
    }
    res.status(404).json({
      error:
        'the provided name didnt check with the layout or probably alredy exists',
    })
    return
  }

  private async banAUser(req: Request, res: Response) {
    if (
      !(await this.validateUser(
        req.cookies.token,
        ['Admin'],
        res
      ))
    ) {
      return
    }

    const data: any = req.body
    console.log(data);
    if (!data.userid) {
      res.status(406).json({
        error: 'Invalid userid',
      })
      return
    }

    if (!(typeof data.ban == "boolean")) {
      res.status(406).json({
        error: 'Invalid ban',
      })
      return
    }

    if (await this.user.banOrUnbanUser(String(data.userid), data.ban)) {
      res.status(200).json({
        info: 'Un/Banned User',
      })
      return
    }
    res.status(404).json({
      error: 'unsuccessful',
    })
    return

  }

  async changeRoll(req: Request, res: Response) {
    if (
      !(await this.validateUser(
        req.cookies.token,
        ['Admin'],
        res
      ))
    ) {
      return
    }

    const data: any = req.body

    if (!data.name) {
      res.status(406).json({
        error: 'Invalid name',
      })
      return
    }

    if (!data.role) {
      res.status(406).json({
        error: 'Invalid role',
      })
      return
    }

    if (await this.user.changeUserRoll(String(data.name), String(data.role))) {
      res.status(200).json({
        info: 'Changed role',
      })
      return
    }
    res.status(404).json({
      error: 'unsuccessful, role or user does not exist',
    })
    return

  }
}
