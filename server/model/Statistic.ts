import mongoose from 'mongoose'
import { IStatistic } from './interface/IStatistic'

const StatisticSchema = new mongoose.Schema({
  time: Number,
  money: Number
}, {
  timestamps: true
})

export default mongoose.model<IStatistic>('statistic', StatisticSchema)