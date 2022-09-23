type Props = {
  children: string
  onClick: () => void
}

export function Link({ children, onClick }: Props) {
  return (
    <p
      className="text-[#6558F5] underline hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </p>
  )
}