const jwt = require('jsonwebtoken');
import Login from '../interfaces/login.interface';

require('dotenv').config();

const generateToken = async (user: Login) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

export {generateToken}