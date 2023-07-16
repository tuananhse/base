export interface LockStorageData {
  failedTime: number;
  unlockTime?: Date;
}

/// Login
export interface AuthStorageData {
  password?: LockStorageData;
  otp?: LockStorageData;
  bankAccount?: LockStorageData;
}
export interface PhoneAuthStorageData {
  (phone: string): AuthStorageData;
}

