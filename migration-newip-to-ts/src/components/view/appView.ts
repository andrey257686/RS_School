import News from './news/news';
import Sources from './sources/sources';
import Keyboard from './keyboard/keyboard';
import { IArticleData, ISourceData } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;
    private keyboard: Keyboard;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.keyboard = new Keyboard();
    }

    public drawNews(data: IArticleData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourceData, letter: string = 'A') {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values, letter);
        this.keyboard.draw();
    }
}

export default AppView;
