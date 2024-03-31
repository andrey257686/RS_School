export class WinnersListeners {
  public handlePrevPageClick: ((ev: MouseEvent) => void) | undefined;

  public handleNextPageClick: ((ev: MouseEvent) => void) | undefined;

  public handleSortByWins: (() => void) | undefined;

  public handleSortByTime: (() => void) | undefined;
}

const winnersListeners = new WinnersListeners();
export default winnersListeners;
