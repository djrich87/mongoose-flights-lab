// import req from "express/lib/request"
import { Flight } from '../models/flights.js'
import { Meal } from '../models/meal.js'


function newFlights(req, res) {
  res.render('flights/new',{
    title: 'Add Flight'
  })
}

function create(req, res) {
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.render('/flight/new')
    res.redirect(`/flights/${flight._id}`);
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
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function (err, flight) {
    Meal.find({_id: {$nin: flight.meals}}, function (err, meals) {
      // console.log("flight ", flight)
      // console.log("meals: ", meals)
      res.render("flights/show", {
        flight: flight,
        title: "Flight Detail",
        meals: meals,
      })
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

function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Flight.findById(req.params.id, req.body,
    function (err, flight) {
      res.redirect(`/flights/${flight._id}`)
    })
}

function createTicket(req, res) {
  // console.log('req.body', req.body)
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    console.log('flight', flight)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToMeal(req, res) {
  console.log('hello')
  // console.log('sanity check')
  // console.log('insanity check')
  Flight.findById(req.params.id, function (err, flight) {
    flight.meals.push(req.body.mealId)
    console.log('updated flight', flight)
    flight.save(function (err) {
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
  update,
  createTicket,
  addToMeal,
}