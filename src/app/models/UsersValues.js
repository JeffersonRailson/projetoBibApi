const Sequelize = require('sequelize')

const User = require('./User')
const db = require('../../config/database')
const UserValues = db.define(
  'users_values',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    key: Sequelize.STRING,
    value: Sequelize.STRING,
    ascii: Sequelize.STRING
  },
  {
    timestamps: false,
    schema: 'single',
    references: {
      model: 'users',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
)
module.exports = UserValues
