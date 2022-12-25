import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../models/users.mo'
import config from '../config'

const UserModel = new userModel()

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await UserModel.createNewUser(req.body)
    res.status(200).json({ User: { newUser } })
  } catch (error) {
    res.status(400).json(error);
  }
}

export const showAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await UserModel.showAllUsers()
    res.status(200).json({ User: { allUsers } })
  } catch (error) {
    res.status(400).json(error);
  }
}

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.getUserById(
      req.params.user_id as unknown as string
    )
    res.status(200).json({ User: { user } })
  } catch (error) {
    res.status(400).json(error);
  }
}

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userUpdate = await UserModel.updateUserById(req.body)
    res.status(200).json({ User: { userUpdate } })
  } catch (error) {
    res.status(400).json(error);
  }
}
export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDeleted = await UserModel.deleteUserById(
      req.params.user_id as unknown as string
    )
    res.json({
      data: { ...userDeleted }
    })
  } catch (error) {
    res.status(400).json(error);
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, password } = req.body
    const user = await UserModel.authenticateUser(
      user_name,
      password
    )
    const token = jwt.sign({ user }, config.token as string)
    if (!user) {
      return res.status(401).json({
        message: 'Make sure of the username and password'
      })
    }
    res.json({
      data: { ...user, token },
      message:
        'Authentication completed successfully '
    })
  } catch (error) {
    next(error)
  }
}
