const Reservations = require('../models/Reservations')
const Book = require('../models/Book')

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

  async snowToUserBook (req, res) {
    const dataReservation = await Reservations.findAll({
      where: { user_id: req.params.id }
    })

    if (dataReservation[0]) {
      const arraybook = []

      for (let i = 0; i < dataReservation.length; i++) {
        const dataBook = await Book.findAll({
          where: { record_id: dataReservation[i].record_id }
        })
        const condicao = dataBook[0]
        if (condicao) {
          const [autores, publicacao, titulo, assunto, isbn] = dataBook
          let dataBookObj = {
            id: titulo.record_id,
            autores: autores.phrase,
            publicacao: publicacao.phrase,
            titulo: titulo.phrase,
            assunto: assunto.phrase,
            isbn: isbn.phrase
          }

          arraybook.push(dataBookObj)
        }
      }

      return res.status(200).json(arraybook)
    } else {
      return res.status(200).json({ msg: 'sad' })
    }
  }
}

module.exports = new ReservationsController()
