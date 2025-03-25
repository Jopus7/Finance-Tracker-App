import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useExpenses } from '../../hooks/use-expenses';
import { useState, useEffect} from 'react';
import * as R from 'remeda';

type CategoryData = {
    id: number
    category: string;
    amount: string
}

export const Dashboard = () => {
    const { expenses, isLoading: expensesLoading, error, fetchExpenses } = useExpenses("date", "desc", "");
    const [categoryData, setCategoryData] = useState<CategoryData[]>([])


    useEffect(() => {
        if (expenses.length > 0) {
            const expenseTotalsByCategory = R.pipe(
                expenses,
                R.groupBy(expense => expense.category_name),
                Object.entries,
                R.map(([category, expenses], idx) => ({
                    id: idx + 1,
                    category,
                    amount: (R.sum(expenses.map(expense => expense.amount)) as number).toFixed(2)
                }
            ))
            )

            setCategoryData(expenseTotalsByCategory)
        }

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