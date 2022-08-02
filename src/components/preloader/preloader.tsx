import React from 'react'
import preloader from '../../assets/images/loader.svg'

export const Preloader:React.FC = () => {
  return (
    <img src={preloader} style={{width :'100px'}} alt="" />
  )
}
