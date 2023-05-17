import SearchInstance from '@utils/SearchInstance';

// Create a basic mock for useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn().mockResolvedValue(undefined),
    }),
}));

describe('SearchInstance', () => {
    describe('swoopSearch', () => {
        it('navigates to the correct search URL', () => {
            const searchInstance = new SearchInstance();
            const query = 'foo';
            const correctRoute = '/search?term=foo';
            searchInstance.swoopSearch(query);

            expect(searchInstance.router.push).toHaveBeenCalledWith(correctRoute);
        });
    });

    describe('quickResultSearch', () => {
        it('navigates to the correct quick results URL', () => {
            const searchInstance = new SearchInstance();
            const query = 'bar';
            const correctRoute = '/quickResults/bar';
            searchInstance.quickResultSearch(query);

            expect(searchInstance.router.push).toHaveBeenCalledWith(correctRoute);
        });
    });
});
