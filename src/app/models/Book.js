const Sequelize = require('sequelize')
const db = require('../../config/database')
const Book = db.define(
  'biblio_idx_sort',
  {
    record_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    indexing_group_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    phrase: Sequelize.STRING,
    ignore_chars_count: Sequelize.INTEGER
  },

  {
    timestamps: false,
    schema: 'single',
    tableName: 'biblio_idx_sort'
  }
)
module.exports = Book
