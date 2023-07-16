import { AxiosRequestConfig, AxiosResponse } from 'axios';

const isDev = true;

export default class Logger {
  static groupLog(title: string, contents: Record<string, any>, isCollapsed = false) {
    if (!isDev) {
      return;
    }
    if (isCollapsed) {
      console.groupCollapsed(`%c ${title}`, 'color: white; background-color: #30D5C8');
    } else {
      console.group(`%c ${title}`, 'color: white; background-color: #30D5C8');
    }
    Object.keys(contents).forEach((key) => {
      console.log(key, contents[key]);
    });
    console.groupEnd();
  }

  static describeRequest(request: AxiosRequestConfig) {
    if (!isDev || !request) {
      return;
    }
    // ------------------------------------------
    console.group('%c WEBSERVICE: REQUEST', 'color: white; background-color: #30D5C8');
    console.log(`BASE URL: ${request.baseURL}`);
    console.log(`URL: ${request.url}`);
    console.log(`METHOD: ${request.method}`);
    // ------------------------------------------
    if (request.params) {
      console.groupCollapsed('PARAMS');
      console.log(request.params);
      console.groupEnd();
    }
    // --------------------------------------------
    console.groupCollapsed('HEADERS');
    console.table(request.headers);
    console.groupEnd();
    // -------------------------------------------
    if (request.data) {
      console.group('BODY');
      console.log(request.data);
      console.log(JSON.stringify(request.data));
      console.groupEnd();
    }
    // --------------------------------------------
    console.groupCollapsed('REQUEST');
    console.log(request);
    console.groupEnd();
    // --------------------------------------------
    console.groupEnd();
  }

  static describeSuccessResponse(response: AxiosResponse) {
    if (!isDev || !response) {
      return;
    }
    // ----------------------------------------------
    console.group('%c WEBSERVICE: RESPONSE', 'color: white; background-color: #30D5C8');
    console.log(`URI: ${response.request._url}`);
    console.log(`STATUS: ${response.status}`);
    console.log(`STATUS TEXT: ${response.statusText}`);
    // ----------------------------------------------
    console.groupCollapsed('REQUEST');
    console.log(response.request);
    console.groupEnd();
    // ----------------------------------------------
    console.groupCollapsed('DATA');
    console.log(response.data);
    console.groupEnd();
    // --------------------------------------------------
    console.groupEnd();
    console.groupCollapsed(JSON.stringify(response.data));
    console.log(response.data);
    console.groupEnd();
  }

  static describeErrorResponse(error: any) {
    if (!isDev || !error) {
      return;
    }
    // -----------------------------------------------------
    console.group('%c Error ', 'color: white; background-color: #D33F49', 'WEBSERVICE: RESPONSE');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const request = error.response.request ?? error.request ?? {};
      console.log(`URI: ${request._url}`);
      console.log(`STATUS: ${error.response.status}`);
      // --------------------------------------------
      console.groupCollapsed('HEADERS');
      console.table({ ...request.headers, ...(error.config.headers ?? {}) });
      console.groupEnd();
      // ------------------------------------------------
      console.groupCollapsed('DATA');
      console.log(error.response.data);
      console.groupEnd();
      // ------------------------------------------------
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(`URI: ${error.request._url}`);
      // --------------------------------------------
      console.groupCollapsed('REQUEST');
      console.log(error.request);
      console.groupEnd();
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(`UNKNOWN ERROR: ${error.message}`);
    }
    // ------------------------------------------------
    console.groupCollapsed('ERROR');
    console.log(error);
    console.groupEnd();
    // ------------------------------------------------
    console.groupCollapsed('CONFIG');
    console.log(error.config);
    console.groupEnd();
    // ------------------------------------------------
    console.groupEnd();
  }
}
