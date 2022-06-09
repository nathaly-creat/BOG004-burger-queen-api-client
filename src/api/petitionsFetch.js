// IMPORTACION DE FETCH
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
      throw Error('Error al traer el producto solicitado');
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
      throw Error('Error al traer pedidos ordenados');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO a'delivering'
export const statusDeliveringFetch = (orderId, token) => {
  let Url = UrlBase + 'orders/' + orderId;
  return fetch(Url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      status: 'delivering'
    }),
  }).then((response) => {
    if (!response.ok) {
      throw Error('Error al cambiar status de pending a delivering del pedido');
    }
    return response.json();
  });
};

// FUNCION DE PETICION CAMBIO DE ESTADO a 'delivered'
export const statusDeliveredFetch = (orderId, token, finalDate) => {
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
      throw Error('Error al cambiar status de delivering a delivered del pedido');
    }
    return response.json();
  });
};
