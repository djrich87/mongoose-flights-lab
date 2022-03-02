import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightsSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },

  airports: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: "DEN"
  },

  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },

  departs: {
    type: Date,
    default: Date.now() + 365*24*60*1000,
    // const today = new Date() === 2022-03-01,
    // const oneYearFromNow = today.getFullYear() + 1 //=> 2022
    // today.setFullYear(oneYearFromNow) //=> 2022-10-29T12:13:04.759Z
    // return today
  
  },



})


const Flight = mongoose.model('Flight', flightsSchema)

export {
  Flight
}