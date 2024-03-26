// import axios from "axios";
// import { Car } from "../types/types";
import AppModel from "../model/model";

export default class AppController {
  public appModel: AppModel;

  constructor() {
    this.appModel = new AppModel();
  }

  public initialize() {
    this.appModel.getInitialData();
  }
}
