import './styles.css'
import Auth from './Auth'
import TodoApp from './TodoApp'
import { useState } from 'react'

function App() {
  const [app, setApp] = useState('auth')
  return (
    <>
      <button
        className="mb-2"
        onClick={() => setApp(app === 'auth' ? 'app' : 'auth')}
      >
        toggle between auth and todo app
      </button>
      {app === 'auth' ? <Auth /> : <TodoApp />}
    </>
  )
}

export default App
