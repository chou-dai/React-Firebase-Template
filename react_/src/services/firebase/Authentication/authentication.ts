import {EmailAuthProvider, User, createUserWithEmailAndPassword, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, verifyBeforeUpdateEmail} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { SignupFireAuthRequest } from "./interface/request/SignupRequest";
import { LoginFireAuthRequest } from "./interface/request/LoginRequest";
import { PasswordResetEmailFireAuthRequest } from "./interface/request/PasswordResetEmailRequest";
import { UpdatedEmailFireAuthRequest } from "./interface/request/UpdatedEmailRequest";

// 新しい団体をfirebase authenticationにサインアップ
export const signupFireAuth = async(data: SignupFireAuthRequest) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.mail, data.password);
        // await sendEmailVerification(userCredential.user as User);
        const id = userCredential.user.uid;
        return id;
    } catch {
        alert("アカウントは既に存在しています。");
    }
};

// firebase authentication ログイン
export const loginFireAuth = async(data: LoginFireAuthRequest) => {
    let id = "";
    await signInWithEmailAndPassword(auth, data.mail, data.password)
        .then((res) => id = res.user.uid)
        .catch(() => alert("アカウントが存在しません。"));
    return id;
};

// firebase authentication パスワード再設定メール送信
export const sendPasswordResetMailFireAuth = async(data: PasswordResetEmailFireAuthRequest) => {
    const url = location.protocol + "//" + location.host;
    const actionCodeSettings = {
        // パスワード再設定後のリダイレクト URL
        url: `${url}/login`,
        handleCodeInApp: false,
    };
    await sendPasswordResetEmail(auth, data.mail, actionCodeSettings);
};

// firebase authentication メール変更
export const updateEmailFireAuth = async(data: UpdatedEmailFireAuthRequest) => { 
    const user = auth.currentUser as User;
    await verifyBeforeUpdateEmail(user, data.newMail);
};

// firebase authentication ログアウト
export const signOutFireAuth = async() => {       
    await signOut(auth)
        .then(() => location.replace("/login"))
        .catch(() => alert("ログアウトに失敗しました。"));
};