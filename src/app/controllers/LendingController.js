const Lendings = require('../models/Lending')

class LendingigsController {
  async createLending (req, res) {
    const requests = await Lendings.create({
      ...req.body
    })
    return res.status(200).json({
      msg: 'Emprestimo criado com sucesso!',
      requests
    })
  }

  async listLendings (req, res) {
    const requests = await Lendings.findAll()
    return res.status(200).json(requests)
  }

  async countLendings (req, res) {
    Lendings.findAndCountAll({
      where: {
        user_id: req.params.userId,
        return_date: null
      },
      offset: 10,
      limit: 2
    }).then(function (result) {
      console.log(result.count)
      return res.json({ count: result.count })
    })
  }
}

module.exports = new LendingigsController()
