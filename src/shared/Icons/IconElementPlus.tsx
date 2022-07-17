import React from 'react'
interface IIconElementPlus {
  classNameSvg?: string
}
export function IconElementPlus (props: IIconElementPlus) {
  return (
    <svg
      className={props.classNameSvg}
      width="73"
      height="11"
      viewBox="0 0 73 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="73" width="11" height="73" rx="5.5" transform="rotate(90 73 0)" fill="#C4C4C4" />
    </svg>
  )
}
