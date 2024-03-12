import React, { ReactNode } from "react";
import { CardContent } from "@mui/material";
import { Button, Typography } from "@mui/material";

interface CompanyPolicyModalProps {
    message: ReactNode;
    onClose: () => void;
}

const SendedEmailConfirmModalItem: React.FC<CompanyPolicyModalProps> = ({ message, onClose }) => {

    return (
        <CardContent className="flex flex-col items-center">
            <Typography variant="h5" className="font-bold mb-10">
                メール送信完了
            </Typography>
            <div className="mt-3">
                {message}
            </div>
            <Button onClick={onClose} variant="contained" style={{ marginTop: "20px", width: "100%"}} sx={{ paddingX: "30px", backgroundColor: "#4682A9" }} >
                閉じる
            </Button>
        </CardContent>
    );
};

export default SendedEmailConfirmModalItem;
