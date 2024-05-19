import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register } from './';
import { Header } from 'components/Header';

export { AccountLayout };

function AccountLayout() {
    const auth = useSelector(x => x.auth.value);

    if (auth) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2 mt-5">
                        <Routes>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}
