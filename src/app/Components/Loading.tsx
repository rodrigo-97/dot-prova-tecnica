import { SpinnerGap } from "phosphor-react";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement> & {
  hide?: boolean
}

export function Loading({ hide }: Props) {
  return (
    <div className={`justify-center ${hide ? 'hidden' : 'flex'}`}>
      {/* <SpinnerGap id="ward" className='animate-spin' size={40} /> */}

      carregando mais filmes...
    </div>
  )
}