const SALT_WORK_FACTOR = 10;

export { SALT_WORK_FACTOR };

export const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';
