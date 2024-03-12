import React, {FC, memo, useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Tab, Tabs } from "@mui/material";
import '../../styles/index.css';
import '../../styles/components/layout/Header.css';
import { signOutFireAuth } from "../../services/firebase/Authentication/authentication";
import { useAppSelector } from "../../redux/config/hooks";
import { selectGroupInfo } from "../../redux/groupInfoSlice";


const Header: FC = memo(function Header() {
    const siteTitle = "Circus";
    const [isSupportButton, setIsSupportButton] = useState(false);
    const [isMyPageButton, setIsMyPageButton] = useState(false);
    const supportPageButton = document.getElementById('support-page-button');
    const myPageButton = document.getElementById('mypage-button');
    // Reduxから団体の情報を取得
    const groupInfo = useAppSelector(selectGroupInfo);
    
    function updateHoverState() {
        if (isSupportButton && supportPageButton) {
            supportPageButton.classList.add('hover-effect');
        } else if (!isSupportButton && supportPageButton){
            supportPageButton.classList.remove('hover-effect');
        }
        if (isMyPageButton && myPageButton) {
            myPageButton.classList.add('hover-effect');
        } else if (!isMyPageButton && myPageButton) {
            myPageButton.classList.remove('hover-effect');
        }
    }
    function signOut() {
        signOutFireAuth();
    }
    useEffect(() => {
        updateHoverState();
    }, [isSupportButton, isMyPageButton]);
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" style={{ backgroundColor: "#91C8E4",padding:"8px"}}>
                    <Toolbar variant="dense" className="flex justify-between" sx={{marginRight:"60px"}}>
                        <Typography color="inherit w-1/4" component="div" >
                            <h1 className="inconsolataFont font-bold" style={{ color: "#515151",fontSize:"19px"}}>{siteTitle}</h1>
                        </Typography>
                        <Tabs className="flex justify-around w-2/4">
                            <Tab id="group-page-button" label="団体プロフィール" href="/" sx={{ color: "#515151", fontSize: "14px", marginX: "60px"}} />
                            <Tab id="recruit-page-button" label="募集ページ" href="/recruitment" sx={{ color: "#515151", fontSize: "14px", marginX: "60px" }} />
                            <Tab id="support-page-button" label="サポート" sx={{ color: "#515151", fontSize: "14px", marginX: "60px" }}
                                onMouseEnter={() => setIsSupportButton(true)}
                                onMouseLeave={() => setIsSupportButton(false)}
                             />
                        </Tabs>
                        <Typography className="flex justify-around  items-center" id="mypage-button"  variant="h6" color="inherit" component="div" 
                            onMouseEnter={() => setIsMyPageButton(true)}
                            onMouseLeave={() => setIsMyPageButton(false)}
                        >
                            <Avatar src={groupInfo.iconImage || ""}>
                                {!groupInfo.iconImage}
                            </Avatar>
                            <p className="inconsolataFont font-bold" style={{ color: "#515151", fontSize: "15px" }}>{groupInfo.name}</p>
                        </Typography>
                    </Toolbar>
                    {isSupportButton  && (
                        <Toolbar variant="dense" className="flex justify-between " sx={{ paddingTop: "10px", justifyContent: "center" }}
                            onMouseEnter={() => setIsSupportButton(true)}
                            onMouseLeave={() => setIsSupportButton(false)}
                        >
                            <Tab id="group-page-button" label="利用規約" href="/company_policy" sx={{ color: "black", fontSize: "12px" ,marginX:"20px"}} />
                            <Tab id="group-page-button" label="プライバシーポリシー" href="/privacy_policy" sx={{ color: "black", fontSize: "12px", marginX: "20px" }} />
                            <Tab id="group-page-button" label="お問い合わせ" href="/contact" sx={{ color: "black", fontSize: "12px", marginX: "20px" }} />
                                
                        </Toolbar>
                    )}
                    {isMyPageButton && (
                        <Toolbar variant="dense" className="flex justify-between " sx={{ paddingTop: "10px", justifyContent: "center" }}
                            onMouseEnter={() => setIsMyPageButton(true)}
                            onMouseLeave={() => setIsMyPageButton(false)}
                        >
                            <Tab id="group-page-button" label="メールアドレス変更" href="/email_change" sx={{ color: "black", fontSize: "12px", marginX: "20px" }} />
                            <Tab id="group-page-button" label="パスワード再設定" href="/password_reset" sx={{ color: "black", fontSize: "12px", marginX: "20px" }} />
                            <Tab id="group-page-button" label="ログアウト" onClick={signOut} sx={{ color: "black", fontSize: "12px", marginX: "20px" }} />
                        </Toolbar>
                    )}
                    
                </AppBar>
            </Box>
        </header>
    );
});

export default Header;