import constantUtils from "./ConstantUtils";
import WebService from "./WebService";
import functionUtils from "./FunctionUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TAG = "ApiUtils";

class ApiUtils {
  static headers() {
    return {
      "Content-Type": "multipart/form-data",
    };
  }

  static headersForPav() {
    return {
      "API-KEY": "799c70fd-9be0-465d-89e3-7230de7ec9d3",
      "Content-Type": "application/json",
    };
  }

  static XDomain(domain) {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      "X-DOMAIN": domain,
    };
  }

  static headertoken = async () => {
    const token = await AsyncStorage.getItem(constantUtils.USER_TOKEN);
    return {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
  }

  static get(route) {
    return this.webserviceExplorer(route, null, "GET");
  }

  static getExAPIData(fullUrl) {
    return this.webserviceExplorerExApi(fullUrl, null, "GET");
  }

  static postExAPIData(params) {
    return this.webserviceExplorerPAVExApi(params, null, "POST");
  }

  static getWithToken(route, token) {
    return this.webserviceWithToken(route, null, token, "GET");
  }

  static getWithTokenPaginationList(route, token) {
    return this.webserviceWithTokenForPagination(route, null, token, "GET");
  }

  static put(route, params) {
    return this.webserviceExplorer(route, params, "PUT");
  }

  static post(route, params) {
    return this.webserviceExplorer(route, params, "POST");
  }

  static postwithtoken(route, params) {
    return this.webserviceExplorerwithToken(route, params, "POST");
  }
  static postWithXdomin(route, params) {
    return this.webserviceExplorer(route, params, "POST", true);
  }

  static postWithToken(route, params, token) {
    return this.webserviceWithToken(route, params, token, "POST");
  }

  // static postImageWithToken(route, params, token) {
  //   return this.imageWebServiceWithToken(route, params, token, "POST");
  // }

  static delete(route, params) {
    return this.webserviceExplorer(route, params, "DELETE");
  }

  static async webserviceExplorerExApi(route, params, verb, isExDomain) {
    let options = {
      method: verb,
      headers: ApiUtils.headers(),
      body: params,
    };
    return fetch(route, options)
      .then((resp) => {
        let json = resp.json();
        if (resp.ok) {
          return json;
        }
        return json.then((err) => {
          console.log("error :", err);
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }

  static async webserviceExplorerPAVExApi(params, type, verb, isExDomain) {
    let baseUrl = WebService.PAV_BASE_URL;
    let options = {
      method: verb,
      headers: ApiUtils.headersForPav(),
      body: params,
    };
    return fetch(baseUrl, options)
      .then((resp) => {
        let json = resp.json();
        if (resp.ok) {
          return json;
        }
        return json.then((err) => {
          console.log("error :", err);
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }

  static async webserviceExplorer(route, params, verb, isExDomain) {
    const host = WebService.BASE_URL;
    const url = `${host}${route}`;
    let options = {
      method: verb,
      headers: ApiUtils.headers(),
      body: params,
    };
    console.log(TAG, "url : ", url);
    console.log(TAG, "options================== :", options);
    return fetch(url, options)
      .then((resp) => {
        let json = resp.json();
        console.log(TAG, "json=============== : ", json);

        if (resp.ok) {
          console.log(TAG, "json2=============== : ", json);
          return json;
        }
        return json.then((err) => {
          console.log("error :", err);
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }

  static async webserviceExplorerwithToken(route, params, verb) {
   
    const host = WebService.BASE_URL;
    const url = `${host}${route}`;

    let options = {
      method: verb,
      headers: await ApiUtils.headertoken(),
      body: params,
    }
    
    return fetch(url, options)
    .then(response => response.json())  // promise
    .then(json => {
      return json
    })
  }
  
  // static async imageWebServiceWithToken(route, params, token, verb) {
  //   var user_token = await PreferenceManager.getPreferenceValue(
  //     PreferenceKey.USER_TOKEN
  //   );
  //   var xDomain = await PreferenceManager.getPreferenceValue(
  //     PreferenceKey.XDOMAIN
  //   );
  //   console.log("user_token :: ", user_token);
  //   const host = WebService.BASE_URL;
  //   const url = `${host}${route}`;
  //   let options = {
  //     method: verb,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //       Authorization: "Bearer " + user_token,
  //       'X-DOMAIN': xDomain,
  //     },
  //     body: params,
  //   };
  //   // console.log(TAG, "url : ", url);
  //   // console.log(TAG, "method : ", options.method);
  //   // console.log(TAG, "headers : ", JSON.stringify(options.headers));
  //   // console.log(TAG, "body : ", JSON.stringify(options.body));
  //   return fetch(url, options)
  //     .then((resp) => {
  //       console.log('Response', resp);
  //       let json = null;
  //       json = resp.json();
  //       if (resp.ok) {
  //         console.log('resp.ok', json);
  //         return json;
  //       }
  //       return json.then((err) => {
  //         console.log('error:', err);
  //         throw err;
  //       });
  //     })
  //     .then((json) =>  console.log('error: json', json));
  // }

  static async webserviceWithToken(route, params, token, verb) {
    const host = WebService.BASE_URL;
    const url = `${host}${route}`;

    let options = {
      method: verb,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: params,
    };
    console.log(TAG, "url : ", url);
    console.log(TAG, "method : ", options.method);
    console.log(TAG, "headers : ", JSON.stringify(options.headers));
    console.log(TAG, "body : ", JSON.stringify(options.body));
    return await fetch(url, options)
      .then((resp) => {
        let json = null;
        if (route == WebService.DOWNLOAD_DATA) {
          json = resp.blob();
        } else {
          json = resp.json();
        }

        if (resp.ok) {
          console.log("API utills response 1 -- >", json);

          return json;
        }
        return json.then((err) => {
          console.log("error :", err);
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }

  static async webserviceWithTokenForPagination(route, params, token, verb) {
    console.log("user_token :: ", user_token);
    const url = `${route}`;

    let options = {
      method: verb,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: params,
    };
    console.log(TAG, "application url : ", url);
    console.log(TAG, "method : ", options.method);
    console.log(TAG, "headers : ", JSON.stringify(options.headers));
    console.log(TAG, "body : ", JSON.stringify(options.body));
    return await fetch(url, options)
      .then((resp) => {
        let json = null;
        if (route == WebService.DOWNLOAD_DATA) {
          json = resp.blob();
        } else {
          json = resp.json();
        }

        if (resp.ok) {
          console.log("API utills response 1 -- >", json);

          return json;
        }
        return json.then((err) => {
          console.log("error :", err);
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }
}

export default ApiUtils;