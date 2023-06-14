const NewsSkeletonLoader = () => {
    const arr = Array(15).fill('')
    return (
        <div className='SkeletonLoaderEntrance flex flex-col mt-8 ml-6 w-full sm:w-1/2 opacity-0 h-full max-w-[800px] transition ease'>
            {arr.map((_, i) => {
                return (
                    <div 
                        key={i}
                        className='bg-[#EAE8ED] w-full relative overflow-hidden transition shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] border border-[hsla(0,0%,51%,0.2)] flex flex-col space-y-2 rounded-lg p-2'>
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#cecccf] dark:bg-[#444446b1] w-1/2' />
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-4 bg-[#6f6f7157] dark:bg-[#585859b1] w-1/3' />
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-5 bg-[#a2a1a341] dark:bg-[#444446b1] w-3/4' />
                    </div>
                );
            })}
        </div>
    );
};

export default NewsSkeletonLoader;
