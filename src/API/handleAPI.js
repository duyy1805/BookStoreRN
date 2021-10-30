const handleApi = async (apiFunction, callback = () => {}, params = {}) => {
    try {
        const data = await apiFunction(params);
        console.log(data);
        callback(data);
    } catch (error) {
        console.log("failed hanlde Api : ", error);
        callback(error);
    }
};

export default handleApi;
