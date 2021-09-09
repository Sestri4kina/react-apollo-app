import React, {useCallback, useEffect, useState} from "react"

interface CheckboxProps {
    value?: boolean;
    children: React.ReactNode;
    onChange: (checked: boolean) => void;
}

export const Checkbox = ({value, children, onChange}: CheckboxProps) => {
    const  [isChecked, setIsChecked] = useState(value ?? false);

    useEffect(() => {
        if (value !== undefined && value !== isChecked) {
            setIsChecked(value ?? false);
        } 
    }, [value, isChecked]);

    const handleOnChange = useCallback((
        {target: {checked}}: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked(checked);
        onChange(checked);
    }, [setIsChecked, onChange]);

    return (
        <label>
            <input
                type='checkbox'
                checked={isChecked}
                onChange={handleOnChange}
            />
            <span children={children} />
        </label>
    )
}
