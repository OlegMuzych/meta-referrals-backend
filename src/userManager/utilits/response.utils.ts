export type ResponseType<T> = {
  state: boolean;
  message?: 'error' | 'success' | T;
};

export interface IResponseFromService<T = null> {
  state: boolean;
  message: string;
  data?: T;
}

export const createResponse = <T = null>(
  properties?: Partial<IResponseFromService<T>>,
): IResponseFromService<T> => {
  const response: IResponseFromService<T> = {
    state: true,
    message: 'success',
  };
  if (properties) {
    const { state, message, data } = properties;
    if (state != undefined) {
      response.state = state;
    }
    if (message != undefined) {
      response.message = message;
    }
    if (data != undefined) {
      response.data = data;
    }
  }
  return response;
};
