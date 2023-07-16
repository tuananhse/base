import {toBase64} from 'js-base64';
import envs from '../../configEnv';
import {BaseResponse} from '../models/api_response/base';
import {RegistrationAddonsResponseData} from '../models/api_response/customersInfoDevices';
import {GetUploadLoanFilesData} from '../models/api_response/getUploadLoanFiles';
import {SexType} from '../models/api_response/scoring';
import {Contacts} from '../stores/customer';
import {DeviceInformation} from '../stores/deviceInfo';
import {UploadFileRequest} from '../stores/uploadIncreaseLoan';
import {Generator} from '../utils';
import {InputNewPassFormType} from '../views/ChangePassword/InputPassForm';
import getBasicAuthorization from './api/helpers';
import Remote from './indexAPI';
import URL from './url';

const BaseAPI = {
  login: async (username: string, password: string, isManual: boolean) => {
    // const hashPass = Generator.hashPassword(password);
    return Remote.post(URL.login, {
      username,
      password: password,
      isManual,
    });
  },
};

export default BaseAPI;

export interface ApiResponse<T extends any> {
  code: number;
  data: T;
  message: string;
  status: string;
  timestamp: number;
}
