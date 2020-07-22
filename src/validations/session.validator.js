import { param } from 'express-validator';

export default {
  logoutSchema: [
    param('sessionId')
      .isUUID()
      .withMessage('invalid ID entered (ID should be UUID)'),
  ],
};
