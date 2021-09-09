import React, {useCallback, useEffect, useState} from "react";

interface InputProps {
    value?: string;
    labelText: string;
    onChange: (value: string) => void;
}

export const Input = ({value: defaultValue, labelText, onChange}: InputProps) => {
    const [value, setValue] = useState(defaultValue ?? '');

    useEffect(() => {
        if (defaultValue !== undefined && value !== defaultValue) {
            setValue(defaultValue ?? '');
        } 
    }, [value, defaultValue]);

    const handleOnChange = useCallback(
        ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
            setValue(value);
            onChange(value);
        }, [setValue, onChange]
    );

    return (
        <label>
            <span children={labelText} />
            <input
                type='text'
                value={value}
                onChange={handleOnChange}
            />
        </label>
    );
}
