const Model = require('../models')

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
}

module.exports = new UserController()
