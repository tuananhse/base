import { Logger } from '../../utils';
import { getData, StorageKey, storeData } from './localStorage';

interface KeyValueStorageProps {
  key: StorageKey;
}
export default class KeyValueStorage<Data, T extends Record<string, Data>, K extends string> {
  private _data?: T | null;

  private readonly _key?: StorageKey;

  constructor(props: KeyValueStorageProps) {
    this._key = props.key;
    getData(this._key)
      .then((data: T | null) => {
        this._data = data;
      })
      .catch((error: Error) => {
        Logger.groupLog('[KeyValueStorage] constructor getData: ', { error });
      });
  }

  async getData(key: K): Promise<Data | undefined> {
    this._data = await getData(this._key!);
    return this._data?.[key];
  }

  async storeData(key: K, data: Data): Promise<void> {
    this._data = {
      ...this._data,
      [key]: data,
    };
    await storeData(this._key!, this._data);
  }
}
