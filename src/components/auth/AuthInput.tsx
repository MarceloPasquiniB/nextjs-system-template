interface AuthInputProps {
  label: string;
  value: any;
  valueType: 'text' | 'email' | 'password';
  valueChanged?: (newValue: any) => void;
  mandatory?: boolean;
}

export default function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-3">
      <label>{props.label}</label>
      <input
        type={props.valueType ?? 'text'}
        value={props.value}
        onChange={(e) => props.valueChanged?.(e.target.value)}
        required={props.mandatory}
        className={`
        px-4 py-3 rounded-lg bg-gray-200 mt-2
        border focus:border-blue-500 focus:outline-none
        focus:bg-white`}
      ></input>
    </div>
  );
}
