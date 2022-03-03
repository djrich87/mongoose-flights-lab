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
    res.redirect('/flights')
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

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/show', {
      title: 'Flight Detail',
      flight: flight
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/edit',{
      flight,
      err,
      title: "Edit Flight"
    })
  })
}

// function update(req, res) {
//   Flight.findById(req.params.id, req.body,
//     function (err, flight) {
//       res.redirect(`/flights/${flight._id}`)
//     })
// }

function createTicket(req, res) {
  console.log('req.body', req.body)
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    console.log('flight', flight)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}


export {
  newFlights as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  // update,
  createTicket,
}