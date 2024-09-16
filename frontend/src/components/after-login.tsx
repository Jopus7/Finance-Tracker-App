import { useLocation } from "react-router-dom";

export const AfterLogin = () => {
    const location = useLocation();
    const token = location.state?.token;
    return (
        <div>{token}</div>
    )
} 