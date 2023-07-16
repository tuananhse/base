import {makeAutoObservable} from 'mobx';
import i18n from '../locales';
import {LoginResponseData} from '../models/api/login';
import {Logger} from '../utils';
import {AppStore} from './appStore';
import {BaseResponse} from '../models/api/base';

export type LoginStatus =
  | 'initial'
  | 'submitting'
  | 'register'
  | 'loginSuccess'
  | 'loginFailed'
  | 'ekyc'
  | 'wrongPhoneNumber'
  | 'wrongPass'
  | 'blockedAccount'
  | 'blockedOtp'
  | 'diffDevice';

class LoginObservable {
  status: LoginStatus = 'initial';

  errorMsg?: string;

  result?: LoginResponseData;

  phoneNumber?: string;

  private readonly root: AppStore;

  constructor(root: AppStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  private async callLoginApi(
    phoneNumber: string,
    password: string,
  ): Promise<boolean> {
    const {data, code}: BaseResponse<LoginResponseData> = await BaseAPI.login(
      phoneNumber,
      password,
    );
    if (code !== 200) {
      return false;
    }

    // await AsyncStorage.setItem('phoneNumber', phoneNumber);
    // this.result = data;
    // await this.root.account.setAccount({
    //   ...data,
    //   phone: phoneNumber,
    //   password,
    // });
    // this.root.customer.setInfo({
    //   id: data.id,
    //   phone: phoneNumber,
    //   password,
    // });
    // this.root.businessLocked.resetFailedTime('password');
    return true;
  }

  private handleLoginError(error: any) {
    Logger.groupLog('[LoginObservable] login', {error});
    switch (error.code) {
      case 1: {
        this.status = 'wrongPhoneNumber';
        this.errorMsg = 'Số điện thoại của bạn không đúng.';
        return true;
      }
      case 2: {
        this.status = 'wrongPass';
        this.errorMsg = 'Mật khẩu của bạn không đúng.';
        return true;
      }
      case 103: {
        this.status = 'blockedAccount';
        this.errorMsg = error.msg ?? i18n.t('other_error');
        return true;
      }
      default: {
        return false;
      }
    }
  }

  *login(phoneNumber: string, password: string) {
    console.log('loginnn', phoneNumber + password);
    this.phoneNumber = phoneNumber;
    this.status = 'submitting';
    try {
      // Call oauth/login
      const loginResp: boolean = yield this.callLoginApi(phoneNumber, password);
      if (!loginResp) {
        this.status = 'loginFailed';
        this.errorMsg = i18n.t('other_error');
        return;
      }
    } catch (error) {
      // if (error.data?.includes('You must be used the eKYC function') === true) {
      //   const {data}: BaseResponse<InputPhoneResponseData> =
      //     yield BaseAPI.customerExit(
      //       phoneNumber,
      //       this.root.deviceInfo.deviceInformation!.uniqueId,
      //     );
      //   this.root.customer.setInfo({
      //     id: data.id,
      //     phone: phoneNumber,
      //     password,
      //   });
      //   this.status = 'register';
      //   return;
      // }
      // if (this.handleLoginError(error)) {
      //   return;
      // }
      // this.status = 'loginFailed';
      // this.errorMsg = error.msg ?? i18n.t('other_error');
    }
  }

  resetData(): void {
    this.result = undefined;
    this.phoneNumber = undefined;
    this.errorMsg = undefined;
    this.status = 'initial';
  }
}

export default LoginObservable;
