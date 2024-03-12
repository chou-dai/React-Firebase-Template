import { Button, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordResetEmailFireAuthRequest } from "../services/firebase/Authentication/interface/request/PasswordResetEmailRequest";
import { sendPasswordResetMailFireAuth } from "../services/firebase/Authentication/authentication";
import ModalControl from "../components/shared/ModalControl";
import SendedEmailConfirmModalItem from "../components/shared/SendedEmailConfirmModalItem";
import { auth } from "../config/firebase";
import FlashMessage from "../components/shared/FlashMessage";

interface InputForm {
    mail: string;
}

const PasswordResetEmail: FC = () => {
    const pageTitle = "パスワード再設定";
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {handleSubmit, register,
        formState: {
            errors
        }} = useForm<InputForm>({ mode: "onSubmit" });
    
    // 認証済みアカウントかどうかを判定
    const [isAuth, setIsAuth] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged(async(account) => {
            account ? setIsAuth(true) : setIsAuth(false);
        });
    }, []);
    
    
    // パスワードの再設定を行う処理
    const sendPasswordResetMailHandler: SubmitHandler<InputForm> = async(data) => {
        // FireAuth ログイン
        const passwordResetEmailFireAuthRequest: PasswordResetEmailFireAuthRequest = {
            mail: data.mail
        };
        await sendPasswordResetMailFireAuth(passwordResetEmailFireAuthRequest)
            .then(() => setIsOpenModal(true))
            .catch(() => alert("メールの送信に失敗しました。"));
    };

    return (
        <div className="flex flex-col items-center">
            <ModalControl
                isOpen={isOpenModal}
                width="40%"
                renderInputForm={() =>
                    (<SendedEmailConfirmModalItem
                        message="お送りしたメールの内容に従ってパスワードを再設定してください。"
                        onClose={() => setIsOpenModal(false)} />
                    )}
                onClose={() => setIsOpenModal(false)}
            />
            <Typography variant="h5" gutterBottom>
                {pageTitle}
            </Typography>
            <form style={{ width: '510px', margin: 'auto', padding: '40px 60px', marginTop: "30px", border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    placeholder="メールアドレスを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("mail", { required: true })}
                />
                {errors.mail && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className="mt-7" />
                <Button
                    sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}
                    onClick={handleSubmit(sendPasswordResetMailHandler)}
                    variant="contained" color="primary"
                    fullWidth style={{ marginTop: "14px" }}    
                >
                    メールを送信
                </Button>
                {/* 認証済みでない時：ログイン画面へのリンクを設置 */}
                {!isAuth && (
                    <>
                        <p className="mt-6 text-center" style={{ color: "#221814",fontSize:"13px"}}>または</p>
                        <div className="flex justify-center">
                            <a href="/login" className="mt-6 text-center" style={{ color: "#221814",fontSize:"13px"}}>
                                ▶️すでに会員の方はこちら
                            </a>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default PasswordResetEmail;