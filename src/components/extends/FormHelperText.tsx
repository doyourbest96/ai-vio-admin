interface FormHelperTextProps {
  children: React.ReactNode;
  error?: boolean;
}

const FormHelperText = ({ children }: FormHelperTextProps) => {
  return (
    <>
      <p className="text-red-600 text-xs">{children}</p>
    </>
  );
};

export default FormHelperText;
