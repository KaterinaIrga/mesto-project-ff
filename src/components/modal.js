export function openModal (elem, src, title) {
  elem.classList.add('popup_is-opened');
  elem.classList.add('popup_is-animated')

  const popupCloseButton = elem.querySelector('.popup__close');
  const inputName = elem.querySelector('.popup__input_type_name');
  const inputDescription = elem.querySelector('.popup__input_type_description');
  popupCloseButton.addEventListener('click', closeModal);
  elem.addEventListener('click', closeModal); 
  elem.closest('.page').addEventListener('keydown', closeModal);
  if (src) {
    elem.querySelector('.popup__image').src = new URL(src, import.meta.url);
  }
  if (title) {
    elem.querySelector('.popup__caption').textContent = title;
  }
  if (inputName) {
    inputName.placeholder = (typeof inputName !== 'undefined') 
    ? document.querySelector('.profile__title').textContent 
    : inputName.placeholder;
  }
  
  if (inputDescription) {
    inputDescription.placeholder = (typeof inputDescription !== 'undefined') 
    ? document.querySelector('.profile__description').textContent 
    : inputDescription.placeholder;
  } 
  return elem ; 
}

//ToDo: написать функцию, достающую все поля и элементы управления из формы

export function saveData(e) {
  //ToDo: здесь переделать на использование document.forms
  const formElem = e.target.closest('.popup__form');
  switch (formElem.getAttribute('name')) {
    case 'edit-profile': {    
      document.querySelector('.profile__title').textContent = formElem.elements.name.value;
      document.querySelector('.profile__description').textContent = formElem.elements.description.value;
      break;
    }
    case 'new-place': {
      document.querySelector('.card__title').textContent = formElem.elements['place-name'].value;
      document.querySelector('.card__image').src = formElem.elements.link.value;
      document.querySelector('.card__image').alt = formElem.elements['place-name'].value;
      break;
    }
  }   
 e.preventDefault();
 e.stopPropagation() ;
 formElem.reset()
}

export function closeModal(e) {
  const isPopup = e.target.classList.contains('popup_is-opened');
  const isCloseButton = e.target.classList.contains('popup__close');
  const isKeyEscape = (e.key === 'Escape') ;
  const isSaveButton = e.target.classList.contains('popup__button');

  if (isPopup ||  isKeyEscape || isSaveButton || isCloseButton){
    const pageElem = document.querySelector('.page');
    const popupIsOpenedElem = pageElem.querySelector('.popup_is-opened');

    if (e.key === 'Escape') {
      popupIsOpenedElem.classList.remove('popup_is-opened'); 
      popupIsOpenedElem.classList.remove('popup_is-animated'); 
    }
    else if (isSaveButton) {
      saveData(e);      
      e.target.closest('.popup_is-opened').classList.remove('popup_is-animated'); 
      e.target.closest('.popup_is-opened').classList.remove('popup_is-opened'); 
    }
    else {
      e.target.closest('.popup_is-opened').classList.remove('popup_is-animated'); 
      e.target.closest('.popup_is-opened').classList.remove('popup_is-opened'); 
    }

    e.target.removeEventListener('click', closeModal);
    e.target.closest('.page').removeEventListener('keydown', closeModal); 
    } 
  e.stopPropagation() ;
}


