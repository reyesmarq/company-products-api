// @ts-nocheck
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

// @ts-ignore
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers["x-access-token"];

    if (!token) return res.status(403).json({message: "No token provided"});

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password: 0});

    if (!user) return res.status(404).json({message: "No user found"});

    next();
  } catch (error) {
    return res.status(401).json({message: "unahotized"});
  }
};

// @ts-ignore
export const isModerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.roles}});

  console.log(roles);
  // for (let i = 0; i < roles.length; i++) {
  //   if (roles[i].name == "moderator") {
  //     next();
  //     return;
  //   }
  // }

  roles.forEach((role) => {
    if (role.name === "moderator") {
      next();
      return;
    }
  });

  return res.status(403).json({message: "Require Moderator role"});
};

// @ts-ignore
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.roles}});

  console.log(roles);
  // for (let i = 0; i < roles.length; i++) {
  //   if (roles[i].name == "moderator") {
  //     next();
  //     return;
  //   }
  // }

  roles.forEach((role) => {
    if (role.name === "admin") {
      next();
      return;
    }
  });

  return res.status(403).json({message: "Require admin role"});
};
