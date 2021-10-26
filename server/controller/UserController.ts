import { IUser } from "../model/interface/IUser";
import User from "../model/User";
import { Request, Response } from 'express';

const userController = {
    register: async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            return res.status(500).json()
        }
    }
}