import Token from '../auth/token';
import User from '../database/models/user.model'
import Login from '../interfaces/login.interface';
const bcrypt = require('bcryptjs');

export default class UserService {
  constructor(private _token = new Token) {}

  public async login(user: Login) {
    const userInfo = await User.findOne({ where: { email: user.email } });

    if (!userInfo) return { code: 401, message: 'Incorrect email or password' };

    const comparePasswords = await bcrypt.compare(user.password, userInfo.password);
    if (!comparePasswords) return { code: 401, message: 'Incorrect email or password' };

    const token = this._token.generateToken(user);
    
    return {code: 200, token};
  }

  public async validateRole(token: string) {
    const userInfo = this._token.decodeToken(token);

    if (!userInfo) return undefined;

    const userRole = await User.findOne({ where: { email: userInfo.email },
      attributes: ['role']});

    return {code: 200, message: userRole};
  }
}