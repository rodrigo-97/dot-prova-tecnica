import { useNavigate } from "react-router-dom"
import { useCart } from "../../Hooks/useCart"
import { Button } from "./Button"

type Props = {
  isOpen: boolean
  toggle: () => void
  title: string
  body: React.ReactElement
}

export function Modal({ body, isOpen, title, toggle }: Props) {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  function handleClick() {
    clearCart()
    navigate("/")
  }

  return (
    <div
      onClick={toggle}
      className={`fixed w-full h-screen bg-black bg-opacity-70 top-0 flex justify-center z-10 items-center ${isOpen ? 'block bg-opacity-70' : 'invisible bg-opacity-0'} transition-all ease-in-out duration-300`}
    >
      <div className={`w-96 bg-white mb-32 p-4 rounded-sm space-y-10 z-20 ${isOpen ? 'block' : 'hidden'}`}>
        <p className="text-2xl text-center">{title}</p>
        <p>{body}</p>
        <Button onClick={handleClick}>
          Ir para loja
        </Button>
      </div>
    </div>
  )
}