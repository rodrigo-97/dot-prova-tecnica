import { MagnifyingGlass } from "phosphor-react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {}

export function Input({ onChange, placeholder, ...rest }: Props) {
  return (
    <div className="flex items-center h-10 rounded-md outline-none px-2 bg-white">
      <input
        type="text"
        className="h-10 rounded-md outline-none"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      <MagnifyingGlass weight="regular" />
    </div>
  )
}