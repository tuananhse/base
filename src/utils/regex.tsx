import _ from 'lodash';

const regexPhone = /0((3[2-9])|(5[2689])|(7[06789])|(8[12345689])|(9[012346789]))\d{7}/;
const regexPassWord = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#@$!%*?&]{8,}$/;
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/// Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number:
const regexNewPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
/// At least one uppercase letter
const regexPasswordUppercaseLetter = /^(.*[A-Z].*)$/;
/// At least one lowercase letter
const regexPasswordLowercaseLetter = /^(.*[a-z].*)$/;
/// At least one number:
const regexPasswordNumber = /^.*\d.*$/;

const phoneLength = 10;

export default {
  regexPhone,
  regexEmail,
  regexPassWord,
  regexNewPassword,
  regexPasswordUppercaseLetter,
  regexPasswordLowercaseLetter,
  regexPasswordNumber,
  phoneLength,
};

export const passwordValidator = (password: any) => {
  if (password) {
    return regexPassWord.test(password);
  }
  return false;
};

export const phoneValidator = (phone: string): 'LT_MIN' | 'GT_MAX' | 'INVALID' | 'VALID' => {
  if (!_.isEmpty(phone)) {
    if (phone.length < phoneLength) {
      return 'LT_MIN';
    }
    if (phone.length > phoneLength) {
      return 'GT_MAX';
    }
    return regexPhone.test(phone) ? 'VALID' : 'INVALID';
  }
  return 'INVALID';
};
