// IMPORTACION DE FETCH
import fetch from 'node-fetch';
let UrlBase = 'http://localhost:8080/';

// FUNCION DE PETICION PARA LOGIN USER
export const loginFetch = (loginObj) => {
  let Url = UrlBase + 'login';
  return fetch(Url, {
    method: 'POST',
    body: JSON.stringify(loginObj),
    headers: { 'content-type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Confirmar email y contraseña');
    }
    return response.json();
  });
};

// FUNCION PARA GUARDAR USUARIO LOGUEADO EN SESSIONSTORAGE
export const saveLoginUser = (user) => {
  return sessionStorage.setItem('user', JSON.stringify(user));
};

// FUNCION DE PETICION PRODUCTOS
export const productFetch = (token) => {
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
export const onlyProductFetch = (token, productId) => {
  let Url = UrlBase + 'products/' + productId;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer un solo producto');
    }
    return response.json();
  });
};

// FUNCION DE PETICION PARA REALIZAR PEDIDO
export const orderFetch = (token, orderObj) => {
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
export const totalOrdersFetch = (token) => {
  let Url = UrlBase + 'orders';
  return fetch(Url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al traer pedidos');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO EN 'cooked'
export const statusCookedFetch = (orderId, token) => {
  let Url = UrlBase + 'orders/' + orderId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(
      {
        'status': '',
        'cooked': true
      }),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al cambiar status de cook del pedido');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO EN 'status'
export const statusDeliveredFetch = (orderId, token, finalDate) => {
  let Url = UrlBase + 'orders/' + orderId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(
      {
        'status': 'delivered',
        'dateProcessed': finalDate
      }),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al cambiar status delivered del pedido');
    }
    return response.json();
  });
};
