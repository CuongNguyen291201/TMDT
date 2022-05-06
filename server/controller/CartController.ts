import { Request, Response } from 'express';
import Cart from '../model/Cart';

const cartController = {
  createCart: async (req: Request, res: Response) => {
    try {
      const cart = req.body;
      const data = await Cart.create(cart);
      await data.save();
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getCart: async (req: Request, res: Response) => {
    try {
      const userId = req.query
      const data = await Cart.find(userId)
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCart: async (req: Request, res: Response) => {
    try {
      const userId = req.query;
      const products = req.body;
      const _cart = {
        userId,
        products
      }
      const data = await Cart.findOneAndUpdate(userId, { _cart }, { new: true })
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default cartController