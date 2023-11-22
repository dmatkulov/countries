import ReactDOM from 'react-dom/client';
import App from './containers/App';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.com/v2/';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
);
