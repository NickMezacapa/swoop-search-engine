interface GradientBackgroundProps {
	className: string;
}

const GradientBackground = ({ className }: GradientBackgroundProps) => (
	<div className="PageGradientBlur z-20 h-full rounded-lg">
		<div className={`${className} h-full rounded-lg`} />
	</div>
);

export default GradientBackground;
