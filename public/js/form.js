class ValidaFormulario {
    constructor(){
        this.formulario = document.querySelector('.formulario'); //seleciona o formulário
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e); //chama a função para liberar o formulário se estiver tudo ok
        });
    }

    handleSubmit(e) {
        e.preventDefault(); // evita o envio do formulário ao clicar no botão
        const camposValidos = this.camposSaoValidos();

        if (camposValidos) { //verifica se os campos são validos
            alert('Formulário enviado');
            this.formulario.submit(); // Envia o formulário caso o campo seja válido
        }
    }

    camposSaoValidos () {
        let valid = true;
        for(let errorText of this.formulario.querySelectorAll('.error-text')) { // Remover a mensagem de erro anterior
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            
        }
    }




}

const valida = new ValidaFormulario();