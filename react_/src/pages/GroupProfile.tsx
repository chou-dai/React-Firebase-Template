import { Avatar,Box,Button, Chip, IconButton, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import BarGraph from "../components/shared/BarGraph";
import CircleIcon from '@mui/icons-material/Circle';
import '../styles/pages/GroupProfile.css';
import ModalControl from "../components/shared/ModalControl";
import GroupInfoModalForm from "../components/pages/GroupProfile/GroupInfoModalForm";
import '../styles/index.css';
import { useAppSelector } from "../redux/config/hooks";
import { selectGroupInfo } from "../redux/groupInfoSlice";
import CategoryTagModalForm from "../components/pages/GroupProfile/CategoryTagModalForm";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateGallery } from "../services/firebase/Firestore/firestore";


const GroupProfile: FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentInputFormName, setCurrentInputFormName] = useState("");
    // Reduxから団体の情報を取得
    const groupInfo = useAppSelector(selectGroupInfo);
    console.log(groupInfo)
    function handleOpenModal(inputFormName){
        setCurrentInputFormName(inputFormName);
        setIsOpenModal(true);
    }

    const renderInputForm = () => {
        if (currentInputFormName == "GroupInfo"){
            return <GroupInfoModalForm onClose={() => setIsOpenModal(false)}/>;
        }
        if (currentInputFormName == "CategoryTag") {
            return <CategoryTagModalForm onClose={() => setIsOpenModal(false)} />;
        }
        return null;
    };
    const [images, setImages] = useState<string[]>([]);

    // groupInfo.galleryが変更されたときにimagesを更新
    useEffect(() => {
        if (groupInfo.gallery) {
            setImages(groupInfo.gallery);
        } else {
            setImages([]);
        }
    }, [groupInfo.gallery]); 

    const handleImageChange = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files[0]) {
            if (images.length >= 8) {
                alert("8枚以上の画像は登録できません。");
                return; // これ以上の処理をスキップ
            }
            // Firestoreを更新
            if(groupInfo.gallery){
                await updateGallery({ id: groupInfo.id, gallery: [...groupInfo.gallery, files[0]] }).then(() =>
                    location.replace("/")
                );
            }else{
                await updateGallery({ id: groupInfo.id, gallery: [files[0]] }).then(() =>
                    location.replace("/")
                );
            }
            
        }
    };

    const handleDeleteImage = (index) => {
        setImages(prevImages => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            updateGalleryOnBackend(updatedImages);
            return updatedImages;
        });
    };
    const updateGalleryOnBackend = async (updatedImages) => {
        try {
            await updateGallery({ id: groupInfo.id, gallery: updatedImages }).then(() => {
                location.replace("/")
            });
        } catch (error) {
            console.error("Failed to update gallery:", error);
        }
    };
    return (
        <div className="flex flex-col items-center w-full">
            <ModalControl
                isOpen={isOpenModal}
                renderInputForm={() => renderInputForm()}
                onClose={() => setIsOpenModal(false)
                }
            />
            <div className="w-full mb-10">
                <Typography variant="h5" gutterBottom>
                    団体プロフィール閲覧数
                </Typography>
                <p>アプリ完成後に、ユーザーが団体プロフィールをどのくらい閲覧しているかを確認できるようになります。</p>
                {/* <p>82 views / a day</p>
                <div className="flex justify-center items-center ">
                    <BarGraph data={[{ date: '12/12', pv: 3 }, { date: '12/13', pv: 10 }, { date: '12/14', pv: 8 }, { date: '12/15', pv: 10 }, { date: '12/16', pv: 8 }]}/>
                </div> */}
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <Avatar src={groupInfo.iconImage || ""}>
                            {!groupInfo.iconImage}
                        </Avatar>
                        <div className="ml-2">{groupInfo.name}</div>
                    </div>
                    <Button variant="contained" sx={{ paddingX: "30px", backgroundColor: "#4682A9" }} onClick={() => handleOpenModal("GroupInfo")}>団体情報編集</Button>
                </div>
                <div className= "flex justify-between w-full ">
                    <div className="mt-4 w-full flex  flex-col mr-4">
                        <div className="mt-4 w-full flex relative" style={{ paddingTop: "56.25%" }}>
                            {groupInfo.backgroundImage ? (
                                <img src={groupInfo.backgroundImage} alt="サンプル画像" className="object-cover absolute top-0 left-0 w-full h-full" />
                            ) : (
                                <div className="absolute top-0 left-0 w-full h-full bg-gray-400"></div>
                            )}
                        </div>
                        <div className= "mt-5 w-full  pl-3 pr-3">
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p>活動場所</p>
                                </div>
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.activityLocation}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p>活動人数</p>
                                </div>
                               
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.memberCount}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p>活動頻度</p>
                                </div>
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.activityFrequency}</p>
                                </div>
                                
                            </div>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p>部費(年間)</p>
                                </div>
                                
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.membershipFee}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-5 w-full  pl-3 pr-2">
                            <div className="font-bold flex justify-between mb-5">
                                <p className="bold-with-underline">連絡先・SNS</p>
                            </div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p>mail</p>
                                </div>
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.publicEmail}</p>
                                </div>
                                
                            </div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p>HP</p>
                                </div> 
                                <div className="w-1/2 ">
                                    <a href=""className="float-right">{groupInfo.homepage}</a>
                                </div>  
                            </div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p>Instagram</p>
                                </div>
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.instagram}</p>
                                </div> 
                            </div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p>X</p>
                                </div>
                               
                                <div className="w-1/2 ">
                                    <p className="float-right">{groupInfo.twitter}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p>facebook</p>
                                </div>
                                
                                <div className="w-1/2 break-words">
                                    <a className="text-blue-500 hover:underline">
                                        {groupInfo.facebook}
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 ml-4 w-full flex flex-col ">
                        <div className="flex mb-4  flex-col">
                            <div className="flex mb-4">
                                <p className="bold-with-underline">活動紹介</p>
                            </div>
                            <div className="flex-col">
                                {groupInfo.introduction && groupInfo.introduction.split('\n').map((line, index) => (
                                    line === '' ? <p key={index}>&nbsp;</p> : <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col mb-10 mt-10">
                <div className="flex justify-between w-full">
                    <Typography variant="h5" gutterBottom>
                        タグ
                    </Typography>
                    <Button variant="contained" sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}  onClick={() => handleOpenModal("CategoryTag")}>+ 追加・編集</Button>
                </div>
                <div className="flex flex-wrap w-full mt-5">
                    {groupInfo.activityStyleTags && groupInfo.activityStyleTags.length > 0 && (
                        groupInfo.activityStyleTags.map((tag, index) => (
                            <Chip key={`activity-${index}`} label={tag} className="m-1" />
                        ))
                    )}
                    {groupInfo.activityLocationTags && groupInfo.activityLocationTags.length > 0 && (
                        groupInfo.activityLocationTags.map((tag, index) => (
                            <Chip key={`activity-${index}`} label={tag} className="m-1" />
                        ))
                    )}
                    {groupInfo.memberCountTag && (
                        <Chip key="member-count" label={groupInfo.memberCountTag} className="m-1" />
                    )}
                    {groupInfo.activityFrequencyTag && (
                        <Chip key="member-count" label={groupInfo.activityFrequencyTag} className="m-1" />
                    )}
                    {groupInfo.genreTags && groupInfo.genreTags.length > 0 && (
                        groupInfo.genreTags.map((tag, index) => (
                            <Chip key={`activity-${index}`} label={tag} className="m-1" />
                        ))
                    )}
                </div>
            </div>
            <div className="flex w-full flex-col mb-10 mt-10">
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex justify-between w-full">
                        <Typography variant="h5" gutterBottom>
                            ギャラリー
                        </Typography>
                        <label htmlFor="gallery-upload">
                            <input
                                accept="image/*"
                                id="gallery-upload"
                                name="galleryImage"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <Button
                                component="span"
                                variant="contained"
                                sx={{ paddingX: "30px", backgroundColor: "#4682A9" }}>
                                + 追加・編集
                            </Button>
                        </label>
                    </div>
                </div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, width: '100%' }}>
                        {images && images.map((image, index) => (
                            <Box key={index} sx={{ position: 'relative', width: 130, height: 100 }}>
                                <IconButton
                                    onClick={() => handleDeleteImage(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0, color: 'red', zIndex: 1 }}>
                                    <DeleteIcon />
                                </IconButton>
                                <img src={image} alt={`gallery-${index}`} style={{ width: '100%', height: '100%' }} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </div>

        </div>
    );
};

export default GroupProfile;