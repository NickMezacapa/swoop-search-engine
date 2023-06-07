import clsx from 'clsx';

interface GradientTileProps {
	className: string;
	children: React.ReactNode;
	onClick?: () => {};
}

const GradientTile = ({
	className,
	children,
  }: GradientTileProps) => {
	return (
	  <div className={clsx('relative', className)}>
		<div className="shadow-2xl" />
		<div className="grid h-full transform grid-cols-1 overflow-hidden">
		  	{children}
		</div>
	  </div>
	);
  };

export default GradientTile;
