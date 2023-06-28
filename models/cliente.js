const { DataTypes } = require('sequelize')
const db = require ('../db/conn')

const Cliente = db.define('Cliente', {
    nome: {
        type: DataTypes.STRING(30)
    },
    idade: {
        type: DataTypes.INTEGER
    }
},{
    createdAt: false,
    updatedAt: false 
})

// Cliente.sync({force:true})

module.exports = Cliente 