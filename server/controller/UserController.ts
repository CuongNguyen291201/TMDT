import { IUser } from "../model/interface/IUser";
import User from "../model/User";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const reqBody = <IUser> req.body
            if (!reqBody.name || !reqBody.email || !reqBody.password) {
                return res.status(400).json({msg: "Please check it all !!"})
            }

            if (!validateEmail(reqBody.email as string)) {
                return res.status(400).json({msg: "Please check your email !!"})
            }

            const user = await User.findOne({email: reqBody.email})
            if (user) return res.status(400).json({msg: "User was exist !!"})

            if (reqBody.password.length < 8) {
                return res.status(400).json({msg: "Password must be at least 8 characters !!"})
            }

            const passwordHash = await bcrypt.hash(reqBody.password as string, 12)   
            const newUser = new User( <IUser>{
                name: reqBody.name,
                email: reqBody.email,
                password: passwordHash
            })
        
            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/v1/refresh_token',
                maxAge: 7*24*60*60*1000  // 7 days
            })

            await newUser.save()

            return res.status(200).json({msg: 'Register success !!', access_token})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    }
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload: any) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET as string, {expiresIn: '5m'})
}

const createAccessToken = (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '15m'})
}

const createRefreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '7d'})
}

export default userController