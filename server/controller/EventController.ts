import { IEvent } from './../model/interface/IEvent';
import { Request, Response } from 'express';
import Event from "../model/Event";


const eventController = {
    getEvent: async (req: Request, res: Response) => {
        try {
            const { _id: string } = req.body
            const data = await Event.findOne({ _id: string })
            return res.status(200).json(data)
        } catch (error: any) {
            return res.json(500).json({ msg: error.message })
        }
    },

    getAllEvents: async (req: Request, res: Response) => {
        try {
            const data = await Event.find({opened: true})
            return res.status(200).json(data)
        } catch (error: any) {
            return res.json(500).json({ msg: error.message })
        }
    },

    createEvent: async (req: Request, res: Response) => {
        try {
            const reqBody = <IEvent> req.body
            const newEvent = await Event.create(reqBody)
            await newEvent.save()
            return res.status(200).json({msg: "Create event success!!"})
        } catch (error: any) {
            return res.json(500).json({ msg: error.message })
        }
    },

    updateEvent: async (req: Request, res: Response) => {
        try {
            const _id: string = req.body.eventId
            const args: IEvent = req.body.event
            const newEvent = await Event.findByIdAndUpdate({_id}, args)
            return res.status(200).json({msg: "Update event success!!"})
        } catch (error: any) {
            return res.json(500).json({ msg: error.message })
        }
    },

    deleteEvent: async (req: Request, res: Response) => {
        try {
            const _id: string = req.body.eventId
            const event = await Event.findByIdAndUpdate({_id}, {opened: false})
            return res.status(200).json({msg: "Delete event success!!"})
        } catch (error: any) {
            return res.json(500).json({ msg: error.message })
        }
    }
}

export default eventController