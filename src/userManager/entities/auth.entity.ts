import { IAuth } from '../interfaces/auth.interface';
export class AuthEntity implements Pick<IAuth, 'token' | 'user'> {
  token: IAuth['token'];
  user: IAuth['user'];
  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
