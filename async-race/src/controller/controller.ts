import AppModel from "../model/model";

export default class AppController {
  public appModel: AppModel;

  constructor() {
    this.appModel = new AppModel();
  }

  public async initialize() {
    await this.appModel.getInitialData();
  }
}
