import {Request, Response} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

const signUp = async (req: Request, res: Response) => {
  const {username, email, password, roles} = req.body;

  const newUser = await new User({
    username,
    email,
    // @ts-ignore
    password: await User.encryptPassword(password),
    roles,
  });

  /**
   * If there is a role passed in the req.body
   * then find the id of that role in the role collection and assign it to the user.roles
   * otherwise if there is no req.body.roles then assign the user role by default
   */
  if (roles) {
    const foundRole = await Role.find({name: {$in: roles}});
    // @ts-ignore
    newUser.roles = foundRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({name: "user"});
    // @ts-ignore
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  console.log("savedUser", savedUser);

  const token = jwt.sign(
    {
      id: savedUser._id,
    },
    config.SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  return res.json({token});
};

const signIn = async (req: Request, res: Response) => {
  const userFound = await User.findOne({email: req.body.email}).populate(
    "roles"
  );

  if (!userFound) return res.status(400).json({message: "user not found"});

  //@ts-ignore
  const matchPassword = await User.comparePassword(
    req.body.password,
    //@ts-ignore
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({token: "", msg: "invalid password"});

  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  console.log("userFound", userFound);
  return res.json({token});
};

export default {signUp, signIn};
