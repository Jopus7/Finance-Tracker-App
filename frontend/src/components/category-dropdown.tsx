import { MenuItem, TextField } from "@mui/material"
import { Category } from "./expenses-list"

type CategoryDropdownProps = {
    value: string
    onChange: (e: any) => void
    categories: Category[]
    label: string
    required?: boolean
    showAllCategories? : boolean
}


export const CategoryDropdown = ({value, onChange, categories, label, required=false, showAllCategories=false}: CategoryDropdownProps) => {
    return (
        <TextField
            select
            value={value}
            label={label}
            onChange={onChange}
            required={required}
            fullWidth
        >
            {showAllCategories && <MenuItem value="All Categories">All Categories</MenuItem>}
        
        {categories.map((category) => (
        <MenuItem key={category.id} value={showAllCategories ? category.name: category.id}>{category.name}</MenuItem>
        ))}
    </TextField>
    )
}