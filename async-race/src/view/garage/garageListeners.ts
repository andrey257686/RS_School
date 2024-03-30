export class GarageListeners {
  public handleCreateClick: (() => void) | undefined;

  public handleUpdateClick: ((ev: MouseEvent) => void) | undefined;

  public handleRemoveClick: ((ev: MouseEvent) => Promise<void>) | undefined;

  public handleSelectClick: ((ev: MouseEvent) => void) | undefined;

  public handleNextPageClick: ((ev: MouseEvent) => void) | undefined;

  public handlePrevPageClick: ((ev: MouseEvent) => void) | undefined;

  public handleGenerateClick: (() => void) | undefined;

  public handleStartClick: ((ev: MouseEvent) => void) | undefined;

  public handleStopClick: ((ev: MouseEvent) => void) | undefined;

  public handleRaceClick: (() => void) | undefined;

  public handleResetClick: (() => void) | undefined;
}

const garageListeners = new GarageListeners();
export default garageListeners;
