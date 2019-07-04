const Reservations = require('../models/Reservations')

class ReservationsController {
  async reservationCreate (req, res) {
    const reservation = await Reservations.create({
      ...req.body
    })
    return res.status(200).json(reservation)
  }

  async listReservations (req, res) {
    const reservations = await Reservations.findAll()
    return res.status(200).json(reservations)
  }

  async snowToUser (req, res) {
    const dataReservation = await Reservations.findAll({
      where: { user_id: req.params.id }
    })

    return res.status(200).json(dataReservation)
  }

  async snowToRecord (req, res) {
    const dataReservation = await Reservations.findAll({
      where: { record_id: req.params.id }
    })

    return res.status(200).json(dataReservation)
  }
}

module.exports = new ReservationsController()
