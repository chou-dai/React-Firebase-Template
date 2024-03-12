import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import groupInfoReducer from "../groupInfoSlice";

// ReduxのStore
const store = configureStore({
    reducer: {
        // ここに保存！！
        groupInfo: groupInfoReducer
    }
});

// Storeの型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;