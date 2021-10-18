const handleApi = async (apiFunction, callback = () => {}, params = {}) => {
    try {
        const response = await apiFunction(params);
        console.log(response);
        callback(response);
    } catch (error) {
        console.log("failed hanlde Api : ", error);
        callback(error);
    }
};

export default handleApi;
