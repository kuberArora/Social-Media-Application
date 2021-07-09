import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider, isLoaded, reactReduxFirebase } from "react-redux-firebase";
import firebase from 'firebase/app';


import './index.css';
import App from './App';
import rootReducer from './store/reducer/rootReducer';
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig,firebase),
    //reactReduxFirebase(fbConfig,{useFirestoreForProfile:true,userProfile:'users'})
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div>
        Loading...
      </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider{...rrfProps}>
      <AuthIsLoaded><App /> </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);