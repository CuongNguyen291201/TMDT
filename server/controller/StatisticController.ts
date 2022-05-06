import { Request, Response } from 'express';
import Cart from '../model/Cart';

const statisticController = {
  createBill: async (req: Request, res: Response) => {
    try {
      const bill = req.body;
      const data = await Cart.create(bill)
      await data.save()
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  statisticBill: async (req: Request, res: Response) => {
    try {
      const startDate = req.query;
      const endDate = req.query;
      const data = await Cart.find({
        $and: [
          {time: {$gte: startDate, $lte: endDate}}
        ]
      })
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default statisticController