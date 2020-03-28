'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    
    $('.js-error').empty();
    $('.results-list').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
    }
    $('.display-section').removeClass('hidden');
}

function getParks(baseUrl, stateArr, maxResults, apiKey) {
   
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
   
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
    $('.form').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://developer.nps.gov/api/v1'
        const stateArr = $('#user-input').val().split(",");
        const maxResults = $('#user-num-input').val();
        
        const apiKey = 'VijA4MgWxoajrK2JFejuSKrWJeF7WteSNHTyF8vc'
        getParks(baseUrl, stateArr, maxResults, apiKey);
    })
}

$(watchForm);
