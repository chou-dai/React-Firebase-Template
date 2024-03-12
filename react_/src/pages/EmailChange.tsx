import { Button, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdatedEmailFireAuthRequest } from "../services/firebase/Authentication/interface/request/UpdatedEmailRequest";
import { updateEmailFireAuth } from "../services/firebase/Authentication/authentication";
import ModalControl from "../components/shared/ModalControl";
import SendedEmailConfirmModalItem from "../components/shared/SendedEmailConfirmModalItem";
import FlashMessage from "../components/shared/FlashMessage";

interface InputForm {
    password: string;
    mail: string;
    mailConfirm: string;
}

const EmailChange: FC = () => {
    const pageTitle = "メールアドレス変更";
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {handleSubmit, register, getValues,
        formState: {
            errors
        }} = useForm<InputForm>({ mode: "onSubmit" });
    
    // メールアドレスの変更を行う処理
    const updateMalHandler: SubmitHandler<InputForm> = async(data) => {
        // FireAuth メール変更
        const updatedEmailFireAuthRequest: UpdatedEmailFireAuthRequest = {
            currentPassword: data.password,
            newMail: data.mail,
        };
        await updateEmailFireAuth(updatedEmailFireAuthRequest)
            .then(() => setIsOpenModal(true))
            .catch(() => alert("メールアドレスの変更に失敗しました。"));
    };

    return (
        <div className="flex flex-col items-center">
            <ModalControl
                isOpen={isOpenModal}
                width="40%"
                renderInputForm={() =>
                    (<SendedEmailConfirmModalItem
                        message="新しいメールアドレスに本人確認メールを送信しました。本人確認後、本サイトをリロードして再度ログインしてください。"
                        onClose={() => setIsOpenModal(false)} />
                    )}
                onClose={() => setIsOpenModal(false)}
            />
            <Typography variant="h5" gutterBottom>
                {pageTitle}
            </Typography>
            <form style={{ width: '510px', margin: 'auto', padding: '40px 60px', marginTop: "30px", border: '1px solid #e0e0e0', borderRadius: '4px' }}>
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
                <div className="mt-6" />
                <TextField
                    label="新しいメールアドレス"
                    variant="outlined"
                    placeholder="メールアドレスを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("mail", { required: true })}
                />
                {errors.mail && <FlashMessage errorMessage="このフィールドは必須です。" />}
                <div className="mt-6" />
                <TextField
                    label="新しいメールアドレス（確認）"
                    variant="outlined"
                    placeholder="メールアドレスを入力"
                    autoFocus
                    fullWidth
                    required
                    {...register("mailConfirm", {
                        validate: (value) => (
                            value === getValues("mail") ||
                            "メールアドレスと一致しません"
                        )
                    })}
                />
                <FlashMessage errorMessage={errors.mailConfirm?.message} />
                <div className="mt-7" />
                <Button
                    sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}
                    onClick={handleSubmit(updateMalHandler)}
                    variant="contained" color="primary"
                    fullWidth style={{ marginTop: "14px" }}    
                >
                    変更
                </Button>
            </form>
        </div>
    );
};

export default EmailChange;