interface ButtonProps {
  children: React.ReactNode;
  buttonType: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  buttonType,
  className,
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`custom-button ${className} ${buttonType}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
