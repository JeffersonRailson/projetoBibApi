const Biblio = require('../models')

class BiblioAllController {
  async storeBiblioRecords (req, res) {
    const createBiblioRecords = await Biblio.BiblioRecords.create({
      ...req.body
    })
    return res.status(200).json({
      msg: 'Livro criado com sucesso!',
      createBiblioRecords
    })
  }

  async storeBiblioHoldings (req, res) {
    const createBiblioHoldings = await Biblio.BiblioHoldings.create({
      ...req.body
    })
    return res.status(200).json({
      msg: 'Exemplar criado com sucesso!',
      createBiblioHoldings
    })
  }

  async listBiblioRecords (req, res) {
    const biblioRecordsAll = await Biblio.BiblioRecords.findAll()
    return res.status(200).json({
      msg: 'Listando todas os livros cadastrados',
      biblioRecordsAll
    })
  }
  async listBiblioHoldings (req, res) {
    const biblioRecordsAll = await Biblio.BiblioHoldings.findAll()
    return res.status(200).json(biblioRecordsAll)
  }

  async Teste (req, res) {
    const dataBiblioHoldings = await Biblio.BiblioHoldings.findOne({
      where: { id: 13 }
    })
    return res.status(200).json(dataBiblioHoldings)
  }
}

module.exports = new BiblioAllController()
