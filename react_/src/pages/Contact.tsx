import { Container, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import '../styles/pages/Contact.css';


const Contact: FC = () => {

    return (
        <Container className="flex flex-col items-center w-[80%] ">
            <Paper className="p-8 my-10">
                <Typography variant="h4" className="font-bold mb-4">
                    お問い合わせ
                </Typography>
                <Typography paragraph>
                    ご意見、ご質問、苦情のお申出その他個人情報の取扱いに関するお問い合わせは、下記の窓口までご連絡ください。
                </Typography>
                <Typography paragraph>
                    <p>e-mail：circus.plat@gmail.com</p>
                </Typography>
            </Paper>
        </Container>

    );
};

export default Contact;