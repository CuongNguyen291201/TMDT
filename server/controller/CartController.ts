import { Request, Response } from 'express';
import Cart from '../model/Cart';

const cartController = {
  createCart: async (req: Request, res: Response) => {
    try {
      const cart = req.body;
      console.log('dd', cart)
      const _cart = new Cart(cart);
      // const data = await Cart.create(cart);
      await _cart.save();
      return res.status(200).json(_cart)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getCart: async (req: Request, res: Response) => {
    try {
      const userId = req.body
      const data = await Cart.find({ userId })
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCart: async (req: any, res: Response) => {
    try {
      const cart = req.boy
      const { userId, products } = req.body;
      const data = await Cart.findOneAndUpdate(userId, { $set: { products } }, { new: true })
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteCart: (req: any, res: Response) => {
    try {

    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default cartController