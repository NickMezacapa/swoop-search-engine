


/* export const makeCall = async (query?: string): Promise<any[]> => {
    try {
        const response: AxiosResponse<string> = await axios.get<string>(
            'https://api.swoopsearch.dev/search',
            {
                params: {
                    q: query
                }
            }
        );

        const html = response.data;
        const $ = cheerio.load(html, null, false);

        const searchResults: any[] = [];

        // Find all article tags in html response
        $('article').each((index, element) => {
            const title = $(element).find('h3 .highlight').text();
            const url = $(element).find('h3 a').attr('href');
            const content = $(element).find('.content').text();

            // Create an object representing the search result and add it to the array
            const searchResult = {
                title: title,
                url: url,
                content: content
            };

            searchResults.push(searchResult);
        });
        //console.log(searchResults)
        return searchResults;
    } catch (error) {
        console.error(error);
        throw error;
    }
}; */


