import React, { useState, useEffect } from "react";
import "./App.css";
import myPhoto from "./assets/Faust.jpg"; 

function App() {
  // 訪客計數器（存儲在 LocalStorage）
  const [visitorCount, setVisitorCount] = useState(
    parseInt(localStorage.getItem("visitorCount") || "0", 10)
  );

  // 留言板狀態
  const [messages, setMessages] = useState([]);
  const [inputName, setInputName] = useState("");  // 新增姓名輸入框
  const [inputMessage, setInputMessage] = useState("");

  // 當元件加載時，增加訪客數
  useEffect(() => {
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem("visitorCount", newCount.toString());
  }, []);

  // 添加留言
  const addMessage = () => {
    if (inputName.trim() && inputMessage.trim()) {
      setMessages([...messages, { name: inputName, text: inputMessage }]);
      setInputName(""); // 清空姓名欄
      setInputMessage(""); // 清空留言欄
    }
  };

  return (
    <div className="container">
      <header>
        <h1>臺灣大學網路攻防實習Lab04</h1>
        <p>參觀人數：{visitorCount}</p>
      </header>

      <section className="profile">
        <img src={myPhoto} alt="個人照片" />
        <h3>黃杬霆</h3>  {/* 新增姓名 */}
        <p>嗨！我是黃杬霆，目前就讀於臺灣大學，目前就讀電機系資安所博士班，對前端開發充滿熱情！</p>
      </section>

      <section className="message-board">
        <h2>留言板</h2>
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="輸入你的姓名..."
          />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="輸入你的留言..."
          />
          <button onClick={addMessage}>發送</button>
        </div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.name}：</strong> {msg.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;