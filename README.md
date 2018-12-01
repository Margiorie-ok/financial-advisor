This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Financial Advisor

### `Getting Started`

These instructions will get you a copy of the project up and running on your local machine for development purposes.

#### `Prerequisites`

1. [NodeJS](https://nodejs.org/en/)</br>
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### `Installation`
1. Clone this repository, following [this instructions](https://help.github.com/articles/cloning-a-repository/)
2. Using te terminal, from the project folder run `npm install` an then `npm start`

### `Get your own OpenWeatherMap API key `

1. Folow [this instructions] https://home.openweathermap.org/users/sign_up
2. In `src/redux/sagas/weatherSaga.js` insert your API key `http://api.openweathermap.org/data/2.5/forecast?q=${action.cityName}&APPID=`**YOUR_API_KEY**


