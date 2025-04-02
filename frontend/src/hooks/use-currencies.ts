import { Currency } from "../types";
import { currencyApi } from "../api/currency-api";
import { useState, useEffect } from 'react';


export function useCurrencies() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [isCurrencyLoading, setIsLoading] = useState<boolean>(true)
    const [currencyError, setError] = useState("");


    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
            const { data } = await currencyApi.currencies();
    
            const convertedData = Object.entries(data).map(
                ([code, details]: [string, any]) => ({
                code,
                symbol: details.symbol,
                name: details.name,
                }),
            );
    
            setCurrencies(convertedData);
            } catch (error) {
                setError("Failer to fetch currencies")
            }
            finally {
                setIsLoading(false)
            }
        };
    }, []) 

    return {currencies, isCurrencyLoading, currencyError}
}
