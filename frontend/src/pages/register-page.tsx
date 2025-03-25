import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

type Currency = {
  symbol: string;
  name: string;
  code: string;
};

const CURRENCY_API_KEY = "fca_live_IvTleYhbbu5eetIBESBI6H1hVMsD4USiD9F7ypQG";
const CURRENCY_API_URL = "https://api.freecurrencyapi.com/v1/";
export const freecurrencyapi = new Freecurrencyapi(CURRENCY_API_KEY);

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await freecurrencyapi.currencies();

        const convertedData = Object.entries(data).map(
          ([code, details]: [string, any]) => ({
            code,
            symbol: details.symbol,
            name: details.name,
          }),
        );

        setCurrencies(convertedData);
      } catch (error) {
        console.error("Failed to fetch currencies:", error);
        setError("Failed to load currencies. Please refresh the page.");
      }
    };

    fetchCurrencies();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/users/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        default_currency: defaultCurrency,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="First Name"
          fullWidth
          required
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          required
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          select
          label="Default Currency"
          fullWidth
          required
          margin="normal"
          value={defaultCurrency}
          onChange={(e) => setDefaultCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.name} {currency.symbol}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop={2}>
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;
