import { Container} from '@mui/material';
import { RegisterForm } from '../components/register-form';
import { LoginForm } from '../components/login-form';
import React, { useState } from 'react';

export const HomePage = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Container maxWidth="sm">
            <LoginForm/>
        </Container>
    )
}