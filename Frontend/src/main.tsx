import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
                <App/>
                <ToastContainer/>
        </Provider>
    </BrowserRouter>
)
