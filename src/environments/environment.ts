// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyAiPTePHyltKbiZeyXkuzMHQCfOVSz_Ezo",
    authDomain: "omi-y-pali-80d1d.firebaseapp.com",
    databaseURL: "https://omi-y-pali-80d1d.firebaseio.com",
    projectId: "omi-y-pali-80d1d",
    storageBucket: "omi-y-pali-80d1d.appspot.com",
    messagingSenderId: "1021916524711",
    appId: "1:1021916524711:web:53ad66cdb16967169eeb82",
    measurementId: "G-0WPXHE9SG1"
  },
  nombresColecciones: 
  {
    promociones: "promociones",
    producto: "producto"
  },
  estados: {
    activo: "A",
    inactivo: "I",
    anulado: "AN"
  }
};
