import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import {persistor} from './redux/store/store';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
                <ToastContainer/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)
