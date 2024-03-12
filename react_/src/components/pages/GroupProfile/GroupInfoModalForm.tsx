import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid } from "@mui/material";
import FlashMessage from '../../shared/FlashMessage';
import { useAppSelector } from "../../../redux/config/hooks";
import { selectGroupInfo } from "../../../redux/groupInfoSlice";
import { updateGroupInfo } from '../../../services/firebase/Firestore/firestore';


const GroupInfoModalForm = ({ onClose }) => {
    const groupInfo = useAppSelector(selectGroupInfo);
    const [formData, setFormData] = useState({
        id: groupInfo?.id,
        name: groupInfo?.name || '',
        category1: groupInfo?.category1 || '',
        category2: groupInfo?.category2 || '',
        schoolName: groupInfo?.schoolName || '',
        memberCount: groupInfo?.memberCount || '',
        activityLocation: groupInfo?.activityLocation || '',
        activityFrequency: groupInfo?.activityFrequency || '',
        membershipFee: groupInfo?.membershipFee || '',
        introduction: groupInfo?.introduction || '',
        publicEmail: groupInfo?.publicEmail || '',
        homepage: groupInfo?.homepage || '',
        instagram: groupInfo?.instagram || '',
        twitter: groupInfo?.twitter || '',
        facebook: groupInfo?.facebook || '', 
        backgroundImage: groupInfo?.backgroundImage || '',
        iconImage: groupInfo?.iconImage || ''
    });
    const [errors, setErrors] = useState({});
    const [iconPreview, setIconPreview] = useState<string | null>(groupInfo?.iconImage || null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(groupInfo?.backgroundImage || null);

    const handleIconChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
        if (files[0]) {
            setIconPreview(URL.createObjectURL(files[0]));

        }
    };

    const handleBackgroundChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
        console.log(name)
        if (files[0]) {
            setBackgroundPreview(URL.createObjectURL(files[0]));
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // フォームの送信を防ぎます。
        await updateGroupInfo(formData).then(() =>
            location.replace("/")
        );
        onClose(false); // モーダルを閉じる
        console.log(formData);
        
    };


    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (files) {
           
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                学生に表示される団体紹介ページ及び検索に使用されます。
            </Typography>
            <Typography variant="body2">
                <p style={{color:"red",fontSize:"16px"}}>以下の項目を全て登録することで、Circusアプリ内にてメンバーを募集できます。</p>
            </Typography>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="団体名"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="団体名を入力"
                value={formData.name}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['name']}
            />
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <FormControl component="fieldset" sx={{ mt: 3 }}>
                        <FormLabel component="legend">カテゴリ1</FormLabel>
                        <RadioGroup
                            row
                            aria-label="category1"
                            name="category1"
                            value={formData.category1}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="公認" control={<Radio />} label="公認" />
                            <FormControlLabel value="非公認" control={<Radio />} label="非公認" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <FlashMessage
                    errorMessage={errors['category1']}
                />
                <Grid item>
                    <FormControl component="fieldset" sx={{ mt: 3 }}>
                        <FormLabel component="legend">カテゴリ2</FormLabel>
                        <RadioGroup
                            row
                            aria-label="category2"
                            name="category2"
                            value={formData.category2}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="サークル・団体" control={<Radio />} label="サークル・団体" />
                            <FormControlLabel value="インカレサークル・団体" control={<Radio />} label="インカレサークル・団体" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <FlashMessage
                    errorMessage={errors['category2']}
                />
            </Grid>
            <TextField
                margin="dense"
                id="schoolName"
                name="schoolName"
                label="学校名"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="学校名を入力"
                value={formData.schoolName}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['schoolName']}
            />
            <TextField
                margin="dense"
                id="memberCount"
                name="memberCount"
                label="活動人数"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="活動人数を入力"
                value={formData.memberCount}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['memberCount']}
            />
            <TextField
                margin="dense"
                id="activityLocation"
                name="activityLocation"
                label="活動場所"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="活動場所を入力"
                value={formData.activityLocation}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['activityLocation']}
            />
            <TextField
                margin="dense"
                id="activityFrequency"
                name="activityFrequency"
                label="活動頻度"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="活動頻度を入力"
                value={formData.activityFrequency}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['activityFrequency']}
            />
            <TextField
                margin="dense"
                id="membershipFee"
                name="membershipFee"
                label="部費(年間)"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="部費(年間)を入力"
                value={formData.membershipFee}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <FlashMessage
                errorMessage={errors['membershipFee']}
            />
            <TextField
                margin="dense"
                id="introduction"
                name="introduction"
                label="紹介文"
                multiline
                rows={4}
                type="text"
                fullWidth
                variant="outlined"
                placeholder="紹介文を入力"
                value={formData.introduction}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            
            <FlashMessage
                errorMessage={errors['introduction']}
            />
            <Typography variant="body2"className='pt-7'>
                <p style={{ fontSize: "16px" }}>以下に登録した連絡先またはSNSは、メンバー募集の投稿にて公開されます。</p>
                <p style={{ fontSize: "16px" }}> 学生と連絡が取れるよう、連絡先またはSNSを一つ以上登録してください。</p>
            </Typography>
            <FlashMessage
                errorMessage={errors['contact']}
            />
            <TextField
                margin="dense"
                id="publicEmail"
                name="publicEmail"
                label="メールアドレス"
                type="publicEmail"
                fullWidth
                variant="outlined"
                placeholder="メールアドレスを入力"
                value={formData.publicEmail}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <TextField
                margin="dense"
                id="homepage"
                name="homepage"
                label="HP"
                type="url"
                fullWidth
                variant="outlined"
                placeholder="HPのURLを入力"
                value={formData.homepage}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <TextField
                margin="dense"
                id="instagram"
                name="instagram"
                label="Instagram"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="Instagramのアカウント名を入力"
                value={formData.instagram}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <TextField
                margin="dense"
                id="twitter"
                name="twitter"
                label="Twitter"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="Twitterのアカウント名を入力"
                value={formData.twitter}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <TextField
                margin="dense"
                id="facebook"
                name="facebook"
                label="Facebook"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="FacebookのページURLを入力"
                value={formData.facebook}
                onChange={handleChange}
                sx={{ mt: 3 }}
            />
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>プロフィール写真(アイコン)</Typography>
                <label htmlFor="icon-upload">
                    <input
                        accept="image/*"
                        id="icon-upload"
                        type="file"
                        name="iconImage"
                        style={{ display: 'none' }}
                        onChange={handleIconChange}
                    />
                    <Button variant="contained" component="span" sx={{ backgroundColor: "#4682A9" }}>
                        + アップロード
                    </Button>
                </label>
            </Box>
            {iconPreview && (
                <img src={iconPreview} alt="Icon Preview" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
            )}
            <FlashMessage
                errorMessage={errors['iconImage']}
            />

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography>プロフィール写真(背景)</Typography>
                    <Typography variant="caption">(注意)縦横比9:16推奨</Typography>
                </Box>
                <label htmlFor="background-upload">
                    <input
                        accept="image/*"
                        id="background-upload"
                        name="backgroundImage"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleBackgroundChange}
                    />
                    <Button variant="contained" component="span" sx={{ backgroundColor: "#4682A9" }}>
                        + アップロード
                    </Button>
                </label>
            </Box>
            {backgroundPreview && (
                <img src={backgroundPreview} alt="Background Preview" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
            )}
            <FlashMessage
                errorMessage={errors['backgroundImage']}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#4682A9" }}
                onSubmit={handleSubmit}
            >
                登録(公開)
            </Button>
        </Box>
    );
};

export default GroupInfoModalForm;
