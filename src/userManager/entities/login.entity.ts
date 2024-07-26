import { ILogin } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

export class LoginEntity implements Pick<ILogin, 'token' | 'user'> {
  token: ILogin['token'];
  user: ILogin['user'];
  constructor(partial: Partial<LoginEntity>) {
    Object.assign(this, partial);
  }
}
