import express from 'express'
import statisticController from '../controller/StatisticController'

const Router = express.Router()

Router.post('/create-bill', statisticController.createBill)

Router.post('/statistic-bill', statisticController.statisticBill)

export { Router as statisticRouters }