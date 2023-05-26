import HomePage from '@components/HomePage';

interface DefaultHomeProps {
    variant?: string;
}

const DefaultHome = ({ variant }: DefaultHomeProps) => {
    if (!variant || variant.length <= 0) {
        return (
            <section
            className="max-w-screen relative flex h-full min-h-[100vh] flex-col dark:bg-[#202125] bg-[#F6F5F8]"
            aria-label="Homepage for Swoop Search">
                <HomePage />
            </section>
        );
    }

    return (
        <section
        className="max-w-screen relative flex h-full min-h-[100vh] flex-col dark:bg-[#202125] bg-[#F6F5F8]"
        aria-label="Homepage for Swoop Search">
            <HomePage variant={variant} />
        </section>
    );
};

export default DefaultHome;
