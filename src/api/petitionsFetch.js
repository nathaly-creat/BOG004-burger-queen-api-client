// IMPORTACION DE FETCH
let UrlBase = 'http://localhost:8080/';

// FUNCION DE PETICION PARA LOGIN USER
export const loginPetition = (loginObj) => {
  let Url = UrlBase + 'login';
  return fetch(Url, {
    method: 'POST',
    body: JSON.stringify(loginObj),
    headers: { 'content-type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Confirmar email y contraseña');
    } else {
      return response.json();
    }
  });
};

// FUNCION PARA GUARDAR USUARIO LOGUEADO EN SESSIONSTORAGE
export const saveLoginUser = (user) => {
  return sessionStorage.setItem('user', JSON.stringify(user));
};

// FUNCION DE PETICION PRODUCTOS
export const productPetition = (token) => {
  let Url = UrlBase + 'products';
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer productos');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA UN SOLO PRODUCTO
export const onlyProductPetition = (token, productId) => {
  let Url = UrlBase + 'products/' + productId;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer el producto solicitado');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA REALIZAR PEDIDO
export const orderPetition = (token, orderObj) => {
  let Url = UrlBase + 'orders';
  return fetch(Url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(orderObj),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error de creacion orden');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PEDIDOS ORDENADOS
export const totalOrdersPetition = (token) => {
  let Url = UrlBase + 'orders';
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer pedidos ordenados');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO a'delivering'
export const statusDeliveringPetition = (orderId, token) => {
  let Url = UrlBase + 'orders/' + orderId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      status: 'delivering',
    }),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al cambiar status de pending a delivering del pedido');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO a 'delivered'
export const statusDeliveredPetition = (orderId, token, finalDate) => {
  let Url = UrlBase + 'orders/' + orderId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      status: 'delivered',
      dateProcessed: finalDate,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw Error(
        'Error al cambiar status de delivering a delivered del pedido'
      );
    }
    return response.json();
  });
};

// FUNCION DE PETICION USUARIOS
export const usersPetition = (token) => {
  let Url = UrlBase + 'users';
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer usuarios');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA CREAR USUARIOS
export const createUserPetition = (token, userObj) => {
  let Url = UrlBase + 'users';
  return fetch(Url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(userObj),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al crear usuario');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA ACTUALIZACION USUARIOS
export const updateUserPetition = (userId, token, userObj) => {
  let Url = UrlBase + 'users/' + userId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(userObj),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al actualizar usuario');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA ELIMINAR USUARIO
export const deleteUserPetition = (userId, token) => {
  let Url = UrlBase + 'users/' + userId;
  return fetch(Url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al eliminar usuario');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA CREAR PRODUCTOS
export const createProductPetition = (token, productObj) => {
  let Url = UrlBase + 'products';
  return fetch(Url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(productObj),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al crear producto');
    }
    return response.json();
  });
};