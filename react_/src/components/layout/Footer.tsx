import React, { FC, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Link, Tab, Tabs } from "@mui/material";
import '../../styles/index.css';


const Footer: FC = memo(function Footer() {

    return (
        <footer className=" bottom-0 inset-x-0 bg-blue-300 ">
            <Container className="pt-5 pb-5" maxWidth="lg" style={{ backgroundColor: '#91C8E4', color: "#515151" }}>
                <Toolbar className="flex justify-between p-4">
                    <div className="w-1/3" style={{textAlign:"center"}}>
                        <h3 className="inconsolataFont font-bold" style={{ color: "#515151", fontSize: "19px"}}>Circus</h3>
                    </div>
                    <div className="flex justify-between  w-full">
                        <div className="flex flex-col  h-full w-full" style={{ marginLeft: "35% "}}>
                            <div className="ml-30">
                                <div className="mb-2 font-bold">
                                    <h3>団体ページ</h3>  
                                </div>
                                <div className="flex flex-col" style={{ paddingTop: "10px", marginBottom: "10px", fontSize: "12px" }}>
                                    <Link href="#プロフィール" color="inherit" style={{ paddingLeft: '1px', paddingTop: '1px', textDecoration: 'none' }}>
                                        プロフィール
                                    </Link>
                                    <Link href="#募集" color="inherit" style={{ paddingLeft: '1px', paddingTop: '5px', textDecoration: 'none' }}>
                                        募集
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col  justify-center h-full w-full">
                            <div>
                                <div className="mb-2 font-bold">
                                    <h3>団体ページ</h3>
                                </div>
                                <div className="flex flex-col" style={{ paddingTop: "10px", marginBottom: "10px", fontSize: "12px" }}>
                                    <Link href="/company_policy" color="inherit" style={{ paddingLeft: '1px', paddingTop: '1px', textDecoration: 'none' }}>
                                        利用規約
                                    </Link>
                                    <Link href="/privacy_policy" color="inherit" style={{ paddingLeft: '1px', paddingTop: '5px', textDecoration: 'none' }}>
                                        プライバシーポリシー
                                    </Link>
                                    <Link href="/contact" color="inherit" style={{ paddingLeft: '1px', paddingTop: '5px', textDecoration: 'none' }}>
                                        お問い合わせ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </Toolbar>
            </Container>
        </footer>

    );
});

export default Footer;