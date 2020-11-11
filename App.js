import * as React from 'react';
import AppStack from "./src";
import rootReducer from "./src/reducers/index"
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension/index";
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);
function App() {
    return (
            <Provider store={store}>
                <AppStack/>
            </Provider>
    );
}

export default App;
