import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { FiltersProvider } from './context/Filters/FiltersProvider';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </Provider>
);
