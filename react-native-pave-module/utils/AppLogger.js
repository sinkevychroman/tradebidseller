export const EnvironmentType = {
  DEV: 'develop',
  PROD: 'production',
};

export default class AppLogger {
  static getInstance() {
    if (typeof AppLogger.instance === 'object') {
      return AppLogger.instance;
    }
    return new AppLogger();
  }

  constructor() {
    if (typeof AppLogger.instance === 'object') {
      return AppLogger.instance;
    }
    AppLogger.instance = this;
    this.environment = EnvironmentType.PROD;
  }

  setEnvironment(currentEnvironment) {
    this.environment = currentEnvironment;
    console.log(currentEnvironment);
  }

  consoleLog(...params) {
    if (this.environment === EnvironmentType.DEV) {
      if (params.length === 2) {
        console.log(params[0], params[1]);
      } else if (params.length === 1) {
        console.log(params[0]);
      }
    }
  }
}

export function Logger(...params) {
  AppLogger.getInstance().consoleLog(...params);
}
