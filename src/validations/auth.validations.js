import { check } from 'express-validator';

export default {
  signupSchema: [
    check('fullName')
      .not()
      .isEmpty()
      .withMessage('Your fullname is required'),

    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),

    check('email')
      .not()
      .isEmpty()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail(),

    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],

  signinSchema: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Username is required'),

    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],
};
