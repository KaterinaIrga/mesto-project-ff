export function openModal (elem) {
  elem.classList.toggle('popup_is-opened', true);
  elem.classList.toggle('popup_is-animated', true);
  elem.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalEscape); 
  

  return elem ; 
}

export function closeModal(popup){  
  popup.classList.remove('popup_is-animated'); 
  popup.classList.remove('popup_is-opened'); 

  popup.removeEventListener('click', closeModalOverlay);  
  document.removeEventListener('keydown', closeModalEscape);
}

export function closeModalEscape(e) {
  if(e.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'));
    e.preventDefault();
  }
  //e.preventDefault();
}

export function closeModalOverlay(e){
  if (e.type === 'submit' ||
     (e.target.classList.contains('popup') || e.target.classList.contains('popup__close'))) {
    closeModal(e.currentTarget);    
  }
  e.stopPropagation() ;
}