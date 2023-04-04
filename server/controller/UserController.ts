import { IUser } from "../model/interface/IUser";
import User from "../model/User";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = "cMzhpvgfmPN2XdFh3t6S:eKm`mmsc=2U]KQ/>r*dwxsu\pxa<Se!(*7DYG8'sPV!8q/C\<zf>qNr$43ZPHq]w>ccP6V3:Fp,~35"
const ACCESS_TOKEN_SECRET = "u\*?C;2J.>{`#(gNE-W<FfAA>='w$p*N5%<=Kj~L49.G%5XCgv"

const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const reqBody = <IUser>req.body
            if (!reqBody.name || !reqBody.email || !reqBody.password) {
                return res.status(400).json({ msg: "Please check it all !!" })
            }

            if (!validateEmail(reqBody.email as string)) {
                return res.status(400).json({ msg: "Please check your email !!" })
            }

            const user = await User.findOne({ email: reqBody.email })
            if (user) return res.status(400).json({ msg: "User was exist !!" })

            if (reqBody.password.length < 8) {
                return res.status(400).json({ msg: "Password must be at least 8 characters !!" })
            }

            const passwordHash = await bcrypt.hash(reqBody.password as string, 12)
            const newUser = new User({
                name: reqBody.name,
                email: reqBody.email,
                password: passwordHash
            })

            const access_token = createAccessToken({ id: newUser._id })
            const refresh_token = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })


            await newUser.save()

            return res.status(200).json({ msg: 'Register success !!', access_token, newUser })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User doesn't exist !!" })

            const checkPass = await bcrypt.compare(password as string, user.password as string)
            if (!checkPass) return res.status(400).json({ msg: "Incorrect password !!" })

            const access_token = createAccessToken({ id: user._id })
            const refresh_token = createRefreshToken({ id: user._id })

            // console.log('đ', access_token, refresh_token)

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })

            return res.status(200).json({
                accessToken: access_token,
                // refreshToken: refresh_token,
                userId: user._id,
                name: user.name,
                avatar: user.avatar,
                email: user.email,
                role: user.role,
                cart: user.cart
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.messsage })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.status(200).json({ msg: "Logout success !!" })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    generateAccessToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            console.log('rf', rf_token)

            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register." })

                const accesstoken = createAccessToken({ id: user?._id })
            res.json({ ...user, accesstoken })
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    addCart: async (req: Request, res: Response) => {
        try {

            const _id = req.body.userId;
            const { _cart } = req.body;
            const data = await User.findByIdAndUpdate(_id, { $set: { cart: _cart } })
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },


}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createAccessToken = (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' })
}

const createRefreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '30d' })
}

export default userController