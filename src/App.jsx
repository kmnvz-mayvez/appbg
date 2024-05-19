import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from 'helpers';
import { Nav, Alert, PrivateRoute, Footer } from 'components';
import { Home } from 'home';
import { AccountLayout } from 'account';
import { Management } from 'management';

export { App };

function App() {

    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}
