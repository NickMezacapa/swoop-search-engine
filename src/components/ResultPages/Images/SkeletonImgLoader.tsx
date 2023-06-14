const SkeletonImgLoader = () => {
    return (
      <div className='grid grid-cols-3 gap-4 mt-8 px-8'>
        {Array.from({ length: 45 }).map((_, index) => (
          <div
            key={index}
            className='bg-gray-200 dark:bg-gray-800 h-64 rounded-md animate-pulse SkeletonEntrance SkeletonShimmer'
          ></div>
        ))}
      </div>
    );
  };

export default SkeletonImgLoader;
