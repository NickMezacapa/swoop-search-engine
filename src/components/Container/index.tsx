import React from 'react';
import clsx from 'clsx';

type ContainerProps = {
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({ className, ...props }) => (
	<section className={clsx('mx-auto px-4 sm:px-6 lg:px-8', className)} {...props} />
);

export default Container;
