export interface AUser {
    id: number
    name: string
    passwdhash: string
    role: "admin" | "user"
}

export interface AStudent {
    student_id: number
    image: string
    name: string
    surname: string
    street: string
    city: string
    zip: number
    date_of_birth: Date
    AHV_number: string
    guardian_id: number | "NULL"
    specialization: "applicationDeveloper" | "systemDeveloper"
    class_id: number
    QV: string | "NULL"
    marks: string | "NULL"
    contract: string | "NULL"
    job_desc: string | "NULL"
    EFZ_copy: string | "NULL"
}

export interface AClass {
    class_id: number
    class_name: string
    QV_year: number
}

export interface AGuardian {
    guardian_id: number
    name: string
    surname: string
    street: string
    city: string
    zip: number
    phone: number
}

export interface AApplication {
    application_id: number
    student_id: number
    application_date: Date
    company_id: number
    application_status: "pending" | "accepted" | "rejected"
    interview_date: Date | "NULL"
    try_out_id: number | "NULL"
    contract: string | "NULL"
}

export interface ACompany {
    company_id?: number
    company_name: string
    street: string
    city: string
    zip: number
    collaborative_contract: string | "NULL"
}

export interface AContactPerson {
    contact_person_id: number
    company_id: number
    name: string
    surname: string
    email: string
    phone: number
}

export interface ATryOut {
    try_out_id: number
    from_date: Date
    to_date: Date
}

export interface AContract {
    contract_id: number
    date: Date
    salary_y1: number
    salary_y2: number
    approval_date: Date
}