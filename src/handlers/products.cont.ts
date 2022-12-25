import { Request, Response, NextFunction } from 'express'
import productModel from '../models/products.mo'

const ProductModel = new productModel()

export const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.createNewProduct(req.body)
    res.json({
      newproduct: { ...product }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.getAllProducts()
    res.json({
      showProduct: { ...products }
    })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.getProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      dataProduct: { ...product }
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.updateProduct(req.body)
    res.json({
      product: { ...product }
    })
  } catch (error) {
    next(error)
  }
}
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.deleteProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      product: { ...product }
    })
  } catch (error) {
    next(error)
  }
}
