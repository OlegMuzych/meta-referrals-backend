import { registerAs } from '@nestjs/config';

// export default registerAs('app', () => ({
//   env: process.env.NODE_ENV,
//   port: parseInt(process.env.APP_PORT, 10) ?? 3010,
//   name: process.env.APP_NAME ?? 'meta_referrals',
// }));

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) ?? 3010,
  name: process.env.APP_NAME ?? 'meta_referrals',
}));
