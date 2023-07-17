import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {toBase64} from 'js-base64';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {AppEmitter} from '.';
import account from '../stores/account';
import {deviceInformation} from '../stores/deviceInfo';
import {Generator, Logger} from '../utils';
import * as RootNavigation from '../utils/rootNavigation';
import {utils} from '../utils';
import {mappingErrorResponse} from './helpers';
import {getData, storeData} from './localStorage';
import url from './url';

let isLogout = false;
let guid: string | null = null;
let uuid: string | null = null;

// const basicAuth = envs.BASIC_URL_API;
const basicAuth = process.env['SERVER_URL'];

const Remote = axios.create({
  baseURL: envs.BASE_URL_API,
  timeout: envs.TIME_OUT,
});
const checkLogout = async (): Promise<void> => {
  console.log('checkLogout', isLogout);
  if (!isLogout) {
    isLogout = true;
    await account?.logoutAccount();
    RootNavigation.navigate(url.screen.launcher);
  }
};

const handleRefresh401 = async (): Promise<null> => {
  await checkLogout();
  return null;
};

const handleSuccess = async (response: any) => {
  Logger.describeSuccessResponse(response);
  if (response) {
    response = utils.transform(response);
  }
  try {
    const {httpMetric} = response.config.metadata ?? {};
    httpMetric?.setHttpResponseCode(response?.status ?? 999);
    httpMetric?.setResponseContentType(
      response?.headers['content-type'] ?? 'unknow content-type',
    );
    await httpMetric?.stop();
  } catch (e) {
    Logger.groupLog('[indexAPI] handleSuccess httpMetric', {error: e});
  }

  if (
    response.config.url.indexOf(url.login) !== -1 ||
    response.config.url.indexOf(url.refreshToken) !== -1
  ) {
    return response.data;
  }

  const respStatus = response.status;
  if (respStatus === 200) {
    console.log('request success');
  }
  if (respStatus === 202) {
    console.log('request accepted');
  }
  if (respStatus === 204) {
    console.log('request processing');
  }
  return {
    ...response.data,
    code: [200, 204].includes(respStatus) ? 200 : respStatus,
  };
};

/**
 * 301: REQUEST MOVED PERMANENTLY
 * 400: BAD REQUEST
 * 401: UNAUTHORIZED
 * 403: FORBIDDEN
 * 404: NOT_FOUND
 * 409: Request Conflict
 * 500: Internal Server Error
 */
const handleError = async (error: any): Promise<any> => {
  Logger.describeErrorResponse(error);
  const originalRequest = error?.config;
  if (originalRequest?.url.endsWith(url.refreshToken)) {
    return handleRefresh401();
  }

  const formattedError = mappingErrorResponse(error);
  Logger.groupLog('[indexAPI] handleError', {error: formattedError});
  if (formattedError.data === 'FORCE_UPDATE') {
    AppEmitter.emit('forceUpdate');
    return null;
  }
  return Promise.reject(formattedError);
};

const initializeAuthorization = (
  headers: AxiosRequestHeaders,
  {hasLogin, jwtToken}: {hasLogin: boolean; jwtToken: string | undefined},
): string | number | boolean => {
  let authorization = headers.Authorization;
  if (_.isEmpty(headers.Authorization)) {
    authorization = hasLogin
      ? `Bearer ${jwtToken!}`
      : `Basic ${toBase64(basicAuth)}`;
  }
  console.log('authorization', authorization);
  return authorization;
};

const initializeGrantToken = async ({
  hasLogin,
  isCallingLogin,
}: {
  hasLogin: boolean;
  isCallingLogin: boolean;
}): Promise<string> => {
  if (!hasLogin || isCallingLogin) {
    guid = null;
    if (!_.isEmpty(uuid)) {
      return uuid!;
    }
    uuid = await getData('grantUUID');
    if (_.isEmpty(uuid)) {
      uuid = uuidv4();
      await storeData('grantUUID', uuid);
    }
    return Generator.encryptGuid(uuid ?? '');
  }
  uuid = null;
  if (!_.isEmpty(guid)) {
    return guid ?? '';
  }
  const userId: string | null = (await getData('customer'))?.id;
  if (_.isEmpty(userId)) {
    return '';
  }
  guid = Generator.encryptGuid(userId ?? '');
  return guid;
};

Remote.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const jwtToken = account.account?.accessToken;
    const hasLogin = !_.isEmpty(jwtToken);
    const isCallingLogin = config?.url?.endsWith(url.login) ?? false;

    const headers = config.headers ?? {};
    headers['Content-Type'] = 'application/json';
    headers['app-version'] = deviceInformation?.appVersion ?? '';

    const grantToken = await initializeGrantToken({
      hasLogin,
      isCallingLogin,
    });
    if (!_.isEmpty(grantToken)) {
      headers['X-XSRF-TOKEN'] = grantToken;
    }

    const authorization = initializeAuthorization(headers, {
      hasLogin,
      jwtToken,
    });
    if (
      (config.url?.endsWith(url.logout) ?? false) ||
      (!isCallingLogin && !(config.url?.endsWith(url.refreshToken) ?? false))
    ) {
      headers.Authorization = authorization;
    }

    config.headers = headers;
    Logger.describeRequest(config);
    return config;
  },
  async err => {
    console.log('err:', err);
    return Promise.reject(err);
  },
);

Remote.interceptors.response.use(handleSuccess, handleError);

export default Remote;
