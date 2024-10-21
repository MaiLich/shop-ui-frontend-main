import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/Routes';
import DefaultLayout from '~/layouts';

function App() {
    const [loading, setLoading] = useState(true);
    const [userLogin, setUserLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setUserLogin(true);
        }
        setLoading(false);

        const sessionID = localStorage.getItem('sessionID');
        if (token !== null || sessionID !== null) {
            setTimeout(() => {
                localStorage.clear();
                window.location.reload();
            }, 7200000);
        }

        // Lắng nghe sự thay đổi của token trong localStorage
        window.addEventListener('storage', handleLocalStorageChange);
        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);

    const handleLocalStorageChange = (event) => {
        if (event.key === 'token') {
            const token = localStorage.getItem('token');
            setUserLogin(token !== null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {userLogin &&
                        privateRoutes.map((routes, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={routes.path}
                                    element={
                                        <DefaultLayout>
                                            <routes.component />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}
                    {!userLogin &&
                        publicRoutes.map((routes, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={routes.path}
                                    element={
                                        <DefaultLayout>
                                            <routes.component />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
