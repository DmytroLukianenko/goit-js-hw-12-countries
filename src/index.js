import './styles.css';
import { refs } from './refs.js'
import countryService from './fetchCountries';
import restResultTemplate from './templates/rest-countries.hbs';
import restResultCardTemplate from './templates/country.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, notice, info, success, error } from '@pnotify/core';
var debounce = require('../node_modules/lodash');

const errorAlert = error({
    text: 'Too many matches found. Please, enter a more specfic query!',
    sticker: false,
    closer: false,
    autoOpen: false,
    delay: 2500,
})

let debounced = _.debounce(searchCountry, 500);


function searchCountry(e) {
    clearCountryCard();
    clearSearchList();
    e.preventDefault();

    let searchQuery = e.target.value;
    if (searchQuery != '') {
        countryService.fetchCountry(searchQuery).then(data => {
            if (data.length > 10) {
                errorAlert.open()
            }
            if (data.length === 1) {
                const markup = buildItemCard(data);
                insertSearchCard(markup);
            }
            if (data.length >= 1 && data.length <= 10) {
                const markup = buildSearchList(data);
                insertSearchList(markup);
            }
        });
    } else {
        let data = [];
        return data;
    }
}

function clearCountryCard() {
    refs.countryCard.innerHTML = '';
}

function clearSearchList() {
    refs.inputResult.innerHTML = '';
}

function insertSearchList(markup) {
    refs.inputResult.insertAdjacentHTML('beforeend', markup);
}

function insertSearchCard(markup) {
    refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function buildSearchList(items) {
    return restResultTemplate(items);
}

function buildItemCard(items) {
    return restResultCardTemplate(items);
}


refs.countryChoice.addEventListener('input', debounced);