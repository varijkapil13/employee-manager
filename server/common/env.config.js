const configuration = {
  jwtSecret: '',
  jwtExpirationInSeconds: 36000,
  permissions: {
    USER: 1,
    MANAGER: 4,
    ADMIN: 2048
  }
};

export default configuration;
