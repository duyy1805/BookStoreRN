import axiosClient from "./axiosClient";

const book = {
    getLibrary: async () => {
        const url = `/api/book/show/downloaded`;
        return axiosClient.get(url);
    },
    postDownload: async (params) => {
        const { title } = params;
        const url = `/api/book/download`;
        return axiosClient.post(url, { title });
    },
};

export default book;
