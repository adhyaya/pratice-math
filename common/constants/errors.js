const errorDefault = {
  type: 'error',
  message: 'Error occured',
  description: 'Something went wrong',
};

export const errors = {
  ZQTZA0001: {
    ...errorDefault,
    description: 'Invalid credentials',
  },
  ZQTZA0002: {
    ...errorDefault,
    description: 'Invalid input',
  },
  ZQTZA0003: {
    ...errorDefault,
    description: 'Input required',
  },
  ZQTZA0004: {
    ...errorDefault,
    description: 'Not Found',
  },
};

export default {
  errors,
};
