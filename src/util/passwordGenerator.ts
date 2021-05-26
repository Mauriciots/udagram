import bcrypt from 'bcrypt';

export const generatePassword = async (plainTextPassword: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
};

export const comparePassword = async (plainTextPassword: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hash);
};