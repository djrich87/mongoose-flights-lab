// import req from "express/lib/request"
import { Flight } from "../models/flights.js"


function newFlights(req, res) {
  res.render('flights/new',{
    title: 'Add Flight'
  })
}

function create(req, res) {
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.render('/flight/new')
    res.redirect('/flights/new')
  })
}

function index(req, res){
  Flight.find({}, function (error, flights) {
    res.render("flights/index", {
      error: error,
      flights: flights,
      title: 'All Flights',
    })
  })
}

export {
  newFlights as new,
  create,
  index,
}