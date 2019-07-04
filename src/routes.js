const express = require('express')
const controllers = require('./app/controllers')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Bem Vindo ao BibLivre IFMA')
})

// Requests Routes
routes.get('/requests', controllers.RequestsController.list)
routes.post('/requests/new', controllers.RequestsController.store)

// User Routes / Usuário
routes.get('/users', controllers.UserController.list)
routes.get('/user/values', controllers.UserController.listUsersValues)
routes.get('/user/values/:id', controllers.UserController.snowValues)

routes.get('/user/:q/:id', controllers.UserController.snowUserValues)

routes.post('/user/new', controllers.UserController.store)
routes.get('/users/:id', controllers.UserController.snow)
routes.get('/users/q/:name', controllers.UserController.showName)

// Users Types / Tipos de Usuários
routes.get('/user/types', controllers.UsersTypesController.listUsersTypes)

// Users Fields / Complementos cadastro usuário
routes.get('/user/fields', controllers.UsersFieldsController.listUsersFields) // Erro não encontra o ID

// Biblio Records / Cadastro de Livro
routes.get('/biblio/records', controllers.BiblioAllController.listBiblioRecords)

routes.post(
  '/biblio/records/new',
  controllers.BiblioAllController.storeBiblioRecords
)

// Reservations / Reservas
routes.get('/reservations', controllers.ReservationsController.listReservations)
routes.get(
  '/reservations/user/:id',
  controllers.ReservationsController.snowToUser
)
routes.get(
  '/reservations/book/:id',
  controllers.ReservationsController.snowToRecord
)
routes.post(
  '/reservation/new',
  controllers.ReservationsController.reservationCreate
)

// Lendings / Emprestimos

routes.get('/lendings', controllers.LendingController.listLendings)
routes.get(
  '/lendings/count/:userId',
  controllers.LendingController.countLendings
)

routes.get('/lendings/:userId', controllers.LendingController.show)

routes.post('/lending/new', controllers.LendingController.createLending)

// Biblio_Holdings / Exemplares

routes.get(
  '/biblio/holdings',
  controllers.BiblioAllController.listBiblioHoldings
)

routes.post(
  '/biblio/holding/new',
  controllers.BiblioAllController.storeBiblioHoldings
)

// Livro

routes.get('/book/assunto/:assusto', controllers.BookControllers.showSubject)
routes.get('/book/titulo/:titulo', controllers.BookControllers.showTitle)
routes.get('/book', controllers.BookControllers.list)
module.exports = routes
