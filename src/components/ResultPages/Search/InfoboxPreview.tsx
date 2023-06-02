/* eslint-disable @next/next/no-img-element */
import { v4 as uuidv4 } from 'uuid';

interface InfoBoxUrl {
    title: string;
    url: string;
}
interface InfoBox {
    infobox: string;
    id: string;
    content: string;
    img_src: string;
    urls: InfoBoxUrl[];
    [key: string]: any;
}
interface InfoboxPreviewProps {
    searchResults: any;
}

const InfoboxPreview = ({ searchResults }: InfoboxPreviewProps) => {
    return (
        <div>
            {!!searchResults.infoboxes &&
                searchResults.infoboxes.map((source: InfoBox) => {
                    return (
                        <div 
                            key={`${uuidv4()}`}
                            onClick={() => window.open(source.urls[0].url)}
                            className='bg-[#EAE8ED] cursor-pointer transition hover:scale-[0.99] border border-[hsla(0,0%,51%,0.16)] shadow-md mb-4 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] p-2 rounded-lg flex flex-col w-full max-w-[400px]'>
                            <h1 className='text-xl'>{source.infobox}</h1>
                            <img src={source.img_src} alt={source.infobox} className='w-1/2 h-1/2 mt-2 object-contain' loading='eager' />
                            <p className='text-sm text-[#1d1d1fba] mt-4 dark:text-gray-500 line-clamp-4'>{source.content}</p>
                            {source.urls.map((url: InfoBoxUrl, index: number) => {
                                return (
                                    <p key={index} className='text-sm mt-2'>
                                        <span>{url.title} - </span>
                                        <a href={url.url} className='text-blue-400'>{url.url}</a>
                                    </p>
                                );
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default InfoboxPreview;
