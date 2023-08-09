import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ChatPageWrapper from "./pages/ChatPageWrapper";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword.js";
import About from "./components/miscellaneous/About";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route className="HomePage" path="/" component={HomePage} exact />
          <Route
            className="ChatPageWrapper"
            path="/chats"
            component={ChatPageWrapper}
          />
          <Route
            path="/forgotpassword"
            component={ForgotPassword}
            className="PassChange"
          />
          <Route
            path="/resetpassword/:resetToken"
            component={ResetPassword}
            className="PassChange"
          />
          <Route path="/about" component={About} className="About" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
