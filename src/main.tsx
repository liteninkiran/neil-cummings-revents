import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import './app/layouts/styles.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store} >
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
