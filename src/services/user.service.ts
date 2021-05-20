import User from '../models/user.model';

export const findUser6 = async (): Promise<User | null> => {
  const user = await User.findByPk(6);
  return user;
};