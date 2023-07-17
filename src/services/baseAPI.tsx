import Remote from './indexAPI';
import URL from './url';

const BaseAPI = {
  login: async (username: string, password: string, isManual: boolean) => {
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
