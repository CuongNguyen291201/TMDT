import { Request, Response } from 'express';
import Order from "../model/Order";


const eventController = {
    getAllOrders: async (req: Request, res: Response) => {
        try {
            const data = await Order.find();
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getOrderByUser: async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;
            const data = await Order.find({ idUser: userId });
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createOrder: async (req: Request, res: Response) => {
        try {
            const { order } = req.body
            const newOrder = await Order.create(order)
            await newOrder.save()
            return res.status(200).json({ msg: "Create order success!!" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteOrder: async (req: Request, res: Response) => {
        try {
            const _id: string = req.body.orderId
            await Order.findByIdAndDelete(_id);
            const data = await Order.find();
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    statisticOrder: async (req: Request, res: Response) => {
        try {
            const { startDate, endDate } = req.body;

            const data = await Order.find({
                createdAt: {
                    $gte: new Date(startDate - 24*60*60*1000),
                    // $lte: new Date(endDate - 24*60*60*1000)
                }
            });

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default eventController