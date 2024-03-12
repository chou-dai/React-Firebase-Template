import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid } from "@mui/material";
import FlashMessage from '../../shared/FlashMessage';
import { useAppSelector } from "../../../redux/config/hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectGroupInfo } from '../../../redux/groupInfoSlice';
import { CreatedRecruitmentFrirestoreRequest } from '../../../services/firebase/Firestore/interface/request/CreatedRecruitmentRequest';
import { createRecruitment } from '../../../services/firebase/Firestore/firestore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RecruitmentInfoModalForm = ({ onClose }) => {
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const groupInfo = useAppSelector(selectGroupInfo);

    const [formData, setFormData] = useState<CreatedRecruitmentFrirestoreRequest>({
        id: "",
        groupId: groupInfo?.id,
        title: "",
        recruitment_details: "",
        deadline: "",
        image: "",
        isPublic: true,
    });

    const handleImageChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
        if (files[0]) {
            setImagePreview(URL.createObjectURL(files[0]));

        }
    };


    const handleDeadlineChange = (event: dayjs.Dayjs | null) => {
        setFormData(prevState => ({
            ...prevState,
            deadline: `${event?.format("YYYY/MM/DD")}`
        }));
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (!files) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // formData に対するバリデーションを実行し、エラーがあれば設定する
    const validateFormData = () => {
        let isErrorFlag = false;
        const fields = ["title", "recruitment_details", "deadline"];
        fields.forEach(field => {
            if (!formData[field]) {
                isErrorFlag = true;
                // エラーメッセージを設定
                setErrors(prev => ({...prev, [field]: "必須項目です。"}));
            }
        });
        console.log(isErrorFlag);
        return isErrorFlag;
    };

    const handleSubmit = async () => {
        
        if (!validateFormData()) {
            await createRecruitment(formData).then(() =>
                location.replace("/recruitment")
                
            );
            onClose(false); // モーダルを閉じる
        }
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                学生に表示される団体紹介ページ及び検索に使用されます。
            </Typography>
            <Typography variant="body2">
                <p style={{ color: "red", fontSize: "16px" }}>以下の項目を全て登録することで、Circusアプリ内にてメンバーを募集できます。</p>
            </Typography>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="見出し"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="テキスト"
                sx={{ mt: 3 }}
                onChange={handleChange}
            />
            <FlashMessage
                errorMessage={errors['title']}
            />
            <TextField
                margin="dense"
                id="recruitment_details"
                name="recruitment_details"
                label="募集文"
                multiline
                rows={4}
                type="text"
                fullWidth
                variant="outlined"
                placeholder="文字制限なし"
                sx={{ mt: 3 }}
                onChange={handleChange}
            />
            <FlashMessage
                errorMessage={errors['recruitment_details']}
            />
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>募集締切日</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField', 'DatePicker']}>
                        <DatePicker
                            format="YYYY/MM/DD"
                            value={formData.deadline ? dayjs(formData.deadline) : null}
                            onChange={handleDeadlineChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            <FlashMessage
                errorMessage={errors['deadline']}
            />
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography>写真</Typography>
                    <Typography variant="caption">(注意)縦横比9:16推奨</Typography>
                </Box>
                <label htmlFor="background-upload">
                    <input
                        accept="image/*"
                        id="background-upload"
                        name="image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <Button variant="contained" component="span" sx={{ backgroundColor: "#4682A9" }}>
                        + アップロード
                    </Button>
                </label>
            </Box>
            {imagePreview && (
                <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
            )}
            <FlashMessage
                errorMessage={errors['image']}
            />
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                <FormControl component="fieldset" sx={{ mt: 3 }}>
                    <FormLabel component="legend">公開/非公開</FormLabel>
                    <RadioGroup
                        row
                        aria-label="isPublic"
                        name="isPublic"
                        value={formData.isPublic}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="公開" />
                        <FormControlLabel value={false} control={<Radio />} label="非公開" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <FlashMessage
                errorMessage={errors['isPublic']}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#4682A9" }}
                onClick={handleSubmit}
            >
                登録
            </Button>
        </Box>
    );
};

export default RecruitmentInfoModalForm;
