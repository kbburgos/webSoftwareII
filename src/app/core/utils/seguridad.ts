declare var require: any;
const crypto = require("crypto");
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
import { environment } from "../../../environments/environment";

/**
 * @classdesc Container class of api request security functions.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */

export class Seguridad {
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

  static hashJSON(json: any) {
    let data: string = "";
    // tslint:disable-next-line: prefer-const
    for (let clave in json) {
      if (json.hasOwnProperty(clave)) {
        data += clave + ":" + json[clave] + ",";
      }
    }
    return crypto.createHash("sha256").update(data).digest("hex");
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

  public static encriptar(cadena: string) {
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

  public static desencriptar(cadena: string) {
    const clave = environment.secretEncryp;
    const cade = cadena.replace(/-/gi, "/");
    const bytes = AES.decrypt(cade, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
