/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { BsImages } from 'react-icons/bs';

import { v4 as uuidv4 } from 'uuid';

import { handleRouting } from '@utils/helpers/handleRouting';
import { useGetSearchResults } from '@hooks/useGetSearchResults';

interface ImagesPreviewProps {
    query: string;
}

interface ImageRowProps {
    x: number;
    y: number;
    className?: string;
    data: any;
}

const ImageRow = ({x, y, className, data}: ImageRowProps) => {
    return (
        <div className={`w-full flex justify-evenly ${className}`}>
        {data?.results?.slice(x,y).map((obj: any) => {
            return (
                <div key={`${uuidv4()}`} className='w-[30%] h-[100px] float-left rounded-lg overflow-hidden border border-[hsla(0,0%,51%,0.2)] cursor-pointer transition duration-100 hover:scale-[0.99]'>
                    <img src={obj.img_src} alt={obj.title ?? ''} className='h-full w-full object-cover' loading='eager' />
                </div>
            );
        })}
    </div>
    );
};

const SkeletonPreview = () => {
    return (
        <div className='w-full flex flex-wrap justify-evenly'>
            {Array(3).fill('').map((_, i) => {
                return (
                    <div key={i} className='w-[30%] h-[100px] float-left rounded-lg overflow-hidden border border-[hsla(0,0%,51%,0.2)] mb-2'>
                        <div className='SkeletonShimmer SkeletonEntrance bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#65646562] dark:bg-[#444446b1] w-full h-full' />
                    </div>
                )
            })}
            {Array(3).fill('').map((_, i) => {
                return (
                    <div key={i+10} className='w-[30%] h-[100px] float-left rounded-lg overflow-hidden border border-[hsla(0,0%,51%,0.2)] mb-2'>
                        <div className='SkeletonShimmer SkeletonEntrance bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#65646562] dark:bg-[#444446b1] w-full h-full' />
                    </div>
                )
            })}
        </div>
    );
};

const ImagesPreview = ({ query }: ImagesPreviewProps) => {
    const router = useRouter();
    const { loading, error, data } = useGetSearchResults(query, true);

    const handleImageReroute = () => {
        handleRouting(router, query, 'images');
    };

    if (loading) {
        return (
            <div className='flex flex-col my-8 relative'>
                <SkeletonPreview />
            </div>
        )
    }

    return (
        <div className='flex flex-col my-8 relative'>
            <ImageRow x={0} y={3} data={data} />
            <ImageRow x={3} y={6} data={data} className='mt-2' />
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
