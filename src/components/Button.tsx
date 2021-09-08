import {useCallback} from "react"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => {};
}

export const Button = ({children, onClick}: ButtonProps) => {
    const handleOnClick = useCallback(() => {
        onClick?.();
    }, [onClick]);

    return (
        <button children={children} onClick={handleOnClick} />
    )
}
