import './sources.css';
import { ISource } from '../../../types';

class Sources {
    draw(data: ISource[], letter: string): void {
        const fragment: DocumentFragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: ISource) => {
            if (letter === 'ALL') {
                const sourceClone: HTMLDivElement = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

                (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            } else {
                if (item.name[0] === letter) {
                    const sourceClone: HTMLDivElement = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

                    (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
                    (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute(
                        'data-source-id',
                        item.id
                    );

                    fragment.append(sourceClone);
                }
            }
        });

        (document.querySelector('.sources') as HTMLDivElement).innerHTML = '';
        (document.querySelector('.sources') as HTMLDivElement).append(fragment);
    }
}

export default Sources;
