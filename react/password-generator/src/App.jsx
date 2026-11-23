import { useState, useCallback, useEffect, useRef } from "react";

function App() {
const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("");

const passwordRef = useRef(null)

const copyToClipboard = useCallback(()=>{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
}, [])

const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if(numberAllowed) str += "0123456789";
  if(charAllowed) str += "!@#$%^&*?~`+=";

  for (let i = 1; i <= length; i++) {
   let char = Math.floor(Math.random()*str.length + 1)
   pass += str.charAt(char)
    
  }

  setPassword(pass)

}, [length,numberAllowed,charAllowed])

useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, setPassword])


  return (
   <>
 <div className="flex min-h-screen justify-center bg-gray-900 pt-10">
 
  <div className="h-fit w-full max-w-md rounded-lg bg-gray-700 p-4 shadow-lg">
     <h1 className="text-center my-2">Password Generator</h1>

    <div className="flex gap-2">
  <input
    type="text"
    value={password}
    placeholder="Password"
    readOnly
    ref={passwordRef}
    className="min-w-0 flex-1 rounded border px-3 py-2 text-black outline-none"
  />

  <button className="rounded bg-blue-600 px-4 py-2 text-white"
  onClick={copyToClipboard}>
    Copy
  </button>

</div>

<div>
  <input type="range"
  min={8}
  max={50}
  value={length}
  className="cursor-pointer "
  onChange={(e)=> setLength(e.target.value)}
  />
  <label className="mr-3">Length:{length}</label>

   <input type="checkbox"
   defaultChecked={numberAllowed}
   id="numberInput"
   onChange={()=>setNumberAllowed((prev)=>!prev)}

  />
  <label>Number</label>


  <input type="checkbox"
  defaultChecked={charAllowed}
  id="charInput"
  onChange={()=>setCharAllowed((prev)=>!prev)}
  className="ml-3"
  />
  <label htmlFor="charInput">Character</label>
</div>


 
</div>
  </div>

   </>
  )
}

export default App
