export type ResponseType<T> = {
  state: boolean;
  message?: 'error' | 'success' | T;
};
