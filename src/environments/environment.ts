// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAiPTePHyltKbiZeyXkuzMHQCfOVSz_Ezo",
    authDomain: "omi-y-pali-80d1d.firebaseapp.com",
    databaseURL: "https://omi-y-pali-80d1d.firebaseio.com",
    projectId: "omi-y-pali-80d1d",
    storageBucket: "omi-y-pali-80d1d.appspot.com",
    messagingSenderId: "1021916524711",
    appId: "1:1021916524711:web:53ad66cdb16967169eeb82",
    measurementId: "G-0WPXHE9SG1",
  },
  nombresColecciones: {
    promociones: "promociones",
    producto: "producto",
    pedido: "pedido",
    repartidor: "repartidor",
    categorias: "categorias",
    novedadesRepartidor: "novedadesRepartidor",
  },
  estados: {
    activo: "A",
    inactivo: "I",
    anulado: "AN",
  },
  rutas: {
    urlLogin: "https://omipalisf2.herokuapp.com/api/login/usuario",
    refresh: "https://omipalisf2.herokuapp.com/api/login/token",
    urlToken: "https://omipalisf2.herokuapp.com/api/login/token",
    logOut: "https://omipalisf2.herokuapp.com/api/login/reject",
    usuarioXid: "https://omipalisf2.herokuapp.com/api/usersS/",
    usersS: "https://omipalisf2.herokuapp.com/api/usersS/",
    novedades: "https://omipalisf2.herokuapp.com/api/noveltys/",
    createPedidos: "https://omipalisf2.herokuapp.com/api/orders/post",
    getPedidos: "https://omipalisf2.herokuapp.com/api/orders/getAll",
    createCompras: "https://omipalisf2.herokuapp.com/api/purchase/post",
    getCompras: "https://omipalisf2.herokuapp.com/api/purchase/getCompras",
    deleteUser: "https://omipalisf2.herokuapp.com/api/usersS/",
  },

  secretEncryp:
    "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a",
  secretToken:
    "7187ba3735b821b9ae7bd7d5dd98b61a07ec2e9cef2aad92b97a4ed6080290e6",

  keyCrypto: "abcdefghijklmnopqrstuvwxyz123456789",
  urlGetUser: "https://omipalisf2.herokuapp.com/api/usersS/",
  urlToken: "https://omipalisf2.herokuapp.com/api/login/token",
  //usuarioXid : "https://omipalisf2.herokuapp.com/api/usersS/",
  usersS: "https://omipalisf2.herokuapp.com/api/usersS/",

  variables: {
    usuariosSistema: [],
    clientesNovedades: [],
    pedidosClientes: [],
    usuarioL: {},
    clientes:[],
    repartidores:[]
  },
};
