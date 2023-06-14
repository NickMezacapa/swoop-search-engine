const SkeletonVideoLoader = () => {
    const skeletonArray = Array.from({ length: 15 }, (_, i) => i);
    return (
        <div className='w-full flex flex-col mx-auto pl-3 sm:pl-12 pt-6 pr-3 max-w-4xl'>
            {skeletonArray.map((item) => (
                <div
                    key={item}
                    className='bg-[#EAE8ED] w-full h-[250px] max-h-[250px] relative overflow-hidden transition shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] border border-[hsla(0,0%,51%,0.2)] flex flex-col space-y-2 rounded-lg p-2'>
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#cecccf] dark:bg-[#444446b1] w-1/2' />
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-4 bg-[#6f6f7157] dark:bg-[#585859b1] w-1/3' />
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-5 bg-[#a2a1a341] dark:bg-[#444446b1] w-3/4' />
                </div>
            ))}
        </div>
    );
};

export default SkeletonVideoLoader;
