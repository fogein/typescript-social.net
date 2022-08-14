import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Preloader:React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />
  return (
    <Spin style={{display:'flex',alignItems:'center',justifyContent:'center'}} indicator={antIcon} />
  )
}
