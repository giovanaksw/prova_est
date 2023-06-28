const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('prova_est', 'root', 'senai', {
    host: 'localhost', 
    dialect: 'mysql'
}) 

// sequelize.authenticate().then(()=>{
//     console.log('conexão realizadaaa com sucesso vaaamooooo')
// }).catch((error)=>{
//     console.error('não rolou, deixa pra próxima brother' + error)
// })

module.exports = sequelize