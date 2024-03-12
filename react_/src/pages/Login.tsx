import { Button, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFireAuth } from "../services/firebase/Authentication/authentication";
import { LoginFireAuthRequest } from "../services/firebase/Authentication/interface/request/LoginRequest";
import FlashMessage from "../components/shared/FlashMessage";

export interface InputForm {
    mail: string;
    password: string;
}

const Login: FC = () => {
    const pageTitle = "ログイン";
    const {handleSubmit, register,
        formState: {
            errors
        }} = useForm<InputForm>({ mode: "onSubmit" });

    // サインアップの処理：Firebaseでログイン→ "/"にパージ遷移
    const loginHandler: SubmitHandler<InputForm> = async(data) => {
        const LoginFireAuthRequest: LoginFireAuthRequest = {
            mail: data.mail,
            password: data.password
        };
        const id = await loginFireAuth(LoginFireAuthRequest);
        // 認証できればページ遷移
        if (id) location.replace("/");
    };

    return (
        <div className="flex flex-col items-center">
            <Typography variant="h5" gutterBottom>
                {pageTitle}
            </Typography>
            <form style={{ width: '510px', margin: 'auto', padding: '50px 60px', marginTop: "30px", border: '1px solid #e0e0e0', borderRadius: '4px' }}>
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
                <div className="mt-4" />
                <TextField
                    label="パスワード"
                    variant="outlined"
                    type="password"
                    placeholder="パスワードを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("password", { required: true })}
                />
                {errors.password && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className=" flex justify-end mt-1">
                    <a href="/password_reset" style={{ color: "#221814",fontSize:"13px"}} >パスワードを忘れた方はこちら</a>
                </div>
                <div className="mt-5" />
                <Button
                    sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}
                    onClick={handleSubmit(loginHandler)}
                    variant="contained" color="primary"
                    fullWidth style={{ marginTop: "14px" }}    
                >
                    ログイン
                </Button>
            </form>
        </div>
    );
};

export default Login;