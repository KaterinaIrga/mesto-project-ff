const authorization = '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac';
const baseUrl = 'https://nomoreparties.co/v1/pwff-cohort-1/';

function handleResponse(res) {
  if (res.ok) 
    {return res.json();}
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = function() {
  return fetch(`${baseUrl}users/me`, {
    method: 'GET', 
    headers: {
      authorization: authorization
    }
  })
  .then(handleResponse)
}

export function switchLikesForCard(idCard, like) {  
  const fetchMethod = like ? 'DELETE' : 'PUT';
  return fetch(`${baseUrl}cards/likes/${idCard}`, {
    method: fetchMethod,
    headers: {
      authorization: authorization
    }
  })
    .then(handleResponse)
}

export const getCardsData = function() {

  return fetch(`${baseUrl}cards`, {
    method: 'GET',
    headers: {
      authorization: authorization 
    }
  })
  .then(handleResponse)
}

export function setUserAvatar(avatarLink) {
  return fetch(`${baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(handleResponse)
}

export function checkAvatarLink(avatarLink) {
  return fetch(avatarLink, {
    method: 'HEAD'
  })
  .then(res => {if (res.ok) {return res.headers.get('content-type')} })
}

export function getCardData(idCard) {
  return fetch(`${baseUrl}cards/${idCard}`, {
    method: 'GET',
    headers: {
      authorization: authorization 
    }
  })
  .then(handleResponse)
}

export function saveNewCardData(CardData) {
  return fetch(`${baseUrl}cards`, {
    method:'POST',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: CardData.name,
      link: CardData.link
    })
  })
  .then(handleResponse)
}

export function saveProfileData(name, description) {
  return fetch(`${baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(handleResponse)
}

export function dropCard(idCard) {
  return fetch(`${baseUrl}cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: authorization,
    }
  })
  .then(handleResponse)  
}