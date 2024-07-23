import * as bcrypt from 'bcrypt';
export class HashUtils {
  public static async create(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds); //Соль идет в результате выполнения функции
    return hash;
  }
  public static async compare(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
