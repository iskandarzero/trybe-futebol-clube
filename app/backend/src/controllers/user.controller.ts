import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await this._userService.login({email, password});

    if (user.message) return res.status(user.code).json({ message: user.message });
    
    res.status(user.code).json({token: user.token});
  }

  public validateFields = (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }

  public validate = async (req: Request, res: Response) => {
    const token = req.headers.authorization;    
    
    if (!token) return res.status(404).json({message: 'Invalid token'})
    const userRole = await this._userService.validate(token);

    res.status(userRole.code).json(userRole.message);
  }
}