import {closeModalOverlay, closeModalEscape} from '../index.js';


export function openModal (elem) {
  elem.classList.toggle('popup_is-opened', true);
  elem.classList.toggle('popup_is-animated', true);
  elem.addEventListener('click', closeModalOverlay);
  elem.closest('.page').addEventListener('keydown', closeModalEscape); 

  return elem ; 
}

export function closeModal(popup){  
  popup.classList.remove('popup_is-animated'); 
  popup.classList.remove('popup_is-opened'); 

  popup.removeEventListener('click', closeModalOverlay);
  popup.closest('.page').removeEventListener('keydown', closeModalEscape);   
}

