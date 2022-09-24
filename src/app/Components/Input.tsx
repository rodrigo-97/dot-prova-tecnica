import { IconProps, MagnifyingGlass } from "phosphor-react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType<IconProps>
}

export function Input({ onChange, placeholder, icon: Icon, ...rest }: Props) {
  return (
    <div className={'flex items-center h-10 rounded-md outline-none px-2 bg-white border'}>
      <input
        type="text"
        className="h-10 rounded-md outline-none border-t border-b w-full"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      {Icon && <Icon weight="regular" />}
    </div>
  )
}