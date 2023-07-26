import { NextFunction } from 'express';
import { createError } from '../error.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

export interface ReguestUser extends Request {
  user: any;
  params: any;
}

// update user

export const update = async (
  req: ReguestUser,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        {
          new: true
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can update only your account'));
  }
};

// delete user

export const deleteUser = async (
  req: ReguestUser,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json('User has been deleted.');
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can delete only your account'));
  }
};

// get user

export const getUser = async (
  req: ReguestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);

    res.status(200).json('User has been deleted.');
  } catch (err) {
    next(err);
  }
};
