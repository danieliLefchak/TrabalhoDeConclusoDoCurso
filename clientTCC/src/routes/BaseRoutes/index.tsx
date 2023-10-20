import AuthService from "../../services/AuthService";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { SignRoutes } from "../SignRoutes";

export function BaseRoutes() {
    const isAuthenticated = AuthService.isAuthenticated();

    return isAuthenticated ? <AuthenticatedRoutes /> : <SignRoutes />;
}