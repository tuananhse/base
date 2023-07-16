export interface LoginResponseData {
    id: string;
    username: string;
    fullName: string;
    accessToken: string;
    accessTokenExpiry: Date;
    refreshToken: string;
    refreshTokenExpiry: Date;
    isLogout: boolean;
    phone?: string;
    password?: string;
}

export interface UserInfo {
    id: string;
    username: string;
    fullName: string;
    mobile: string;
    nationalId: string;
    email: string;
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    nativePlace: string;
    issuePlace: string;
    issueDate: string;
    amount: number;
    gender: SelectType;
    dob: string;

}


export interface SelectType {
    id: string | number | boolean;
    name: string;
}
