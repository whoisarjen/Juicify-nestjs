import { User } from "src/users/entities/user.entity"
import { Request, Response } from 'express'

export type Ctx = {
	req: Request & { user?: Pick<User, 'email'> }
	res: Response
}