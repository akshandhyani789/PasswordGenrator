import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  let BaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const [includeNum, setIncludeNum] = useState(false);
  const [includeSpChar, setIncludeSpChar] = useState(false);
  let number = "0123456789";
  let specialChar = "@#$%^&?><:";
  let inputVal = useRef();
  const [copied, setCopied] = useState(false);

  const PasswordGenrator = useCallback(() => {
    setPassword(() => {
      let temp = "";
      let letters = BaseLetters;
      if (includeNum) letters += number;
      if (includeSpChar) letters += specialChar;
      for (let i = 0; i < length; i++) {
        let randomindex = Math.floor(Math.random() * letters.length);
        temp += letters[randomindex];
      }
      return temp;
    });
  }, [length, includeNum, includeSpChar, setPassword]);

  useEffect(() => {
    PasswordGenrator();
  }, [PasswordGenrator]);

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const selectInput = () => {
    try {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-blue-950 w-150 h-100 text-white m-auto rounded-2xl p-2">
        {copied && <div className="ml-10 text-green-600 h-5">Copied!</div>}
        <div className="mt-7">
          <h1 className="text-4xl mb-10 text-blue-500">Password Genrator</h1>
          <div className="mb-4">
            <input
              className="border-2 rounded-4xl p-1 mr-4"
              ref={inputVal}
              type="text"
              value={password}
              readOnly
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              onClick={selectInput}
            >
              copy
            </button>
          </div>
          <div className="flex gap-3 justify-center">
            <input
              className="text-2xl"
              type="range"
              min="5"
              max="20"
              value={length}
              onChange={handleLength}
            />
            <label className="text-2xl text-blue-500">{length} Length</label>
            <input
              className="text-2xl"
              type="checkbox"
              checked={includeNum}
              onChange={(e) => setIncludeNum(e.target.checked)}
            />
            <label className="text-2xl text-blue-500">Number</label>
            <input
              className="text-2xl"
              type="checkbox"
              checked={includeSpChar}
              onChange={(e) => setIncludeSpChar(e.target.checked)}
            />
            <label className="text-2xl text-blue-500">Charachter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
