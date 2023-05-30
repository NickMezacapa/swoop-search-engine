const mockedResults = {
        "query": "cats",
        "number_of_results": 0,
        "results": [
            {
                "url": "https://en.wikipedia.org/wiki/Cat",
                "title": "Cat",
                "content": "The cat ( Felis catus) is a domestic species of small carnivorous mammal. [1] [2] It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family. [4] Cats are commonly kept as house pets but can also be farm cats or feral cats; the ...",
                "engine": "wikipedia",
                "parsed_url": [
                    "https",
                    "en.wikipedia.org",
                    "/wiki/Cat",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "wikidata",
                    "google",
                    "duckduckgo",
                    "wikipedia"
                ],
                "positions": [
                    1,
                    1,
                    1,
                    1
                ],
                "img_src": "data:image/jpeg;base64,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",
                "score": 32,
                "category": "general",
                "pretty_url": "https://en.wikipedia.org/wiki/Cat",
                "open_group": true
            },
            {
                "title": "Cat | Breeds & Facts | Britannica",
                "content": "cat, (Felis catus), also called house cat or domestic cat, domesticated member of the family Felidae, order Carnivora, and the smallest member of that family. Like all felids, domestic cats are characterized by supple low-slung bodies, finely molded heads, long tails that aid in balance, and specialized teeth and claws that adapt them admirably to a life of active hunting.",
                "url": "https://www.britannica.com/animal/cat",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.britannica.com",
                    "/animal/cat",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo",
                    "google"
                ],
                "positions": [
                    2,
                    8,
                    1
                ],
                "img_src": "data:image/jpeg;base64,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",
                "score": 4.875,
                "category": "general",
                "pretty_url": "https://www.britannica.com/animal/cat"
            },
            {
                "title": "Cat Breeds | Types of Cats | Purina",
                "content": "American Bobtail Cat BreedAmerican Curl Cat BreedAmerican Shorthair CatAmerican Wirehair Cat BreedBalinese-Javanese Cat BreedBengal CatBirman Cat BreedBombay CatBritish Shorthair Cat BreedBurmese CatChartreux Cat Breed",
                "url": "https://www.purina.com/cats/cat-breeds",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.purina.com",
                    "/cats/cat-breeds",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo",
                    "google"
                ],
                "positions": [
                    5,
                    5,
                    4
                ],
                "img_src": "data:image/jpeg;base64,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",
                "score": 1.95,
                "category": "general",
                "pretty_url": "https://www.purina.com/cats/cat-breeds"
            },
            {
                "url": "https://en.wikipedia.org/wiki/Cats_(musical)",
                "title": "Cats (musical)",
                "content": "Cats is a sung-through musical composed by Andrew Lloyd Webber. It is based on the 1939 poetry collection Old Possum's Book of Practical Cats by T. S. Eliot ...Music: Andrew Lloyd WebberProductions: Multiple productions worldwidePremiere: 11 May 1981; 42 years ago: New Lo...‎Awards: Laurence Olivier Award for Best New ...",
                "img_src": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYDBQcECAL/xAAtEAABBAIBAwMDBAIDAAAAAAABAAIDBAURBhIhMRNBUQdhcRQigZEyojNCof/EABgBAQADAQAAAAAAAAAAAAAAAAACAwQF/8QAIhEAAgICAQQDAQAAAAAAAAAAAAECAwQRIRIiMVEFQfAj/9oADAMBAAIRAxEAPwDhqIp0gIRTr8JpAQiIgCIiAIp0mkBCKVCAkeV9A8bweJx+EpTYulBOZIWPMpa0vlOu56j99++l8/Dyun/TTmAbBDgb8jGFhP6SWQ6Dtn/jJ/Pg/wAfC5PzFN1lCdT8eV7RqxJxjPu+z02Z7OC5w9uY49QyVPLSMZWitvEkcTyWtBDug9J9j+3x867+D6rcexmPrwZPG0WUXzTlksETtx9wSCB7eCOwA+y23MsZyGfIU85f/RMq4+1CYqkErnvIL299loBO/wAef7z/AFULKvEzHM/rksTsazfka77/AKH/AKs9eZY548U1ztPX70TdMdTbOMIpKhd4xBb/AIbxe1ynJOqV5BDFGzrmmc3YYPbt7k/H5+FoF0L6OZivj8zapWZGx/rWNEbnHQL2k6b+SHHX3GvdZc2yyvHnOpdyXBZVFSmlLwZzguKcZ5ZQo8gjs3aE0DjNI9rx+4nTegRkHyDsd+x/q5ZPhHEb9hkmKxYjrlgJBfKwk/OnHqHbSz8x4zFnoo2uuGsxrg6WP0eoSgbIG/LddTtEb/yPYr9Ymqzi+Nc+fJEYiJnUI7g2+vv/AKiQf5D4b07+D7Lh2/JytxIquf8AT74ezbHH6bW5LtOX/UvitLjVymcdLIYbTHH0pDssLdb7/B37/BVLVj5zyV3Jsy6yxhjqxD067D56fk/c+ft2HttVxd7EVsaIq57lrkw2OLm+nwFIKhFoIFsxn1Bz+PrNrmeK1EzXSLUfWRrx37H+1qeQ8gv8gtNnyEjT0DUcbG6Yz50Pvr3WpRUxx6Yz64xSZN2Sa03wERFcQCkEhQiA3mP5bn8fF6VXK2Wx+zXEPA/HVvX8Lx5TNZPLSB+SvWLOjtokeS1v4HgfwteirVVal1KK370ScpNa2SoRFYRCIiAIiIAi22L45lctRs3aFX1K9bfqOL2t2Q0uLWgkF7g1pcQ3ZAC9tTh1+3x+rm2WKUdSxbdWBnm9P0yAT1OJ/aGnRG9+dD3QFcRW29wkY3HC7e5Jgmskjc+COGw+Z82iRpvQwjyCN79lj5txyrxV1PHPlsT5R0LZrMnSG1+lw/aI/d2u4LvHbwgKsiIgCIiAIiIAiIgLdmLlijxDibKMkkG4rc7pIz09UjpXRu/0a0fgq28fhp3+HYrjUtp7LmVx1p0FX0j0ukEznxSF++3eAt0Nk9SpWH5hNjMdXqPx9O5JSe+ShPYa4uqvfrqIAOnDYDgHA6PdaMZC42WtK21M2So0Nrva8h0QBLh0keO5J7fKA2zshQv4nCYy4+eqaUlgTziMSDoeWub0t2CTvqBGx5Cz8tz9PJYzDYrG/rJKuLje1s90t9WQvIOtAkNaNABuyqy5xc4ucSSTsk+6hAEREAREQBERAEREAREQBERAEREAREQH/9k=",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "en.wikipedia.org",
                    "/wiki/Cats_(musical)",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    2
                ],
                "score": 0.5,
                "category": "general",
                "pretty_url": "https://en.wikipedia.org/wiki/Cats_(musical)"
            },
            {
                "url": "https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat",
                "title": "Domestic cat",
                "content": "One of the most unusual-looking cats is the Sphynx, a mostly hairless cat known for being robust and intelligent. Like their big cat cousins, house cats. DON'T ...",
                "img_src": "data:image/jpeg;base64,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",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "www.nationalgeographic.com",
                    "/animals/mammals/facts/domestic-cat",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    3
                ],
                "score": 0.3333333333333333,
                "category": "general",
                "pretty_url": "https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat"
            },
            {
                "url": "https://www.catsthemusical.com/",
                "title": "Cats the Musical • Official Website and Tickets",
                "content": "Andrew Lloyd Webber's record-breaking, award-winning, family favourite West End and Broadway musical CATS - book your tickets today!",
                "img_src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAArlBMVEUAAAD////y8vLMvgC1qQDezgDZyQDl1AD/8QDu7u7q6urJuwCsoQDp1wC4rAD/7wCkpKTW1taLi4tubm6YjwBHR0deXl6+sQDv3QD5+fmsrKy2tra9vb3i4uIODgA8OQBvaACamprMzMwLCwswMDB5eXkpKSlOTk5FQQCjmQAaGQB+dgAnJQBPSwCNhABbVgA7OzsaGhoxLgDOxWv16Hb//+kaGyFpZB9lXwD55gCTej3UAAAEoklEQVRoge1Y2baqOhA0BIJCQERkFAcccdY7yf//2O0AIiAOW9wvZ1kvkkAqTXV1h2WjEWN1Wm73y8Yv4LQ2QsqrPF3BQGv5Ukv7FPVgTVWeV2VZNtjQQwx/rU8fIV/LWLYAMqaM0IzJ/ybq+QPcA0sQsMVTHiLfsImeqTv/2ArBH0jBEgsEY4uGxj6b+/e/EGbXHyCXFQFi53fnzXaYTK22m+GO8h8g31BBFASZpyohZDdgU1tBEUWCdzWZt2GjccaKgLGMRUUREvYlERl5WI97jQlklLLsWRgYBSIz4U8yE0oON3W4R0QE8oYB5OB0xiioMblFYDdL3T8jeIANtm1GPhIVzKyIBYEYrEiXFnO+bNUR/Swm5AOKVUpZ5ASP2I0tz9NQteRw8D65YUeRGJOpKg2BXJQTIYZgeoPKuA45vZA3zjw1dhRbaU2uQhqGkOE6djGUKIqSyzOlxmiYuYNaFhEUUkfzkaBE7cs1KMPqc7VlyhiE2JFNRjXIoavYF/LBjsfE4mXRFoFyhMWobZM6nWvAE9G+DDaGrNhRu9mMKJArUbPdllc1yCFAQckGQx5EagM7GTRCGy6imuVPFfs6GKp2k4FfLS0FtiHDeuQnK8qNBmHMTgxK7HZUv52frMLwLEfNZptpb2OjLjdYrzTeGjKUViTKdZt5NSan/f68r9Vtv/jiiy+++OKLL774A3D4PWq9hca/RD3jEEL+r1BPA/ZPlt/74bKJ2dXv3TssFsmFycJGP/+DbwGrvNLcdGHOtMCXnPTWAS6QZL7A1jMLSddZTFmouttpcZyDrmDhMk1eyeVCggf7uQmNMcwa7N/HQEJFtALPA2HmL6bykKwKrjMuSnWZBwViqa9Pci/HvUA+gxi0PkLXHPbjEOPLqa55njsee8gp2CJW7viUe87FGrpIyqY6QI1QIVlTpxhnj5G7T8k91GE/5jWFQO5PSkunDpoXlsVGfJZRyEyX/YK1sjkfEhCg1iT/nJQ8lsF8hV1DUkLiZ+89kcA7ZkmXDirV1dxn7I+N7lzKxcwWzx0WUavgTlCvXFax1R/acVax+SF2joacvMrjJDUFdBEqiVXeXbqZg+pfxH7IC6HnEp4Bqu12yyuq/ARys27gFxZClJObJ48Q+vQu96LqvWYJOYSV0wXIb5srLOfuV5JetXM62Uv6Swoz1qoErtiTShgjp3IyDrmT98KhQkCo5IodM7gV+YTJ5F3HBc2cmziedd2gKtv9lNwt2FgqpABOKx89FOUOecCaqdlvFStQy1XR4TjmLm35PjpVJQZSBn7awnM6O+lGUw92j5vy7HbtU/J4Jeq4XQ/lU7JIj8JufHe86N36vohKWTjE6d1puk2FG2a6Ob+drSK/Tcnk6m/ttUP4DryKyOfXNELlcM9e/j60ilO2l9MCVRX9qzAryr+LuEzSDiqfET/AoaJx6TkHabU+NLnbQhjnkmzW0sVLv09i1kQBN+8Q6fFZ8xj6dfExrRg3T5dPwI9xvH7H9dNaPxQ+i4/vW5EdZqmrK4+amgBdWqxpdLmq1l4X8NXpBH3/6QfOe3DT7vqkgb6JngeSuO+b4n+34VMxGmK5PAAAAABJRU5ErkJggg==",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "www.catsthemusical.com",
                    "/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    4
                ],
                "score": 0.25,
                "category": "general",
                "pretty_url": "https://www.catsthemusical.com/"
            },
            {
                "url": "https://www.vetstreet.com/cats",
                "title": "Cats",
                "content": "Hello, world! Your furry feline friend is ready to explore. His adventur... New Cat Owner Guide: 9 Steps for Taking Care of Your Kitten.",
                "img_src": "data:image/jpeg;base64,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",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "www.vetstreet.com",
                    "/cats",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    6
                ],
                "score": 0.16666666666666666,
                "category": "general",
                "pretty_url": "https://www.vetstreet.com/cats"
            },
            {
                "url": "https://www.rottentomatoes.com/m/cats_2019",
                "title": "Cats",
                "content": "A tribe of cats must decide yearly which one will ascend to the Heaviside Layer and come back to a new life.Rating: 19% · ‎334 votes",
                "img_src": "data:image/jpeg;base64,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",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "www.rottentomatoes.com",
                    "/m/cats_2019",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    7
                ],
                "score": 0.14285714285714285,
                "category": "general",
                "pretty_url": "https://www.rottentomatoes.com/m/cats_2019"
            },
            {
                "url": "https://www.universalpictures.com/movies/cats",
                "title": "Cats",
                "content": "Cats stars James Corden, Judi Dench, Jason Derulo, Idris Elba, Jennifer Hudson, Ian McKellen, Taylor Swift, Rebel Wilson and introduces Royal Ballet principal ...Cast: James Corden, Judi Dench, Jason Derulo, ...",
                "img_src": "data:image/jpeg;base64,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",
                "engine": "google",
                "parsed_url": [
                    "https",
                    "www.universalpictures.com",
                    "/movies/cats",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "google"
                ],
                "positions": [
                    9
                ],
                "score": 0.1111111111111111,
                "category": "general",
                "pretty_url": "https://www.universalpictures.com/movies/cats"
            },
            {
                "title": "Facts about cats: Domestication, breeds and behavior | Live Science",
                "content": "Cats were domesticated around 10,000 years ago, research shows. A 2017 genetic study found that today's domestic cats descend from Felis silvestris lybica, a wild cat subspecies from the Near East ...",
                "url": "https://www.livescience.com/facts-about-cats",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.livescience.com",
                    "/facts-about-cats",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    3,
                    2
                ],
                "score": 1.6666666666666665,
                "category": "general",
                "pretty_url": "https://www.livescience.com/facts-about-cats"
            },
            {
                "title": "Cats & the Feline Family Portal | Britannica",
                "content": "Cats & the Feline Family. Cat, (Felis catus), also called house cat or domestic cat, domesticated member of the family Felidae, order Carnivora, and the smallest member of that family. Like all felids, domestic cats are characterized by supple low-slung bodies, finely molded heads, long tails that aid in balance, and specialized teeth and claws ...",
                "url": "https://www.britannica.com/browse/Cats",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.britannica.com",
                    "/browse/Cats",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    4,
                    3
                ],
                "score": 1.1666666666666665,
                "category": "general",
                "pretty_url": "https://www.britannica.com/browse/Cats"
            },
            {
                "title": "Cats | Healthy Pets, Healthy People | CDC",
                "content": "Cats. Research has shown that cats can provide emotional support, improve moods, and contribute to the overall morale of their owners. Cats are also credited with promoting socialization among older individuals and physically or mentally disabled people. Nearly 40 million households in the United States have pet cats.",
                "url": "https://www.cdc.gov/healthypets/pets/cats.html",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.cdc.gov",
                    "/healthypets/pets/cats.html",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    6,
                    8
                ],
                "score": 0.5833333333333333,
                "category": "general",
                "pretty_url": "https://www.cdc.gov/healthypets/pets/cats.html"
            },
            {
                "title": "Cats: The Complete Guide to Pet Care - The Spruce Pets",
                "content": "How to Be a Responsible Cat Owner. While cats are generally low maintenance pets compared to dogs, they still require a lot of care and attention. Exploring the Different Types of Pet-Friendly Beaches. The Different Types of Pet-Friendly Workplaces. Glaucoma in Cats.",
                "url": "https://www.thesprucepets.com/cats-4162124",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.thesprucepets.com",
                    "/cats-4162124",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    7,
                    7
                ],
                "score": 0.5714285714285714,
                "category": "general",
                "pretty_url": "https://www.thesprucepets.com/cats-4162124"
            },
            {
                "title": "Cats & Kittens | Petfinder",
                "content": "Cats and Kittens 9 Common Cat Myths Debunked. Fact: The myth most likely originated from Egyptian gods and religions, where sun god Atum-Ra, one of the Ennead, or the Nine would assume the form of the cat when visiting the underworld. Throughout the ages, cats continued to be considered magical and otherworldly, and their resilience in ...",
                "url": "https://www.petfinder.com/cats-and-kittens/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.petfinder.com",
                    "/cats-and-kittens/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    8,
                    9
                ],
                "score": 0.4722222222222222,
                "category": "general",
                "pretty_url": "https://www.petfinder.com/cats-and-kittens/"
            },
            {
                "title": "List of Cat Breeds - Types of Cats - Cats.com",
                "content": "Cats.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Each time you make a purchase through one of our independently-chosen links, we'll receive a percentage of the proceeds. ...",
                "url": "https://cats.com/cat-Breeds",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "cats.com",
                    "/cat-Breeds",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant",
                    "duckduckgo"
                ],
                "positions": [
                    9,
                    10
                ],
                "score": 0.4222222222222222,
                "category": "general",
                "pretty_url": "https://cats.com/cat-Breeds"
            },
            {
                "title": "CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation",
                "url": "https://www.youtube.com/watch?v=hY7m5jjJ9mM",
                "content": "Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these ca...",
                "engine": "qwant",
                "parsed_url": [
                    "https",
                    "www.youtube.com",
                    "/watch",
                    "",
                    "v=hY7m5jjJ9mM",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant"
                ],
                "positions": [
                    5
                ],
                "score": 0.2,
                "category": "general",
                "pretty_url": "https://www.youtube.com/watch?v=hY7m5jjJ9mM"
            },
            {
                "title": "List of cat breeds - Wikipedia",
                "url": "https://en.wikipedia.org/wiki/List_of_cat_breeds",
                "content": "The following list of cat breeds includes only domestic cat breeds and domestic and wild hybrids.The list includes established breeds recognized by various cat registries, new and experimental breeds, landraces being established as standardized breeds, distinct domestic populations not being actively developed and lapsed (extinct) breeds.. As of 2023, The International Cat Association (TICA ...",
                "engine": "qwant",
                "parsed_url": [
                    "https",
                    "en.wikipedia.org",
                    "/wiki/List_of_cat_breeds",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "qwant"
                ],
                "positions": [
                    6
                ],
                "score": 0.16666666666666666,
                "category": "general",
                "pretty_url": "https://en.wikipedia.org/wiki/List_of_cat_breeds"
            },
            {
                "title": "List of Cat Breeds | Petfinder",
                "content": "Find The Best Cats For Your Lifestyle. Large Domestic Cat Breeds. Cutest Cat Breeds. Hairless Cat Breeds. Hypoallergenic Cat Breeds. Cat Breeds That Like Water. Best Cat Breeds for Kids. Black Cat Breeds. Fluffy Cat Breeds.",
                "url": "https://www.petfinder.com/cats-and-kittens/breeds/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.petfinder.com",
                    "/cats-and-kittens/breeds/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    10
                ],
                "score": 0.1,
                "category": "general",
                "pretty_url": "https://www.petfinder.com/cats-and-kittens/breeds/"
            },
            {
                "title": "Cat & Kitten Adoption | Petfinder",
                "content": "Cats are particularly sensitive to new surroundings and some may hide under a bed or in a closet for days or even weeks. Learn more. Finding a Cat. View All . Finding a Cat Nerdiest. Cat Names. Ever. Finding a Cat Best Cat & Cute Kitten Names. Finding a Cat Have You Started the Search for Cats and Kittens for Sale?",
                "url": "https://www.petfinder.com/cats-and-kittens/adoption/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.petfinder.com",
                    "/cats-and-kittens/adoption/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    11
                ],
                "score": 0.09090909090909091,
                "category": "general",
                "pretty_url": "https://www.petfinder.com/cats-and-kittens/adoption/"
            },
            {
                "title": "Cat Health Center | Cat Care and Information from WebMD",
                "content": "Answer: Whether their hair is long or short, cats shed -- especially in the spring and fall. To stop or clean up cat fur: Brush your long-hair cat several times a week to remove loose hairs so they don't end up on your couch. Your short-hair cat may not need as much grooming…. \". See More.",
                "url": "https://pets.webmd.com/cats/default.htm",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "pets.webmd.com",
                    "/cats/default.htm",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    12
                ],
                "score": 0.08333333333333333,
                "category": "general",
                "pretty_url": "https://pets.webmd.com/cats/default.htm"
            },
            {
                "title": "40,000+ Best Free Cat Pictures & Images [HD] - Pixabay",
                "content": "Cat Pictures & Images. 40,000+ mischievous, playful and adorable cat photos & pictures. Download your favorite royalty free cat images in HD to 4K quality as wallpapers, backgrounds & more. feline. kitten. animal. pet. dog.",
                "url": "https://pixabay.com/images/search/cat/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "pixabay.com",
                    "/images/search/cat/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    13
                ],
                "score": 0.07692307692307693,
                "category": "general",
                "pretty_url": "https://pixabay.com/images/search/cat/"
            },
            {
                "title": "What Do Cats Think About Us? You May Be Surprised - National Geographic",
                "content": "You May Be Surprised. Unlike dogs, our feline friends treat us like other cats, author says. Since cats first got their adorable claws into us about 9,500 years ago, humans have had a love affair ...",
                "url": "https://www.nationalgeographic.com/adventure/article/140127-cats-pets-animals-nation-dogs-people-science",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.nationalgeographic.com",
                    "/adventure/article/140127-cats-pets-animals-nation-dogs-people-science",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    14
                ],
                "score": 0.07142857142857142,
                "category": "general",
                "pretty_url": "https://www.nationalgeographic.com/adv[...]ets-animals-nation-dogs-people-science"
            },
            {
                "title": "Cats.com - Formerly All About Cats",
                "content": "The latest cat news, expert advice, and more. The latest research on cat health and wellness. Instant cat food recall alerts (keep your cat safe!) Exclusive product recommendations. News about cats in need. A digest of the latest videos and articles from Cats.com. Join over 50,000 cat lovers who are already in the loop — don't miss out!",
                "url": "https://cats.com/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "cats.com",
                    "/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    15
                ],
                "score": 0.06666666666666667,
                "category": "general",
                "pretty_url": "https://cats.com/"
            },
            {
                "title": "10 Amazing Facts About Cats - WorldAtlas",
                "content": "The famous flexibility of cats can be attributed to extra bones. The tail alone has 19 to 23 vertebrae - about 10% of the bones in the body! 8. Cats can run up to 30 miles per hour. Although you may think that cats are lazy because they sleep most of the time when it comes to speed they are some of the fastest animals.",
                "url": "https://www.worldatlas.com/articles/10-amazing-facts-about-cats.html",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.worldatlas.com",
                    "/articles/10-amazing-facts-about-cats.html",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    16
                ],
                "score": 0.0625,
                "category": "general",
                "pretty_url": "https://www.worldatlas.com/articles/10-amazing-facts-about-cats.html"
            },
            {
                "title": "Cats (2019 film) - Wikipedia",
                "content": "Cats is a 2019 musical fantasy film based on the 1981 stage musical of the same name by Andrew Lloyd Webber, which in turn was based on the 1939 poetry collection Old Possum's Book of Practical Cats by T. S. Eliot.The film was directed by Tom Hooper, in his second feature musical following Les Misérables (2012), from a screenplay by Lee Hall and Hooper. . It features an ensemble cast ...",
                "url": "https://en.wikipedia.org/wiki/Cats_(2019_film)",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "en.wikipedia.org",
                    "/wiki/Cats_(2019_film)",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    17
                ],
                "score": 0.058823529411764705,
                "category": "general",
                "pretty_url": "https://en.wikipedia.org/wiki/Cats_(2019_film)"
            },
            {
                "title": "40,000+ Free Cats & Animal Images - Pixabay",
                "content": "Thousands of cats images to choose from. Free high resolution picture download. tree cat silhouette. Royalty-free images. cat young animal kitten. cat kitten pet kitty. cat cat's eyes. cat animal cat portrait. cat pet licking animal. maine coon cat. cat flower kitten. cat pet licking animal. cat kitten pets. kitty playful flowers. cat tabby face.",
                "url": "https://pixabay.com/images/search/cats/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "pixabay.com",
                    "/images/search/cats/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    18
                ],
                "score": 0.05555555555555555,
                "category": "general",
                "pretty_url": "https://pixabay.com/images/search/cats/"
            },
            {
                "title": "Cats in the United States - Wikipedia",
                "content": "Domestic cats. The domestic cat ( Felis catus) is a popular pet, with an estimated 93.5 million cats kept as pets and about one third of all households in the United States keeping at least one. Eighty-seven percent of owned cats are spayed or neutered [6]",
                "url": "https://en.wikipedia.org/wiki/Cats_in_the_United_States",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "en.wikipedia.org",
                    "/wiki/Cats_in_the_United_States",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    19
                ],
                "score": 0.05263157894736842,
                "category": "general",
                "pretty_url": "https://en.wikipedia.org/wiki/Cats_in_the_United_States"
            },
            {
                "title": "Cat Breeds List - 70+ Cat Breeds with Pictures and Prices",
                "content": "Updated Jan 24, 2023 Why Do Cats Love To Climb Curtains? Updated Jan 23, 2023 8 Best Cat-Proof Blinds: Durable, Easy to Install, and Long-Lasting. View More + Cat Wallpapers (2560x1440) Paper Crane, Bubbles (1920x1300) White, Fluffy, Beautiful (1920x1200) Kitten, Cute, Look Up (2112x1188) Cartoon, Cute, Purple. View More +",
                "url": "https://www.catbreedslist.com/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.catbreedslist.com",
                    "/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    20
                ],
                "score": 0.05,
                "category": "general",
                "pretty_url": "https://www.catbreedslist.com/"
            },
            {
                "title": "Cats are so funny you will die laughing - Funny cat compilation",
                "content": "Cats are simply the funniest and most hilarious pets, they make us laugh all the time! Just look how all these cats & kittens play, fail, get along with dogs...",
                "url": "https://www.youtube.com/watch?v=5dsGWM5XGdg",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.youtube.com",
                    "/watch",
                    "",
                    "v=5dsGWM5XGdg",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    21
                ],
                "score": 0.047619047619047616,
                "category": "general",
                "pretty_url": "https://www.youtube.com/watch?v=5dsGWM5XGdg"
            },
            {
                "title": "Cats (2019) - IMDb",
                "content": "Cats: Directed by Tom Hooper. With Robbie Fairchild, Mette Narrative, Daniela Norman, Jaih Betote. A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer and come back to a new Jellicle life.",
                "url": "https://www.imdb.com/title/tt5697572/",
                "engine": "duckduckgo",
                "parsed_url": [
                    "https",
                    "www.imdb.com",
                    "/title/tt5697572/",
                    "",
                    "",
                    ""
                ],
                "template": "default.html",
                "engines": [
                    "duckduckgo"
                ],
                "positions": [
                    22
                ],
                "score": 0.045454545454545456,
                "category": "general",
                "pretty_url": "https://www.imdb.com/title/tt5697572/",
                "close_group": true
            }
        ],
        "answers": [],
        "corrections": [],
        "infoboxes": [
            {
                "infobox": "Cat",
                "id": "https://en.wikipedia.org/wiki/Cat",
                "content": "The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family. Cats are commonly kept as house pets but can also be farm cats or feral cats; the feral cat ranges freely and avoids human contact. Domestic cats are valued by humans for companionship and their ability to kill small rodents. About 60 cat breeds are recognized by various cat registries.",
                "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Collage_of_Six_Cats-01.jpg/500px-Collage_of_Six_Cats-01.jpg",
                "urls": [
                    {
                        "title": "Wikipedia",
                        "url": "https://en.wikipedia.org/wiki/Cat"
                    },
                    {
                        "title": "Wikidata",
                        "url": "http://www.wikidata.org/entity/Q146"
                    }
                ],
                "engine": "wikidata",
                "engines": [
                    "wikidata",
                    "wikipedia"
                ],
                "attributes": [
                    {
                        "label": "Start time",
                        "value": "-8000",
                        "entity": "P580"
                    }
                ]
            }
        ],
        "suggestions": [
            "house cats"
        ],
        "unresponsive_engines": [],
    
}

export default mockedResults;
