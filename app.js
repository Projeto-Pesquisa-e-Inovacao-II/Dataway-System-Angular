// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var usuariosRouter = require("./dataway-system-back/routes/usuarios");
var notasRoutes = require("./dataway-system-back/routes/notasRoutes");

var createEmployee = require("./dataway-system-back/routes/createEmployee");
var deleteUser = require("./dataway-system-back/routes/deleteUserData")
var getUserData = require("./dataway-system-back/routes/getUserData");
var updateUserData = require("./dataway-system-back/routes/updateUserData");

var getUserConcessoes = require("./dataway-system-back/routes/concessoesUsuario");
//dashboard
var graficoTrafegoEvasao = require("./dataway-system-back/routes/graficoTrafegoEvasao");

//admRoutes
var adm = require("./dataway-system-back/routes/admRoutes");

var notificacoes = require("./dataway-system-back/routes/notificacaoRoutes");

var suport = require("./dataway-system-back/routes/suport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/usuarios", usuariosRouter);

app.use("/get_user_data", getUserData);
app.use("/update_user_data", updateUserData);
app.use("/delete_user_data", deleteUser);
app.use("/create_employee", createEmployee);
app.use("/notas", notasRoutes);
//dashboard
app.use("/grafico_trafego_evasao", graficoTrafegoEvasao);

app.use("/concessoes_usuario", getUserConcessoes);

app.use("/adm", adm);

app.use("/notificacoes", notificacoes);

app.use("/suport-send-email", suport);
console.log("Suporte")
app.listen(PORTA_APP, HOST_APP, function () {
    console.log(`

                                    ####      ##   ######   ##    ##   ##    ##  ###    ###
                                    ## ##    ####    ##    ####   ##   ##   ####  ###  ###
                                    ##  ##  ##  ##   ##   ##  ##  ##   ##  ##  ##   ####
                                    ##  ##  ######   ##   ######  ## # ##  ######    ##
                                    ##  ##  ##  ##   ##   ##  ##  #######  ##  ##    ##
                                    ## ##   ##  ##   ##   ##  ##  ### ###  ##  ##    ##
                                    ####    ##  ##   ##   ##  ##  ##   ##  ##  ##    ##
 
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
