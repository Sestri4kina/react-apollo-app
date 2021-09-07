import React, {useCallback, useState} from "react"

interface CheckboxProps {
    value?: boolean;
    onChange: (checked: boolean) => void;
}

export const Checkbox = ({value, onChange}: CheckboxProps) => {
    const  [isChecked, setIsChecked] = useState(value ?? false);

    const handleOnChange = useCallback(({target: {checked}}: React.ChangeEvent<HTMLInputElement>) => {
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
            <span children='vegetarian' />
        </label>
    )
}
