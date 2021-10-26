import express from 'express'
import eventController from '../controller/EventController'

const Router = express.Router()

Router.get('/get-event', eventController.getEvent)

Router.get('/get-all-events', eventController.getAllEvents)

Router.post('/create-event', eventController.createEvent)

Router.post('/update-event', eventController.updateEvent)

Router.post('/delete-event', eventController.deleteEvent)

export { Router as eventRouters }