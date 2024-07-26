import { registerAs } from '@nestjs/config';

export default registerAs('usermanager', () => ({
  jwtSecret: process.env.JWT_SECRET ?? 'default_jwt_secret',
  jwtExpire: process.env.JWT_EXPIRE ?? '60s',
}));
