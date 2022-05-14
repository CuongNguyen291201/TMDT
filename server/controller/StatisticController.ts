import { Request, Response } from 'express';
import Statistic from '../model/Statistic';

const statisticController = {
  createBill: async (req: Request, res: Response) => {
    try {
      const { time, money } = req.body;
      const data = await Statistic.create({time, money})
      await data.save()
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  statisticBill: async (req: Request, res: Response) => {
    try {
      const { startTime, endTime } = req.body;
      if (startTime && endTime) {
        const data = await Statistic.find({
          $and: [
            { time: { $gte: startTime, $lte: endTime } }
          ]
        })
        const total = data.reduce((prev, next: any) => prev + next.money, 0)
        return res.status(200).json(total)
      } else {
        const data = await Statistic.find()
        const total = data.reduce((prev, next: any) => prev + next.money, 0)
        return res.status(200).json(total)
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default statisticController