const Lendings = require('../models/Lending')
const BiblioHoldings = require('../models/BiblioHoldings')

const Book = require('../models/Book')

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

  async show (req, res) {
    const data = await Lendings.findAll({
      where: {
        user_id: req.params.userId
      }
    })
    return res.json(data)
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

  async snowToUserBook (req, res) {
    const dataLendins = await Lendings.findAll({
      where: { user_id: req.params.id, return_date: null }
    })

    console.log(dataLendins[0].holding_id)
    if (dataLendins[0]) {
      const arraybook = []

      for (let i = 0; i < dataLendins.length; i++) {
        const dataBiblioHoldings = await BiblioHoldings.findOne({
          where: { id: dataLendins[i].holding_id }
        })
        if (dataBiblioHoldings.record_id) {
          const dataBook = await Book.findAll({
            where: { record_id: dataBiblioHoldings.record_id }
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
      }
      return res.status(200).json(arraybook)
    } else {
      return res.status(200).json({ msg: 'sad' })
    }
  }
}

module.exports = new LendingigsController()
