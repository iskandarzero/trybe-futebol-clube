import UserService from "../services/user.service";
import { Request, Response } from "express";

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await this._userService.login({email, password});

    if (user.message) return res.status(user.code).json(user.message);
    
    return res.status(user.code).json({token: user.token});
  }
}