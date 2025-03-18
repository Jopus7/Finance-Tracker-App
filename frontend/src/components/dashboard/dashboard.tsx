import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useExpenses } from '../../hooks/use-expenses';
import { useState, useEffect} from 'react';


type CategoryData = {
    id: number
    category: string;
    amount: number
}

export const Dashboard = () => {
    const { expenses, isLoading: expensesLoading, error, fetchExpenses } = useExpenses("date", "desc", "");
    const [categoryData, setCategoryData] = useState<CategoryData[]>([])


    useEffect(() => {
        setCategoryData([
            {
                id: 1,
                category: "Bills",
                amount: 163.2
            },
            {
                id: 2,
                category: "Shopping",
                amount: 197
            },
            {
                id: 3,
                category: "Entertainment",
                amount: 20
            }
        ]
        )

    }, [expenses])

    
    return (
        <div>
            <PieChart
                series = {[
                    {
                        arcLabel: (item: any) => `${item.value}`,
                        data: categoryData.map(data => {
                            return {
                                id: data.id,
                                value: data.amount,
                                label: data.category
                            }
                        }),
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'white',
                      fontSize: 14,
                    },
                  }}
                width={600}
                height={400}
            />
            
        </div>
    )
}