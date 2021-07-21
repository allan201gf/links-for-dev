// Este JS serve apenas para redirecionar o usuario para a tela inicial após a mensagem que o arquivo foi deletado

const redirect = confirm("arquivo deletado");

console.log(redirect)

if (redirect == true || redirect == false) {

window.location.href = "/";

}