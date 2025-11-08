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
      <div className="bg-blue-900 w-[600px] h-auto text-white mx-auto rounded-2xl p-8 shadow-lg flex flex-col items-center">
  {copied && <div className="text-green-400 font-medium mb-3">Copied!</div>}
  
  <div className="w-full flex flex-col items-center">
    <h1 className="text-3xl font-bold mb-8 text-blue-400 tracking-wide">
      Password Generator
    </h1>

    <div className="mb-6 flex items-center justify-center gap-3">
      <input
        className="border border-blue-400 bg-transparent text-white rounded-lg p-2 w-72 text-center outline-none focus:ring-2 focus:ring-blue-500"
        ref={inputVal}
        type="text"
        value={password}
        readOnly
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition duration-200 shadow-md"
        onClick={selectInput}
      >
        Copy
      </button>
    </div>

    <div className="flex flex-wrap gap-5 justify-center items-center text-lg">
      <div className="flex items-center gap-3">
        <input
          className="accent-blue-500 cursor-pointer"
          type="range"
          min="5"
          max="20"
          value={length}
          onChange={handleLength}
        />
        <label className="text-blue-400">{length} Length</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="w-5 h-5 accent-blue-500 cursor-pointer"
          type="checkbox"
          checked={includeNum}
          onChange={(e) => setIncludeNum(e.target.checked)}
        />
        <label className="text-blue-400">Number</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="w-5 h-5 accent-blue-500 cursor-pointer"
          type="checkbox"
          checked={includeSpChar}
          onChange={(e) => setIncludeSpChar(e.target.checked)}
        />
        <label className="text-blue-400">Character</label>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default App;
