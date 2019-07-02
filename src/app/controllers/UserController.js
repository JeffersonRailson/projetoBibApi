const Model = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class UserController {
  async store (req, res) {
    const user = await Model.User.create({
      ...req.body
    })
    return res.status(200).json({
      msg: 'Usuário Cadastrado com sucesso!',
      user
    })
  }

  async listUsersValues (req, res) {
    const usersValuesList = await Model.UsersValues.findAll()
    return res.status(200).json(usersValuesList)
  }

  async list (req, res) {
    const users = await Model.User.findAll()
    return res.status(200).json(users)
  }
  async snow (req, res) {
    const user = await Model.User.findOne({ where: { id: req.params.id } })
    console.log(user.name)
    return res.status(200).json(user)
  }

  async snowUserValues (req, res) {
    const user = await Model.UsersValues.findOne({
      where: {
        user_id: req.params.id,
        key: {
          [Op.like]: `%${req.params.q}`
        }
      }
    })
    console.log(req.params.q, req.params.id)
    return res.status(200).json(user)
  }

  async snowValues (req, res) {
    const user = await Model.UsersValues.findAll({
      where: {
        user_id: req.params.id
      }
    })

    const dataUserArrray = []

    user.map(valueUser => {
      dataUserArrray.push(valueUser.value)
    })
    console.log(dataUserArrray)
    console.log(req.params.id)
    return res.status(200).json(dataUserArrray)
  }

  async showName (req, res) {
    console.log(req.params.name)
    const users = await Model.User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.params.name}%`
        }
      }
    })

    return res.status(200).json(users)
  }
}

module.exports = new UserController()
