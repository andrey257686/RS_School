import AppLoader from './appLoader';
import { ArticleData, SourceData, Endpoints } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: (data: SourceData) => void) {
        super.getResp(
            {
                endpoint: Endpoints.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: ArticleData) => void) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id') ?? '';
                    if (
                        newsContainer instanceof HTMLElement &&
                        newsContainer.getAttribute('data-source') !== sourceId
                    ) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: Endpoints.Everything,
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target?.parentNode;
            }
        }
    }
}

export default AppController;
