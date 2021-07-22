import React, { Component } from "react";

class Profile extends Component {
  state = { user_address: false, credits: "-NaN-", inventory: [0, 0, 0] };

  async enableMetamask() {
    await window.ethereum.enable();

    this.setup.bind(this);
    this.setup();
  }

  async setUserAddress() {
    const accounts = await this.props.web3.eth.getAccounts();

    if (accounts) {
      this.setState({ user_address: accounts[0] });
    }
  }

  async setUserCredits() {
    if (this.state.user_address) {
      const amount = await this.props.contract.methods
        .balanceOf(this.state.user_address)
        .call();

      this.setState({ credits: amount });
    }
  }

  async setup() {
    this.setUserAddress.bind(this);
    this.setUserCredits.bind(this);

    await this.setUserAddress();
    await this.setUserCredits();
  }

  async begForCredits() {
    const accounts = await this.props.web3.eth.getAccounts();
    this.props.contract.methods.begForCredits(25).send({ from: accounts[0] });
  }

  componentDidMount() {
    this.setup.bind(this);
    this.setup();
  }

  render() {
    return (
      <div>
        <div className="user">
          User Address:{" "}
          {this.state.user_address ? (
            <div>{this.state.user_address}</div>
          ) : (
            <button onClick={this.enableMetamask.bind(this)}>Login</button>
          )}
        </div>
        <div>
          <div>Credits: {this.state.credits}</div>
          <button onClick={this.begForCredits.bind(this)}>
            Get 25 more credits
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
