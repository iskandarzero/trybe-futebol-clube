import { decodeToken, generateToken } from '../auth/token';
import User from '../database/models/user.model'
import Login from '../interfaces/login.interface';
const bcrypt = require('bcryptjs');

export default class UserService {
  public async login(user: Login) {
    const userInfo = await User.findOne({ where: { email: user.email } });

    if (!userInfo) return { code: 401, message: 'Incorrect email or password' };

    const comparePasswords = await bcrypt.compare(user.password, userInfo.password);
    if (!comparePasswords) return { code: 400, message: 'Incorrect email or password' };

    const token = generateToken(user);
    
    return {code: 200, token};
  }

  public async validate(token: string) {
    const { email } = decodeToken(token);
    
    if (!email) return {code: 404, message: 'Invalid token'}

    const userRole = await User.findOne({attributes: ['role']})

    return {code: 200, message: userRole};
  }
}