import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
        (document.querySelector('.keyboard') as HTMLDivElement).addEventListener('click', (e) => {
            e.preventDefault();
            const letter: string = (e.target as HTMLButtonElement).textContent as string;
            this.controller.getSources((data) => this.view.drawSources(data, letter));
        });
    }
}

export default App;
