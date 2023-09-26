import { NavBar } from "../../components/NavBar";
import { Routes, Route } from 'react-router-dom'
import { HomePage } from "../../pages/HomePage";

export function AuthenticatedRoutes() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}