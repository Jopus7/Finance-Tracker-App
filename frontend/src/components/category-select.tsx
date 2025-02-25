import { TextField, MenuItem } from "@mui/material";
import { Category } from "./expenses-list";

type CategorySelectProps = {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    categories: Category[];
    label: string;
    name: string;
    showAllCategories?: boolean;
    required?: boolean;
}

export const CategorySelect = ({ 
    value, 
    onChange, 
    categories, 
    label, 
    name,
    showAllCategories = false,
    required = false 
}: CategorySelectProps) => {
    return (
        <TextField 
            select 
            name={name}
            value={value} 
            label={label} 
            onChange={onChange} 
            fullWidth
            required={required}
        >
            {showAllCategories && (
                <MenuItem value="All Categories">All Categories</MenuItem>
            )}
            {categories.map((category) => (
                <MenuItem key={category.id} value={showAllCategories ? category.name : category.id}>
                    {category.name}
                </MenuItem>
            ))}
        </TextField>
    );
};