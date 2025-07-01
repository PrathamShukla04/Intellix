import React from 'react'
import Sidebar from './components/Sidebar/Sidebar/'
import Main from './components/Main/Main'

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
