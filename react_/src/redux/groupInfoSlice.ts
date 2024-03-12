// https://qiita.com/ryocha12/items/76acbf02e9e73bb0c5ec 参考
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./config/store";
import { getGroupInfoFromFirestore } from "../services/firebase/Firestore/firestore";
import { GroupInfoFirestoreResponse } from "../services/firebase/Firestore/interface/response/GroupInfoResponse";

// Reduxに保存する初期値
const initialState: GroupInfoFirestoreResponse = {
    id: "",
    authId: "",
    name: "",
    mail: "",
    publicEmail: "",
    category1: "",
    category2: "",
    schoolName: "",
    memberCount: "",
    activityLocation: "",
    activityFrequency: "",
    membershipFee: "",
    introduction: "",
    homepage: "",
    instagram: "",
    twitter: "",
    facebook: "",
    backgroundImage: "",
    iconImage: "",
    activityStyleTags: [],
    activityLocationTags: [],
    genreTags: [],
    memberCountTag: "",
    activityFrequencyTag: "",
    gallery: []
};

// Reduxにデータを保存するための関数（各コンポーネントからdispatchで呼び出し）
export const getGroupInfoAsync = createAsyncThunk("getGroupInfo", async (authId: string) => {
    const GroupInfo = await getGroupInfoFromFirestore(authId);
    return GroupInfo;
});


export const groupInfoSlice = createSlice({
    name: "getGroupInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroupInfoAsync.fulfilled, (state, action) => {
                return (state = {
                    ...action.payload,
                });
            })
            .addCase(getGroupInfoAsync.rejected, () => {
                alert("団体情報取得に失敗しました。");
            });
    }
});

// セレクター：コンポーネントから呼び出して団体情報を取得
export const selectGroupInfo = (state: RootState) => state.groupInfo;
export default groupInfoSlice.reducer;