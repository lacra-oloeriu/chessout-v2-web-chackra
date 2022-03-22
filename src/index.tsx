import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoices from "./routes/invoices";
import Expenses from "./routes/expenses";
import NotThePageYouAreLookingFore from "./routes/notThePageYouAreLokingFore";
import Invoice from "./routes/invoice";
import PleaseSelectAnElement from "./routes/pleaseSelectAnElement";
import MyWallet from "./routes/myWallet";
import MyContract from "./routes/myContract";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route index element={<PleaseSelectAnElement />} />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="wallet" element={<MyWallet />} />
          <Route path="myContract" element={<MyContract />} />
          <Route path="*" element={<NotThePageYouAreLookingFore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
