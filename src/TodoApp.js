import { useEffect, useState } from 'react'
import { POST, GET } from './utils'

function App() {
  const [items, setItems] = useState([])
  const [item, setItem] = useState('')

  useEffect(() => {
    const getAllItems = async () => {
      const data = await GET({
        token: window.__TOKEN__,
        url: 'data',
      })
      setItems(data)
    }

    getAllItems()
  }, [])

  const onCreateTodoItem = async () => {
    try {
      await POST({
        token: window.__TOKEN__,
        url: 'data',
        data: {
          method: items.length === 0 ? 'SET' : 'ARRAPPEND',
          path: '$',
          data: items.length === 0 ? [item] : item,
        },
      })
      setItems([...items, item])
    } catch (err) {}
  }

  const onDeleteTodoItem = async val => {
    const newItems = items.filter(str => str !== val)
    await POST({
      token: window.__TOKEN__,
      url: 'data',
      data: {
        method: 'SET',
        path: '$',
        data: newItems,
      },
    })
    setItems(newItems)
  }

  return (
    <div>
      <section className="section">
        <h3>Create Todo Item</h3>
        <p className="italic">Enter a todo item</p>

        <div className="mb-2">
          <span className="inline-block mr-2">Todo Item</span>
          <input
            className="w-half"
            value={item}
            onChange={e => setItem(e.target.value)}
          />
        </div>
        <button onClick={e => onCreateTodoItem(e.target.value)}>Submit</button>
      </section>
      <section className="section">
        <ul>
          {items.map(name => (
            <li className="mb-2">
              <span className="inline-block mr-2">{name}</span>
              <button onClick={e => onDeleteTodoItem(name)}>
                click to delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
