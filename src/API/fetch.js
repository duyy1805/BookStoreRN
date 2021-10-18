const fetchAPI = async (method, url, params) => {
    const listeningPORT = `http:172.20.10.3:5000`;
    const fetchUrl = listeningPORT + url;
    if (method == "get") {
        const response = await fetch(fetchUrl);

        return response.json();
    } else {
        const response = await fetch(fetchUrl, {
            method: `${method}`, // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(params), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
};
module.exports = fetchAPI;
