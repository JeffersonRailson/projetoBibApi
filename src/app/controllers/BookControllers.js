const Book = require('../models/Book')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class BookController {
  async list (req, res) {
    const dataBooks = await Book.findAll()
    return res.status(200).json(dataBooks)
  }

  async showTitle (req, res) {
    const data = await Book.findAll({
      where: {
        indexing_group_id: 3,
        phrase: {
          [Op.iLike]: `%${req.params.titulo}%`
        }
      }
    })
    const condicao = data[0]
    const arrayObjeto = []
    if (condicao) {
      for (let i = 0; i < data.length; i++) {
        let dataBook = await Book.findAll({
          where: { record_id: data[i].record_id }
        })
        let [autores, publicacao, titulo, assusto, isbn] = dataBook
        let dataBookObj = {
          autores: autores.phrase,
          publicacao: publicacao.phrase,
          titulo: titulo.phrase,
          assusto: assusto.phrase,
          isbn: isbn.phrase
        }
        arrayObjeto.push(dataBookObj)
      }

      return res.status(200).json(arrayObjeto)
    } else {
      return res.status(200).json({ msg: 'sad' })
    }
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
    console.log(!!data[0])
    const condicao = data[0]
    const arrayObjeto = []
    if (condicao) {
      for (let i = 0; i < data.length; i++) {
        let dataBook = await Book.findAll({
          where: { record_id: data[i].record_id }
        })
        let [autores, publicacao, titulo, assusto, isbn] = dataBook
        let dataBookObj = {
          autores: autores.phrase,
          publicacao: publicacao.phrase,
          titulo: titulo.phrase,
          assunto: assusto.phrase,
          isbn: isbn.phrase
        }
        arrayObjeto.push(dataBookObj)
      }

      return res.status(200).json(arrayObjeto)
    } else {
      return res.status(200).json({ msg: 'sad' })
    }
  }

  async snow (req, res) {
    const dataBook = await Book.findAll({ where: { record_id: req.params.id } })
    console.log(dataBook)
    return res.status(200).json(dataBook)
  }
}

module.exports = new BookController()
