import * as React from 'react';
import { HelmetProvider } from 'react-helmet-async';
// the two css files are needed to render the messages
// the css files needs to be here or in index.js
// but if it's in index.js, it might not work for tests that are wrapped
import 'simplebar/src/simplebar.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar transition={Slide} />
      <Provider store={store}>{children}</Provider>
    </HelmetProvider>
  );
}
