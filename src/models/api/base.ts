export interface BaseResponse<T> {
  timestamp: number;
  status: 'OK' | 'UNAUTHORIZED';
  code: number;
  message: string;
  data: T;
}

export interface CreatedResponse {
  id: string;
}

export interface UpdatedReponse {
  result: boolean;
}
