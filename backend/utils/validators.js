const { body } = require('express-validator');

const validators = {
  register: [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('password').isLength({ min: 6 })
  ],
  login: [
    body('username').exists(),
    body('password').exists()
  ]
};

module.exports = (validatorName) => {
  if (!validators[validatorName]) {
    throw new Error(`Validator '${validatorName}' doesn't exist`);
  }
  return validators[validatorName];
};
