import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcrypt';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const reqBody = req.body
      if (!reqBody.name || !reqBody.email || !reqBody.password) {
        return res.status(400).json({ msg: "Please check it all !!" })
      }

      if (!validateEmail(reqBody.email as string)) {
        return res.status(400).json({ msg: "Please check your email !!" })
      }

      const user = await User.findOne({ email: reqBody.email })
      if (user) return res.status(400).json({ msg: "User was exist !!" })

      const passwordHash = await bcrypt.hash(reqBody.password as string, 12)
      const newUser = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: passwordHash
      })

      const access_token = createAccessToken({ id: newUser._id })
      const refresh_token = createRefreshToken({ id: newUser._id })

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
      })

      await newUser.save()
      return res.status(200).json({ _user: newUser, access_token })

    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).exec()
      if (!user) return res.status(400).json({ msg: "User doesn't exist !!" })
      const checkPass = await bcrypt.compare(password as string, user?.password as string)
      if (!checkPass) return res.status(400).json({ msg: "Incorrect password !!" })

      const access_token = createAccessToken({ id: "" + user._id })
      const refresh_token = createRefreshToken({ id: "" + user._id })

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
      })

      return res.status(200).json({ _user: user, access_token })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refresh_token', { path: '/api/refresh_token' })
      return res.status(200).json({ msg: "Logout success !!" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  generateAccessToken: async (req: Request, res: Response) => {
    try {
      const rfToken = req.cookies.refresh_token;
      console.log('dd', rfToken)
      if (!rfToken) return res.status(400).json({ msg: "Please Login or Register." })

      jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, user: any) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register." })

        const access_token = createAccessToken({ id: user.id })
        const _user = await User.findById(user.id);
        return res.json({ _user, access_token })
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
  getUserFromId: async (req: Request, res: Response) => {
    try {
      const { _id } = req.body;
      console.log(_id)
      const user = await User.findById(_id);
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
}

const createRefreshToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })
}

export default authController;
