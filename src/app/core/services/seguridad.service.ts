import { Injectable } from "@angular/core";
declare var require: any;
import * as CryptoJS from "crypto-js";
const AES = CryptoJS.AES;
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})

/**
 * @classdesc Container class of security services.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */
export class SeguridadService {
  constructor() {}


  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @returns {String} Hash sha256 of the entered JSON.
   * @desc This method is in charge of generating the sha256 hash of the JSON that is entered as an argument, proceeds to loop through it and store it as a string to later generate the respective hash. <br> Creation Date: 08/07/2020
   * @param {Any} json JSON to calculate the hash.
   */
  public hashJSON(json: any) {
    let data: string = "";
    // tslint:disable-next-line: prefer-const
    for (let clave in json) {
      if (json.hasOwnProperty(clave)) {
        data += clave + ":" + json[clave] + ",";
      }
    }
    return CryptoJS.SHA256(data).toString();
  }


  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @returns {String} Hash sha256 of the entered JSON.
   * @desc This method is in charge of generating the sha256 hash of the user password. <br> Creation Date: 08/07/2020
   * @param {Any} json JSON contains password.
   */
  public generarHashClave(clave: string) {
    return CryptoJS.SHA256(clave).toString();
  }

  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @returns {String} Encrypted string.
   * @desc It generates an AES encryption of the entered string for its later return and additional processing, we proceed to replace the incompatible characters to be sent in the URL. <br> Creation Date: 08/07/2020
   * @param {String} cadena string to encrypt.
   */

  public encriptar(cadena: string) {
    const clave = environment.secretEncryp;
    return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
  }


  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @returns {String} Decrypted string.
   * @desc Decrypts the string that is entered as an argument to transform it into plain text after its processing and regression to the normal AES because the string enters replaced with some characters. <br> Creation Date: 08/07/2020
   * @param {String} cadena string to decrypt.
   */
  public desencriptar(cadena: string) {
    const clave = environment.secretEncryp;
    const cade = cadena.replace(/-/gi, "/");
    const bytes = AES.decrypt(cade, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
