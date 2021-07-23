import "./App.css";
import "./shop.css";
import CreditStore from "./components/CreditStore";
import { ABI, CONTRACT_ADDRESS } from "./components/constants";

function App() {
  const Web3 = require("web3");
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  if (window.ethereum) {
    //window.ethereum.enable();
    return <CreditStore web3={web3} contract={contract}></CreditStore>;
  } else {
    return (
      <div>
        In order to use this app, you first have to install Metamask.
        <br />
        Follow the instructions on{" "}
        <a href="https://metamask.io/">https://metamask.io/</a>
      </div>
    );
  }
}

export default App;
