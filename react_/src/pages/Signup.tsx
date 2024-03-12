import React, { FC, useState } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import CompanyPolicyModal from "../components/pages/Signup/CompanyPolicyModalItem";
import PrivacyPolicyModal from "../components/pages/Signup/PrivacyPolicyModalItem";
import { SignupFireAuthRequest } from "../services/firebase/Authentication/interface/request/SignupRequest";
import { signupFireAuth } from "../services/firebase/Authentication/authentication";
import { CreatedGroupFirestoreRequest } from "../services/firebase/Firestore/interface/request/CreatedGroupRequest";
import { saveNewGroupToFirestore } from "../services/firebase/Firestore/firestore";
import ModalControl from "../components/shared/ModalControl";
import SendedEmailConfirmModalItem from "../components/shared/SendedEmailConfirmModalItem";
import FlashMessage from "../components/shared/FlashMessage";

interface InputForm {
    name: string;
    mail: string;
    password: string;
    passwordConfirm: string;
    consent: boolean;
}

const Signup: FC = () => {
    const pageTitle = "新規会員登録";
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentInputFormName, setCurrentInputFormName] = useState("");
    const {handleSubmit, register, getValues,
        formState: {
            errors
        }} = useForm<InputForm>({ mode: "onSubmit" });


    const handleOpenModal = (inputFormName: string) => {
        setCurrentInputFormName(inputFormName);
        setIsOpenModal(true);
    };
    
    const renderInputForm = () => {
        if (currentInputFormName == "CompanyPolicy"){
            return <CompanyPolicyModal onClose={() => setIsOpenModal(false)} />;
        } else if (currentInputFormName == "PrivacyPolicy") {
            return <PrivacyPolicyModal onClose={() => setIsOpenModal(false)} />;
        } else if (currentInputFormName == "SendedEmailConfirm") {
            return (<SendedEmailConfirmModalItem 
                message="本人確認のメールを送信しました。送信メールのリンクにアクセス後、本サイトをリロードしてください。"
                onClose={() => setIsOpenModal(false)}
            />);
        }
        return null;
    };

    // サインアップの処理：Firebaseにアカウント追加 → Firestoreに団体情報を保存 → "/"にパージ遷移
    const signupHandler: SubmitHandler<InputForm> = async(data) => {
        // FireAuth サインアップ
        const signupFireAuthRequest: SignupFireAuthRequest = {
            mail: data.mail,
            password: data.password,
        };
        const authId = await signupFireAuth(signupFireAuthRequest);
        // 認証できなかった場合：処理終了
        if (!authId) return;
        // Firestore 団体情報保存
        const createdGroupRequest: CreatedGroupFirestoreRequest = {
            authId: authId,
            name: data.name,
            mail: data.mail,
        };
        await saveNewGroupToFirestore(createdGroupRequest).then(() => {
            handleOpenModal("SendedEmailConfirm");
        });
    };

    return (
        <div className="flex flex-col items-center">
            <ModalControl
                isOpen={isOpenModal}
                width="40%"
                renderInputForm={() => renderInputForm()}
                onClose={() => setIsOpenModal(false)}
            />
            <Typography variant="h5" gutterBottom style={{ color: "#221814" }}>
                {pageTitle}
            </Typography>
            <form style={{ width: "510px", margin: "auto", padding: "40px 60px", marginTop: "30px", border: "1px solid #e0e0e0", borderRadius: "4px" }}>
                <TextField
                    label="団体名"
                    variant="outlined"
                    placeholder="団体名を入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("name", { required: true })}
                />
                {errors.name && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className="mt-4" />
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    placeholder="メールアドレスを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("mail", { required: true })}
                />
                {errors.password && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className="mt-4" />
                <TextField
                    label="パスワード（8文字以上）"
                    type="password"
                    variant="outlined"
                    placeholder="パスワードを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("password", { pattern: /\w{8,}/, required: true })}
                />
                {errors.password && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className="mt-4" />
                <TextField
                    label="パスワード（確認）"
                    type="password"
                    variant="outlined"
                    placeholder="パスワードを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("passwordConfirm", {
                        validate: (value) => (
                            value === getValues("password") ||
                            "パスワードと一致しません"
                        )
                    })}
                />
                <FlashMessage errorMessage={errors.passwordConfirm?.message} />
                <div className="flex items-center mt-4">
                    <Checkbox {...register("consent", { required: true })}/>
                    <p style={{ color: "#221814",fontSize:"13px"}} >
                        <span onClick={() => handleOpenModal("CompanyPolicy")} style={{ color: "#4169E1" }} className="cursor-pointer">利用規約</span>
                        と
                        <span onClick={() => handleOpenModal("PrivacyPolicy")} style={{ color: "#4169E1" }} className="cursor-pointer">プライバシーポリシー</span>
                        に同意します
                    </p>
                </div>
                {errors.consent && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <Button
                    sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}
                    onClick={handleSubmit(signupHandler)}
                    variant="contained" color="primary"
                    fullWidth style={{ marginTop: "14px" }}    
                >
                    新規登録
                </Button>
                <p className="mt-6 text-center" style={{ color: "#221814",fontSize:"13px"}}>または</p>
                <div className="flex justify-center">
                    <a href="/login" className="mt-6 text-center" style={{ color: "#221814",fontSize:"13px"}}>
                        ▶️すでに会員の方はこちら
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Signup;