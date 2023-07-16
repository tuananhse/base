import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import { Logger } from '../../utils';
import EncryptedStorage from 'react-native-encrypted-storage';

export type StorageKey =
  | 'storageScreen'
  | 'customer'
  | 'auth'

const encryptDataKeys: StorageKey[] = ['customer'];

async function storeData<T>(key: StorageKey, object: T): Promise<void> {
  Logger.groupLog('[localStorage] storeData: ', { key, object });
  try {
    const jsonValue = typeof object === 'object' ? JSON.stringify(object) : String(object);
    if (encryptDataKeys.includes(key)) {
      const dataEncoded = Base64.encode(jsonValue);
      await EncryptedStorage.setItem(key, dataEncoded);
    } else {
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    Logger.groupLog('[localStorage] storeData: ', { error: e });
  }
}

const getData = async (key: StorageKey): Promise<any> => {
  try {
    let object = null;
    if (encryptDataKeys.includes(key)) {
      const dataEncoded = (await EncryptedStorage.getItem(key)) ?? '';
      object = Base64.decode(dataEncoded);
    } else {
      object = await AsyncStorage.getItem(key);
    }
    Logger.groupLog('[localStorage] getData: ', { key, object });
    if (!object) {
      return null;
    }
    try {
      const result = JSON.parse(object);
      return result ?? object;
    } catch (error) {
      return object;
    }
  } catch (e) {
    Logger.groupLog('[localStorage] getData: ', { error: e });
    return null;
  }
};

const removeData = async (key: StorageKey): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

const removeAllData = async (excepts?: StorageKey[]): Promise<void> => {
  // don't delete "auth", "hasLaunchedApp", "@notification_token"
  const allStorageKeys: StorageKey[] = [
    'storageScreen',
    'hasSignedContract',
    'disabledLoanRegistrationEntryPoint',
    'eKyc',
    'eKycOcr',
    'eKycData',
    'grantUUID',
    'customer',
    'FullnameUser',
    'nationalIDUser',
    'dobUser',
    '@requestId',
    '@customer_references',
    'IDContract',
    'transactionId',
    'isUploadAnyIncreaseLoanField',
    'F1Tenner',
    'F1Step3',
    'phoneNumber',
  ];
  const deleteStorageKeys = allStorageKeys.filter((key) => !excepts?.includes(key));
  Logger.groupLog('[localStorage] removeAllData', {
    excepts,
    deleteStorageKeys,
  });
  await AsyncStorage.multiRemove(deleteStorageKeys, (errors) => {
    Logger.groupLog('[localStorage] removeAllData multiRemove', { errors });
  });

  try {
    await Promise.all(encryptDataKeys.map(async (key) => EncryptedStorage.removeItem(key)));
  } catch (error) {
    Logger.groupLog('[localStorage] removeAllData encryptData', { error });
  }
};

export { storeData, getData, removeData, removeAllData };
