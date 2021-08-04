import "./App.css";

import { sendLog, sendWebNotification } from "./components/pushNotification";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Notification Client</h1>
        <button onClick={sendLog}>Send a log</button>
        <br />
        <button
          onClick={() => {
            sendWebNotification("App Directory0", 150, "Mailer");
          }}
        >
          Send a notification
        </button>
        <br />
      </header>
    </div>
  );
}

export default App;
