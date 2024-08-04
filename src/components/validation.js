import {saveData, saveTest, changeButtonContent} from '../index.js';
import {closeModal} from './modal.js';
const contentNameError = 'data-content-error';

function setEventListeners(formElement, config) {
  formElement.querySelectorAll(`.${config.inputSelector}`)
    .forEach(input => {
      input.addEventListener('blur', (e)=> {
                                              isValid(formElement, input, config); 
                                              toggleButtonState(formElement, config)
                                            });
      input.addEventListener('change', () => {
                                                isValid(formElement, input, config); 
                                                toggleButtonState(formElement, config)
                                              });
      input.addEventListener('input', () => { 
                                              isValid(formElement, input, config); 
                                              toggleButtonState(formElement, config)
                                            });      
     }
  )
  formElement.addEventListener('submit',  saveData);
}


export function toggleButtonState(formElem, config) {
  const buttonElem = formElem.querySelector(`.${config.submitButtonSelector}`);

  if (hasInvalidInput(formElem)) {
    buttonElem.disabled = true;
    buttonElem.classList.add(config.inactiveButtonClass);
  } else {
    buttonElem.disabled = false;
    buttonElem.classList.remove(config.inactiveButtonClass);
  };
}

export function enableValidation(config) {
  const formList = document.querySelectorAll(`.${config.formSelector}`);
  formList.forEach(form => {
                              setEventListeners(form, config);
                              toggleButtonState(form, config);
  });  
}

function hasInvalidInput(formElement) {
  return Array.from(formElement.elements).some(input => {return !input.validity.valid});
}

export function clearValidation (formForValidation, config ) {  
  formForValidation.querySelectorAll(`.${config.inputErrorClass}`)
  .forEach(item => {
    item.classList.remove(config.inputErrorClass);
    hideInputError(formForValidation, item, config);
    toggleButtonState(formForValidation, config);
  });     
}

function isValid(formForValidation, inputElement, config){
  if(inputElement.validity.valid) {
    hideInputError(formForValidation, inputElement, config);
  } else {
    const errorMessage = inputElement.validity.patternMismatch 
                         ? inputElement.getAttribute(contentNameError) 
                         : inputElement.validationMessage;
    showInputError(formForValidation, inputElement, errorMessage, config); 
  }
}

//делаем элемент ошибки видимым, текст ошибки из дата-атрибута устанавливаем в элемент сообщения об ошибке
function showInputError(formForValidation, inputElement, errorMessage, config) {
  let i =1;
  console.log(`showInputError ${i++}`)

  const errorElement = document.getElementById(`popup__input-${inputElement.getAttribute('name')}-error`); 

  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
  
}

function hideInputError(formForValidation, inputElement, config) {
  const errorElement = document.getElementById(`popup__input-${inputElement.getAttribute('name')}-error`);
  if (errorElement) {    
    errorElement.textContent = '';
    
  }  
  inputElement.classList.remove(config.inputErrorClass);
}
