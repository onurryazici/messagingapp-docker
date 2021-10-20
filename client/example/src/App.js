import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ReactMessenger from 'client'
import 'client/dist/index.css'

const App = () => {
  return (
    <div><ReactMessenger username="main" 
    tokenName="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoibWFpbiIsImlhdCI6MTYyMTI4MzE5NiwiZXhwIjoxNjIxMjg0OTk2fQ.3f4FnlpUoRlmYX7SyMKKV8vtM1rYRlv8dyylz-gjbSs"
          />
    </div>
  )       
}

export default App
