'use client'
import  { useEffect, useState } from 'react'

interface Props {
  id: string
  title:string
  solid?:boolean
  additionalCss?:string
  noMargin?:boolean
}

const ModalButton = ({id,title,additionalCss}: Props) => {
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | null>(null);

  useEffect(() => {
    setDialogElement(document.getElementById(id) as HTMLDialogElement | null);
  }, []);

  return (
    <div>
      <button type='button' onClick={() => { dialogElement?.showModal(); console.log(dialogElement) }} className={`  ${additionalCss} ${''} `}>{title}</button>
    </div>
  )
}

export default ModalButton
