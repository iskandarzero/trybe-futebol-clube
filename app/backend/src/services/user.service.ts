import { generateToken } from '../auth/token';
import User from '../database/models/user.model'
import Login from '../interfaces/login.interface';
const bcrypt = require('bcryptjs');

export default class UserService {
  public async login(user: Login) {
    console.log(user);
    

    const userInfo = await User.findOne({ where: { email: user.email } });

    if (!userInfo) return { code: 400, message: 'generica' };

    const comparePasswords = await bcrypt.compare(user.password, userInfo.password);
    if (!comparePasswords) return { code: 400, message: 'generica2' };

    const token = await generateToken(user);
    
    return {code: 200, token};
  }
}