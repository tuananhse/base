import AppFlowObservable from './appFlow';
import LoginObservable from './login';

export class AppStore {
  appState: AppFlowObservable;
  loginObservable: LoginObservable;

  constructor() {
    this.appState = new AppFlowObservable(this);
    this.loginObservable = new LoginObservable(this);
  }
}
