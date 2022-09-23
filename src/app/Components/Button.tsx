import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function Button({ children, ...rest }: Props) {
  return (
    <button
      className="bg-[#6558F5] w-full py-3 text-white rounded-md hover:bg-[#594ed8] transition-all ease-in-out duration-300"
      {...rest}
    >
      {children}
    </button>
  )
}