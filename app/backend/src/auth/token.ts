const jwt = require('jsonwebtoken');
import Login from '../interfaces/login.interface';

require('dotenv').config();

export default class Token {
  public generateToken = (user: Login) => {
    const jwtConfig = {
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  
    return token;
  };
  
  public decodeToken = (token: string | undefined) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.data;
    
      return userId;
    } catch (err) {
      console.log(err);
      
      return undefined;
    }
  };
}