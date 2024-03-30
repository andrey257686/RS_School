export class WinnersListeners {
  public handlePrevPageClick: ((ev: MouseEvent) => void) | undefined;

  public handleNextPageClick: ((ev: MouseEvent) => void) | undefined;
}

const winnersListeners = new WinnersListeners();
export default winnersListeners;
