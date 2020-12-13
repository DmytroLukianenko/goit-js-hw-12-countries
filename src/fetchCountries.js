const baseUrl = 'https://restcountries.eu/rest/v2';
const resource = '/name/';

export default {
    fetchCountry(searchQuery) {
        return fetch(baseUrl + resource + searchQuery)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    let data = [];
                    return data;
                }
            })
            .catch(error => {
                return error;
            });
    },
};