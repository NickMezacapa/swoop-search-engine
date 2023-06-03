/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { BsImages } from 'react-icons/bs';

import { v4 as uuidv4 } from 'uuid';

import { handleRouting } from '@utils/helpers/handleRouting';
import { useGetSearchResults } from '@hooks/useGetSearchResults';

interface ImagesPreviewProps {
    query: string;
}

const ImagesPreview = ({ query }: ImagesPreviewProps) => {
    const router = useRouter();
    const { loading, error, data } = useGetSearchResults(query, true);

    const handleImageReroute = () => {
        handleRouting(router, query, 'images');
    };

    return (
        <div className='flex flex-col my-8 relative'>
            <div className='w-full flex justify-evenly'>
                {data?.results?.slice(0,3).map((obj: any) => {
                    return (
                        <div key={`${uuidv4()}`} className='w-[30%] h-[100px] float-left rounded-lg overflow-hidden border border-[hsla(0,0%,51%,0.2)] cursor-pointer transition duration-100 hover:scale-[0.99]'>
                            <img src={obj.img_src} alt={obj.title ?? ''} className='h-full w-full object-cover' loading='eager' />
                        </div>
                    );
                })}
            </div>
            <div className='w-full flex justify-evenly mt-2'>
                {data?.results?.slice(3,6).map((obj: any) => {
                    return (
                        <div key={`${uuidv4()}`} className='w-[30%] h-[100px] float-left rounded-lg overflow-hidden border border-[hsla(0,0%,51%,0.2)] cursor-pointer transition duration-100 hover:scale-[0.99]'>
                            <img src={obj.img_src} alt={obj.title ?? ''} className='h-full w-full object-cover' loading='eager' />
                        </div>
                    );
                })}
            </div>
            <div onClick={handleImageReroute} className='absolute bottom-0 right-0 rounded-t-lg border border-[hsla(0,0%,51%,0.2)] bg-[#1d1d1fc2] dark:bg-[#39393cb1] dark:hover:bg-[#1d1d1f] cursor-pointer py-1 px-2 text-[#eae8ed] hover:bg-[#1d1d1f] transition'>
                <p className='transition hover:underline flex gap-x-2 items-center'>
                    <BsImages />
                    More Images
                </p>
            </div>
    </div>
    );
};

export default ImagesPreview;
