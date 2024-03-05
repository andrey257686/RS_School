import './sources.css';
import { Source } from '../../../types';

class Sources {
    draw(data: Source[], letter: string): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            if (letter === 'ALL') {
                const sourceClone: HTMLDivElement = sourceItemTemp!.content.cloneNode(true) as HTMLDivElement;

                (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            } else {
                if (item.name[0] === letter) {
                    const sourceClone: HTMLDivElement = sourceItemTemp!.content.cloneNode(true) as HTMLDivElement;

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
