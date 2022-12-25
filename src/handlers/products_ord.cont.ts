import { Request, Response, NextFunction } from 'express'
import products_ordersModel from '../models/products_ord.mo'

const Products_OrdersModel = new products_ordersModel()

export const createProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.createProducts_orders(
      req.body
    )
    res.json({
      data: { ...prodOrd }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.getAllProducts_orders()
    res.json({
      data: { ...prodOrd },
      message: 'products in order were retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.getProducts_orders(
      req.params.product_order_id as unknown as string
    )
    res.json({
      data: { ...prodOrd },
      meesage: 'products in order were retrieved successfully '
    })
  } catch (error) {
    next(error)
  }
}

export const updateProdcutsOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.updateProdcutsOrder(
      req.body
    )
    res.json({
      data: { prodOrd },
      message: 'products in order are updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deletePRoductsOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.deletePRoductsOrder(
      req.params.product_order_id as unknown as string
    )
    res.json({
      data: { ...prodOrd },
      message: 'products in order are deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
