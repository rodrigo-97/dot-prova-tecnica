type Props = {
  isOpen: boolean
  toggle: () => void
  children: React.ReactNode
}

export function SideMenu({ toggle, isOpen, children }: Props) {
  return (
    <>
      <div
        onClick={toggle}
        className={`fixed w-full bg-gray-900 h-full top-0 z-10 ${isOpen ? 'block bg-opacity-70' : 'invisible bg-opacity-0'} transition-all ease-in-out duration-500`}
      />
      <aside className={`flex flex-col justify-between top-0 p-5 w-[375px] bg-white h-screen fixed z-20 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-all ease-in-out duration-500`}>
        {children}
      </aside>
    </>
  )
}