import { useState } from 'react'
import { POST } from './utils'

function App() {
  const [appId, setAppId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [token, setToken] = useState('')

  const onSignUp = async () => {
    try {
      await POST({
        url: 'auth/signup',
        data: { appId, name, email },
      })
    } catch (err) {}
  }

  const onSignIn = async () => {
    try {
      await POST({
        url: 'auth/signin',
        data: { appId, email },
      })
    } catch (err) {}
  }

  const onOtp = async () => {
    try {
      const { token } = await POST({
        url: 'auth/otp',
        data: { appId: appId, email: email, OTP: otp },
      })
      setToken(token)
      window.__TOKEN__ = token
    } catch (err) {}
  }

  return (
    <main>
      {/* Set App Id */}
      <section className="section">
        <h3>Set App Id</h3>
        <p className="italic">Enter the App Id, aquired from Authible</p>

        <div className="mb-2">
          <span className="inline-block mr-2">App Id</span>
          <input
            className="w-half"
            value={appId}
            onChange={e => setAppId(e.target.value)}
          />
        </div>
      </section>
      {/* Sign Up */}
      <section className="section">
        <h3>Sign Up</h3>
        <p className="italic">Signup with a name and email</p>

        <div className="mb-2">
          <span className="inline-block mr-2">Name</span>
          <input
            className="w-half"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <span className="inline-block mr-2">Email</span>
          <input
            className="w-half"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button onClick={onSignUp}>Submit</button>
      </section>
      {/* Sign In */}
      <section className="section">
        <h3>Sign In</h3>
        <p className="italic">Enter email of existing user</p>

        <div className="mb-2">
          <span className="inline-block mr-2">Email</span>
          <input
            className="w-half"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button onClick={onSignIn}>Submit</button>
      </section>
      {/* OTP */}
      <section className="section">
        <h3>OTP</h3>
        <p className="italic">Enter OTP sent to user's email above</p>

        <div className="mb-2">
          <span className="inline-block mr-2">OTP</span>
          <input
            className="w-half"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        </div>
        <button onClick={onOtp}>Submit</button>
        {token && (
          <>
            <h3>Token</h3>
            <p className="text-monospace break-word">{token}</p>
          </>
        )}
      </section>
    </main>
  )
}

export default App
