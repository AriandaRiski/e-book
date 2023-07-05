import React from 'react'
import Header from '@/layout/header'
import Sidebar from '@/layout/sidebar'

const layout = ({children}) => {
  return (
    <>
        <Header/>
        <div className="container-fluid">
            <div className="row" >
                <Sidebar/>
            </div>
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {children}
            </div>
        </div>

    </>
  )
}

export default layout