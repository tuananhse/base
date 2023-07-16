import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {getData, removeData, storeData} from '../services/localStorage';
import {AppStore} from './appStore';

type AppStatus =
  | 'first_loading'
  | 'unauthenticated'
  | 'requiredLogin'
  | 'ready';

class AppFlowObservable {
  appStatus: AppStatus = 'first_loading';

  shouldShowFingerprintFromLogin = false;

  isShowedIntroduction = false;

  storageScreen: string | null = null;

  root: AppStore;

  constructor(root: AppStore) {
    makeAutoObservable(this, {
      shouldShowFingerprintFromLogin: false,
    });
    this.root = root;
  }

  *getIsShowedIntroduction() {
    const value: string | null = yield AsyncStorage.getItem(
      '@showIntroduction',
    );
    if (value === 'showed') {
      this.isShowedIntroduction = true;
    } else {
      this.isShowedIntroduction = false;
    }
  }

  *getStorageScreen() {
    this.storageScreen = yield getData('storageScreen');
  }

  *setStorageScreen(screen: string | null) {
    // if (!_.isEmpty(screen)) {
    //   yield storeData('storageScreen', screen);
    // } else {
    //   yield removeData('storageScreen');
    // }
    // this.storageScreen = screen;
  }

  *setIsShowedIntroduction() {
    yield AsyncStorage.setItem('@showIntroduction', 'showed');
  }

  changeAppToUnauthenticated(): void {
    this.appStatus = 'unauthenticated';
    this.shouldShowFingerprintFromLogin = false;
  }

  changeAppToRequiredLogin(): void {
    this.appStatus = 'requiredLogin';
  }

  changeAppToReady(): void {
    this.appStatus = 'ready';
  }

  setShouldShowFingerprintFromLogin(
    shouldShowFingerprintFromLogin: boolean,
  ): void {
    this.shouldShowFingerprintFromLogin = shouldShowFingerprintFromLogin;
  }
}

export default AppFlowObservable;
