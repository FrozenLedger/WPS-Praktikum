import React, { Component } from "react";
import Profile from "./Profile";
import ShopItems from "./ShopItems";

class CreditStore extends Component {
  state = { web3: null, contract: null };

  async getUserAccount() {
    const accounts = await this.props.web3.eth.getAccounts();
    return accounts[0];
  }

  render() {
    const web3 = this.props.web3;
    const contract = this.props.contract;
    return (
      <div>
        <Profile
          contract={contract}
          web3={web3}
          userCallback={this.getUserAccount.bind(this)}
        ></Profile>
        <ShopItems contract={contract} web3={web3}></ShopItems>
      </div>
    );
  }
}

export default CreditStore;
