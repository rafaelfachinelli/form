class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', event => {
      this.handleSubmit(event);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const validFields = this.isValidFields();
    const validPasswords = this.isValidPassword();

    if(validFields && validPasswords) {
      alert('Formulário Enviado.');
      this.formulario.submit();
    }
  }

  isValidPassword() {
    let valid = true;

    const passwordElement = this.formulario.querySelector('.senha');
    const passwordRepeatElement = this.formulario.querySelector('.repetir-senha');

    if(passwordElement.value !== passwordRepeatElement.value) {
      valid = false;
      this.createError(passwordElement, 'Campos senha e repetir senha precisam ser iguais.');
      this.createError(passwordRepeatElement, 'Campos senha e repetir senha precisam ser iguais.');
    }

    if (passwordElement.value.length < 6 || passwordElement.value.length > 12) {
      valid = false;
      this.createError(passwordElement, 'Senha precisa estar entre 6 e 12 caracteres.');

    }

    return valid;
  }

  isValidFields() {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }
    
    for(let field of this.formulario.querySelectorAll('.validar')) {
      const label = field.previousElementSibling.innerText; 
      if(!field.value) {
        this.createError(field, `O campo ${label} não pode estar vazio.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.validaCPF(field)) valid = false;
      }

      if(field.classList.contains('usuario')) {
        if(!this.validaUsuario(field)) valid = false;
      }
    }

    return valid;
  }

  validaUsuario(field) {
    const usuario = field.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Usuário precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if(!cpf.validar()) {
      this.createError(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  createError(field, message) {
    const div = document.createElement('div');
    div.innerText = message;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulario();