const Book = require('../models/Book')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class BookController {
  async listBookValues (req, res) {
    const dataBooks = await Book.findAll()
    return res.status(200).json(dataBooks)
  }

  async snow (req, res) {
    const dataBook = await Book.findAll({ where: { record_id: req.params.id } })
    console.log(dataBook)
    return res.status(200).json(dataBook)
  }

  async snow2 (req, res) {
    const dataBook = await Book.findAll({ where: { record_id: req.params.id } })
    const dataBookArrray = []

    dataBook.map(valueBook => {
      dataBookArrray.push(valueBook.phrase)
    })

    const [autores, publicacao, titulo, assusto, isbn] = dataBookArrray
    const dataBookObj = {
      autores,
      publicacao,
      titulo,
      assusto,
      isbn
    }
    return res.status(200).json(dataBookObj)
  }

  async showTitle (req, res) {
    console.log(req.params.name)
    const data = await Book.findAll({
      where: {
        indexing_group_id: 1,
        phrase: {
          [Op.iLike]: `%${req.params.titulo}%`
        }
      }
    })
    const [Busca] = data
    const bookBusca = await Book.findAll({
      where: {
        record_id: Busca.record_id
      }
    })
    const dataBookArrray = []

    bookBusca.map(valueBook => {
      dataBookArrray.push(valueBook.phrase)
    })

    const [autores, publicacao, titulo, assusto, isbn] = dataBookArrray
    const dataBookObj = {
      autores,
      publicacao,
      titulo,
      assusto,
      isbn
    }

    return res.status(200).json(dataBookObj)
  }

  async showSubject (req, res) {
    const data = await Book.findAll({
      where: {
        indexing_group_id: 4,
        phrase: {
          [Op.iLike]: `%${req.params.assusto}%`
        }
      }
    })
    let codicao = false
    if (false) {
      codicao = true
    }
    const [Busca] = data

    let dataBookObj = ''

    if (codicao) {
      const bookBusca = await Book.findAll({
        where: {
          record_id: Busca.record_id
        }
      })
      const dataBookArrray = []

      bookBusca.map(valueBook => {
        dataBookArrray.push(valueBook.phrase)
      })

      const [autores, publicacao, titulo, assusto, isbn] = dataBookArrray
      dataBookObj = {
        autores,
        publicacao,
        titulo,
        assusto,
        isbn
      }
      return res.status(200).json(dataBookObj)
    } else {
      return res.status(400).json({ awfawf: 'wadawdawd' })
    }
  }
  async showSubject2 (req, res) {
    const data = await Book.findAll({
      where: {
        indexing_group_id: 4,
        phrase: {
          [Op.iLike]: `%${req.params.assusto}%`
        }
      }
    })

    return res.status(200).json(data)
  }
}

module.exports = new BookController()
