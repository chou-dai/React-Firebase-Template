import {  Box, Button, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import '../styles/pages/Recruitment.css';
import ModalControl from "../components/shared/ModalControl";
import '../styles/index.css';
import RecruitmentInfoModalForm from "../components/pages/Recruitment/RecruitmentInfoModalForm";


const Recruitment: FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentInputFormName, setCurrentInputFormName] = useState("");

    const renderInputForm = () => {
        if (currentInputFormName == "RecruitmentInfo"){
            return <RecruitmentInfoModalForm onClose={() => setIsOpenModal(false)} />;
        }
        return null;
    };
    function handleOpenModal(inputFormName) {
        setCurrentInputFormName(inputFormName);
        setIsOpenModal(true);
    }

    const [images, setImages] = useState<string[]>([]);
    return (
        <div className="flex flex-col items-center w-full">
            <ModalControl
                isOpen={isOpenModal}
                renderInputForm={() => renderInputForm()}
                onClose={() => setIsOpenModal(false)
                }
            />
            <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="items-center mr-20">
                        <Typography variant="h5" gutterBottom>
                            募集
                        </Typography>
                        <p>募集ページを作成することで、メンバーを募集することができます</p>
                    </div>
                    <Button variant="contained" sx={{marginLeft:"50px",paddingX: "30px", backgroundColor: "#4682A9" }} onClick={() => handleOpenModal("RecruitmentInfo")}>+ 作成・編集・非公開</Button>
                </div>          
            </div>  
            <div className="flex justify-between w-full mt-10">
                <Box
                    sx={{
                        width: 45, 
                        height: 45, 
                        backgroundColor: '#4682A9', 
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '20px', 
                    }}
                >
                    例
                </Box>
                <div className="flex">
                    <img src={"../../public/recruitment_example1.png"} alt={`recruitment-example`}  style={{height:"400px"}}/>
                    <img src={"../../public/recruitment_example2.png"} alt={`recruitment-example`} style={{ height: "700px" }} />
                </div>
            </div>
        </div>
    );
};

export default Recruitment;