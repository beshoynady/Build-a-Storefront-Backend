import { Request, Response, NextFunction } from 'express'
import orderModel from '../models/orders.mo'

const OrderModel = new orderModel()

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await OrderModel.createOrder(req.body)
    res.json({
      data: { ...product },
      message: 'order is placed successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.getAllOrders()
    res.json({
      data: { ...orders },
      message: 'All order were retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.getOneOrder(
      req.params.order_id as string
    )
    res.json({
      data: { ...order },
      meesage: 'order retrieved successfully '
    })
  } catch (error) {
    next(error)
  }
}

export const updateOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.updateOneOrder(req.body)
    res.json({
      data: { order },
      message: 'order updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.deleteOneOrder(
      req.params.order_id as unknown as string
    )
    res.json({
      data: { ...order },
      message: 'order is deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
