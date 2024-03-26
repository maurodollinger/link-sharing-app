interface ButtonProps {
    children: React.ReactNode;
    buttonType: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void
}

export default function Button({ children, buttonType, type = 'button', disabled = false, onClick }: ButtonProps) {
    return (
        <button className={`custom-button ${buttonType}`} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    )
}