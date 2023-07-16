const Constant = {
  SERVER: {
    DATE_FORMAT: 'YYYY-MM-DD',
    DATETIME_FORMAT: 'YYYY-MM-DDTHH:mm:SSS',
    PAGE_SIZE: 20,
    MAP_PAGE_SIZE: 500,
    KL: {
      FIRST_LOGIN: 0,
      TRAINING: 1,
    },
  },

  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 32,
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

export default Constant;
