import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userAPI";
import Footer from "./components/Footer";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then((data) => {
                user.setUser(data);
                user.setIsAuth(true);

            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    user.setUser("");
                    user.setIsAuth(false);
                } else {
                    console.error(error);
                }
            })
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
          <AppRouter/>
            <Footer />
        </BrowserRouter>
    );
});

export default App;
