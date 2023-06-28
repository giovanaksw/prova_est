const express = require ('express')
const app = express()
const exphbs = require ('express-handlebars')
const conn = require ('./db/conn')
const Cliente = require ('./models/Cliente')

const PORT = 3000
const hostname = 'localhost'

//-------------------config express
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//-------------------config express-handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())
//-------------------atualizar
app.post('/atualizar', async(req,res)=>{
    const id= req.body.id
    const nome = req.body.nome
    const idade = Number(req.body.idade)
    console.log(id,nome,idade)
    let msg = 'Tipo de dados inválidos, digite novamente'
    let msg2 = 'Dados cadastrados!'
    let msg3 = 'Cliente não encontrado na base de dados para atualizar'

    const dado_nome = await Cliente.findOne({raw:true, where: {nome:nome}})
    // console.log(dado_nome)

    if(dado_nome != null){
        const dados = {
            id: id,
            nome: nome,
            idade: idade,
        }
        if((typeof id ==='Number')&&(typeof nome ==='string')&&(typeof idade ==='number')){
            await Cliente.update(dados, {where: {nome:nome}})
            console.log(msg2)
            res.render('atualiza', {msg2})
        }else{
            console.log(msg)
            res.render('atualiza', {msg})
        }
    }else{
        console.log(msg)
        res.render('atualiza', {msg3})
    }
    // res.redirect('/atualizar')
})
app.get('/atualizar', (req,res)=>{
    res.render('atualiza')
})
//-------------------listar
app.post('/listar', async(req,res)=>{
    const dados = await Cliente.findAll({raw:true})
    console.log(dados)
    res.render('lista', {dados})
})
app.get('/listar', (req,res)=>{
    res.render('lista')
})
//-------------------
app.get('/', (req,res)=>{
    res.render('home')
})
//-------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`foooii familia, vou tirar A ${hostname}:${PORT}`)})
}).catch((error)=>{
    console.error(`vish vou reprovar familia`)
})
