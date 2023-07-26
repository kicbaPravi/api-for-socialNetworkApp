import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('Request', req.body);

  try {
    console.log('Usao');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!');
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('USAO');

    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found!'));

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) return next(createError(404, 'Wrong credentials!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = (user as any)._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
