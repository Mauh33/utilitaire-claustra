import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Layout({children, title}) {
  return (
    <>
      <Header></Header>
      <main className='main-content'>
        {children}
      </main>
      <Footer></Footer>
    </>
  )
}
