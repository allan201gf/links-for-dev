const express = require("express");
const server = express();
const router = express.Router();

// FS para manipulação de arquivos, no caso .json
const fs = require("fs");

// Puxar dados de formulário para o back-end
const bodyParser = require("body-parser");

server.use(express.json({extended: true}));

// Função para ler arquivo Json com o banco de dados para o sistema
const readFile = () => {
    const content = fs.readFileSync("./links.json", "utf-8")
    return JSON.parse(content)
}

// Função para gravar o arquivo
const writeFile = (currentContent) => {
    const updatefile = JSON.stringify(currentContent)
    fs.writeFileSync("./links.json", JSON.stringify(currentContent), "utf-8")
}

// coneção com o json para exibir os itens na página
const link = require("./links.json");

// dizendo para o express usar o ejs como engine
server.set('view engine', 'ejs');

// os arquivos estaticos ficaram na pasta public
server.use(express.static('public'));

// Body parser
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// Renderização do index
server.get("/", (req, res) => {
    res.render("index", {
        link: link // permite utilizar a constante link dentro da ágina com ejs
    });
})

let failed = false

// Renderiza página de inclusão de itens
server.get("/adicionar", (req, res) => {
    res.render("adicionar", {
        failed: failed
    });
})

// POST para salvar as perguntas no Json
server.post("/salvarpergunta", (req, res) => {
    // coletor dados do form
    const { name, description, link, category } = req.body

    if(name == '' || description == '' || link == '' || category == '') {

        verifica = function() { // Função para comunicar o erro
            return failed = true
        }
        verifica()
        
        // Redireciona para a mesma página para preencher novamente
        res.redirect("/adicionar");

    } else {
    // continua o processo normalmente
    console.log({ name, description, link, category })
    // Lê o Json
    const currentContent = readFile()
    // Gera um valor de id
    const id = Math.floor(Math.random() * 10000);
    // Adiciona os dados do formulário e id no Json
    currentContent.push({id, name, description, link, category })
    // Salva o Json
    writeFile(currentContent)
    //Após salvar, redireciona para a tela inicial 
    res.redirect("/adicionar");
    // reseta variavel do erro
    failed = false
}
});

// Post para deletar um arquivo
server.post("/delete:id", (req, res) => { //faz requisição pelo id
    // salva o id da requisição
    const { id } = req.params;
    // Lê o Json
    const currentContent = readFile();
    // Localiza o item no Json pelo ID
    const selectItem = currentContent.findIndex((item) => item.id === id);
    // Deleta o item do ID selecionado
    currentContent.splice(selectItem, 1);
    // Salva o documento
    writeFile(currentContent);
    // Passa para a página de confirmação
    res.redirect("/redirectdelete");

});

// Renderiza página de confirmação para a execução do js scriptMsgDelete.js
server.get("/redirectdelete", (req, res) => {
    res.render("redirectdelete");
});

server.use(router)

var porta = process.env.PORT || 8080;

// Inicia o servidor
server.listen(porta, () => {
    console.log("Server started successfully")
})
