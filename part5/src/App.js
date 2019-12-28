import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState('')
  const [blogs, setBlogs] = useState([]);

  const showNotify = async (message) => {
    setNotify(message)
    const notify = setTimeout(() => {
      setNotify('')
    }, 3000)
  }

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotify('Invalid username or password')
      setTimeout(() => {
      }, 5000)
    }
  }

  const blogRows = () =>
    blogs.map(blog => {
      return <Blog key={blog.id} blog={blog} />
    })

  return (
    <div>
      <Notify message={notify} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />

      ) : (
          <div>
             <h1>blogs</h1>
            <p>
              {user.name} Logged In
            </p>
            {blogRows(() => blogService.getAll())}
          </div>
        )
      }
    </div>
  )

}
export default App;
