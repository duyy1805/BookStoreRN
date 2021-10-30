import fetchAPI from "./fetch";
const Book = {
    fetchLibrary: async (params) => {
        var items = [];
        const url = `/api/book/show/downloaded`;
        items = fetchAPI("get", url, params).then((data) => {
            return data;
        });
        return items;
        console.log(items);
    },
};
module.exports = Book;
