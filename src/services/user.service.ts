import User from '../models/user.model';
import * as passwordUtil from '../util/passwordGenerator';
import * as tokenUtil from '../util/tokenGenerator';

type RegisterReturn = [token: string, newUserId: number]

export const findUser6 = async (): Promise<User | null> => {
  const user = await User.findByPk(6);
  return user;
};

export const register = async (email: string, password: string): Promise<RegisterReturn | null> => {
  const userWithSameEmail = await User.findOne({ where: { email } });
  if (userWithSameEmail) {
    return null;
  }

  const password_hash = await passwordUtil.generatePassword(password);
  const newUser = new User({
    email,
    password_hash,
  });

  const savedUser = await newUser.save();
  const token = tokenUtil.generate(email);
  return [token, savedUser.id as number];
};

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return null;
  }

  const isValidPassword = await passwordUtil.comparePassword(password, user.password_hash);
  return !isValidPassword ? null : tokenUtil.generate(email);
};