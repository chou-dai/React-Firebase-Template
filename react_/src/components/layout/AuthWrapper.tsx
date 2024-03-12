import { Footer, Header } from ".";
import React, { FC,  memo,  ReactNode, useEffect } from "react";
import { auth } from "../../config/firebase";
import { useAppDispatch } from "../../redux/config/hooks";
import { getGroupInfoAsync } from "../../redux/groupInfoSlice";
import { useNavigate } from "react-router";

type Props = {
    children: ReactNode;
}

// 初回レンダリング時Authユーザーかを判定するコンポーネント
const AuthWrapper: FC<Props> = memo(function authWrapper({children}: Props) {
    // Reduxにデータを保存するためのHooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const pathname = location.pathname;

    useEffect(() => {
        auth.onAuthStateChanged(async(account) => {
            // 認証されている時
            if (account) {
                // ReduxにFirestoreから取得した団体情報を保持
                dispatch(getGroupInfoAsync(account?.uid as string));
                // ログイン画面かサインアップ画面の時はホーム画面に遷移
                if (pathname.includes("login") || pathname.includes("signup")) navigate("/");
            }
            // 認証されていない時
            else {
                // ログイン画面かサインアップ画面にいる場合はそのまま
                if (pathname.includes("login") || pathname.includes("signup") || pathname.includes("password_reset")) return;
                // loginページへリダイレクト
                navigate("/login");
            }
        });
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen min-w-full flex flex-col items-center">
                <div className="flex-1 flex justify-center pt-32">
                    {(children)}
                </div>
                <div className=" w-full">
                    <Footer />
                </div>
            </div>
        </>
    );
});

export default AuthWrapper;