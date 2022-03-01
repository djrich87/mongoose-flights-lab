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


  }



})