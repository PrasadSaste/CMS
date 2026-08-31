import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/LoginPage";

import Clients from "./pages/ClientDashboard";

import ProtectedRoute
    from "./components/ProtectedRoutes";


const App = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/clients"
                    element={

                        <ProtectedRoute>

                            <Clients />

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

};


export default App;