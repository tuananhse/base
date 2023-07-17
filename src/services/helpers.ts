import { AxiosError } from 'axios';
import _ from 'lodash';
import { Logger } from '../utils';

export function mappingErrorResponse(response: AxiosError): any {
  function mappingErrorMsg(resp: AxiosError): string {
    switch (resp.response?.status) {
      case 404:
        return 'Hiện tại hệ thống không tìm thấy thông tin theo yêu cầu của bạn.';
      case 400:
        return 'Bạn vui lòng kiểm tra dữ liệu đầu vào theo yêu cầu của hệ thống.';
      case 409:
        return 'Thông tin đã tồn tại trên hệ thống. Vui lòng nhập lựa chọn khác.';
      default:
        return 'Rất tiếc đã có phát sinh ngoài dự kiến. Vui lòng liên hệ bộ phận phát triển sản phẩm.';
    }
  }

  const responseData = response.response?.data;
  if (_.isUndefined(responseData) || typeof responseData === 'string') {
    return {
      code: 500,
      msg: mappingErrorMsg({ response: { status: 500 } }),
    };
  }

  const shouldMapping = typeof responseData.data === 'string';
  let mappedDataCode = -1;
  if (shouldMapping) {
    if (responseData.data?.includes('The account has been locked the password')) {
      mappedDataCode = 103;
    } else {
      switch (responseData.data) {
        case 'The username is invalid': {
          mappedDataCode = 1;
          break;
        }
        case 'The password is incorrect': {
          mappedDataCode = 2;
          break;
        }
        case 'The bank account is invalid': {
          mappedDataCode = 52;
          break;
        }
      }
    }
  }

  const mappedResp = {
    ...responseData,
    apiCode: response.response?.status,
    code: mappedDataCode,
    msg: mappingErrorMsg(response),
  };
  Logger.groupLog('[API helpers] mappingErrorResponse', { response, responseData, shouldMapping, mappedResp });
  return mappedResp;
}
