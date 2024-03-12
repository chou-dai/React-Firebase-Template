import React, { Provider } from "react-redux";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GroupProfile, Login, PasswordResetEmail, Signup} from "./pages";
import "./styles/index.css";
import "./styles/style.scss";
import store from "./redux/config/store";
import { AuthWrapper } from "./components/layout";
import CompanyPolicy from "./pages/CompanyPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import EmailChange from "./pages/EmailChange";
import Recruitment from "./pages/Recruitment";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/signup"
                    element={
                        <AuthWrapper>
                            <Signup/>
                        </AuthWrapper>
                    }
                />
                <Route path="/login"
                    element={
                        <AuthWrapper>
                            <Login/>
                        </AuthWrapper>
                    }
                />
                <Route path="/password_reset"
                    element={
                        <AuthWrapper>
                            <PasswordResetEmail/>
                        </AuthWrapper>
                    }
                />
                <Route path="/email_change"
                    element={
                        <AuthWrapper>
                            <EmailChange/>
                        </AuthWrapper>
                    }
                />
                <Route path="/company_policy"
                    element={
                        <AuthWrapper>
                            <CompanyPolicy />
                        </AuthWrapper>
                    }
                />
                <Route path="/privacy_policy"
                    element={
                        <AuthWrapper>
                            <PrivacyPolicy />
                        </AuthWrapper>
                    }
                />
                <Route path="/contact"
                    element={
                        <AuthWrapper>
                            <Contact />
                        </AuthWrapper>
                    }
                />
                <Route path="/recruitment"
                    element={
                        <AuthWrapper>
                            <Recruitment />
                        </AuthWrapper>
                    }
                />
                <Route path="/"
                    element={
                        <AuthWrapper>
                            <GroupProfile/>
                        </AuthWrapper>
                    }
                />
            </Routes>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
