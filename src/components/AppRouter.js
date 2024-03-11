import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE, ORGANIZATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {/* Отображаем маршруты, доступные только для авторизованных пользователей */}
            {user.isAuth ? (
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))
            ) : (
                // Если пользователь не авторизован, перенаправляем на страницу логина
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
            )}

            {/* Отображаем маршруты, доступные для всех пользователей */}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            {/* Если пользователь авторизован, перенаправляем на страницу банковского счета */}
            {user.isAuth && (
                <Route path="*" element={<Navigate to={ORGANIZATION_ROUTE} replace />} />
            )}
        </Routes>
    );
});

export default AppRouter;
