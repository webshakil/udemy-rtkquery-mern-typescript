import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from './api/userAPI'
import { userReducer } from './reducer/userReducer'
import { productAPI } from './api/productAPI'


export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]:userReducer.reducer,
    [productAPI.reducerPath]:productAPI.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,

    }).concat(userAPI.middleware,productAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>






















































// import { configureStore } from '@reduxjs/toolkit';
// import { userAPI } from './api/userAPI';
// import { userReducer } from './reducer/userReducer';


// export const store = configureStore({
//   reducer: {
//     [userAPI.reducerPath]: userAPI.reducer,
//     [userReducer.name]: userReducer.reducer  // Add userReducer to the store
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(userAPI.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;

