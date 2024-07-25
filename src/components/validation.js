const emptyNameError = 'data-empty-error';
const contentNameError = 'data-content-error';
const typeValueError = 'data-type-error';
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_inactive',
  inputErrorClass: '.popup__input-border-error',
  errorClass: '.popup__input-error'
};

function setEventListeners(formElement) {
  Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    .forEach(input => {
      input.addEventListener('blur', (e)=> {isValid(input); toggleButtonState(formElement)});
      input.addEventListener('change', () => {isValid(input); toggleButtonState(formElement)});
      input.addEventListener('input', () => {
        isValid(input); toggleButtonState(formElement)});      
     }
  )
}

export function toggleButtonState(formElem) {
  const buttonElem = formElem.querySelector(validationConfig.submitButtonSelector);

  if (hasInvalidInput(formElem)) {
    buttonElem.disabled = true;
    buttonElem.classList.add(validationConfig.inactiveButtonClass.slice(1));
  } else {
    buttonElem.disabled = false;
    buttonElem.classList.remove(validationConfig.inactiveButtonClass.slice(1));
  };
}

export function enebleValidation() {
  const formList = Array.from(document.forms);
  formList.forEach(form => {setEventListeners(form);
  });  
}

function hasInvalidInput(formElement) {
  return Array.from(formElement.elements).some(input => {return !input.validity.valid});
}

export function clearValidation (formForValidation, Config = validationConfig ) {  
  Array.from(formForValidation.querySelectorAll(Config.errorClass)).forEach(item => {
    hideInputError(formForValidation, item);
    item.textContent = ''; 
  });

  Array.from(formForValidation.querySelectorAll(Config.inputErrorClass))
    .forEach(item => {item.classList.remove(Config.inputErrorClass.slice(1))});  
  toggleButtonState(formForValidation);
}

function isValid(inputElement){
  if(inputElement.validity.valid) {
    hideInputError(inputElement);
  } else {
    showInputError(inputElement);
  }
}

//делаем элемент ошибки видимым, текст ошибки из дата-атрибута устанавливаем в элемент сообщения об ошибке
function showInputError(inputElement) {
  const errorElement = document.getElementById(`popup__input-${inputElement.getAttribute('name')}-error`); 
  if (inputElement.value === '') {
    const errorName = emptyNameError;
    errorElement.textContent =  inputElement.getAttribute(errorName) ;
    errorElement.classList.add(validationConfig.inputErrorClass.slice(1));
    inputElement.classList.add(validationConfig.errorClass.slice(1));
  } else if (inputElement.validity.typeMismatch) {
    const errorName = typeValueError;
    errorElement.textContent =  inputElement.getAttribute(errorName) ;
    errorElement.classList.add(validationConfig.inputErrorClass.slice(1));
    inputElement.classList.add(validationConfig.errorClass.slice(1));
  } else if (inputElement.validity.patternMismatch) {
    const errorName = contentNameError;
    errorElement.textContent = inputElement.getAttribute(errorName) ;
    errorElement.classList.add(validationConfig.inputErrorClass.slice(1));
    inputElement.classList.add(validationConfig.errorClass.slice(1));
  } else if (inputElement.validity.tooLong || inputElement.validity.tooShort) {    
    errorElement.textContent =inputElement.getAttribute('data-long-short-error');
    errorElement.classList.add(validationConfig.inputErrorClass.slice(1));
    inputElement.classList.add(validationConfig.errorClass.slice(1));
  }  
}

function hideInputError(inputElement) {
  const errorElement = document.getElementById(`popup__input-${inputElement.getAttribute('name')}-error`);
  if (errorElement) {    
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.inputErrorClass.slice(1));
  }  
  inputElement.classList.remove(validationConfig.errorClass.slice(1));
}
