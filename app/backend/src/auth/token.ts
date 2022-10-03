const jwt = require('jsonwebtoken');
import Login from '../interfaces/login.interface';

require('dotenv').config();

const generateToken = (user: Login) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.data;

  return userId;
};

export {generateToken, decodeToken}