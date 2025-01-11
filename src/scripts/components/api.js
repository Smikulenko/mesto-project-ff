const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: '980fa1fd-2ebe-4410-8278-1d5afb838cad',
    'Content-Type': 'application/json'
  }
}
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    method: 'GET',
    headers: config.headers

  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })

}
export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const updateUser = (name,job) => {
  return fetch(`${config.baseUrl}/users/me`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    })
  })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
})  
}

export const addCard = (namePlace,linkPlace) => {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: namePlace,
      link: linkPlace,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})  
}

export const deleteCardApi = (cardID) =>{
  return fetch(`${config.baseUrl}/cards/${cardID}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})  
}
export const addLike = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method:'PUT',
    headers:config.headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})  
}
export const removeLike = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method:'DELETE',
    headers:config.headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})  
}

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method:'PATCH',
    headers:config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })  
}