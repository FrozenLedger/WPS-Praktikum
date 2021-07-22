import React, { Component } from "react";

class Item extends Component {
  state = { price: "???", count: "?" };

  async revealPrice() {
    let newprice = await this.props.contract.methods
      .priceOf(this.props.component["id"])
      .call();

    this.setState({ price: newprice });
  }

  async revealCount() {
    const itemID = this.props.component["id"];
    const accounts = await this.props.web3.eth.getAccounts();

    if (accounts[0]) {
      const amount = await this.props.contract.methods
        .itemBalanceOf(itemID, accounts[0])
        .call();

      this.setState({ count: amount });
    }
  }

  async purchaseItem() {
    const accounts = await this.props.web3.eth.getAccounts();

    if (accounts[0]) {
      this.props.contract.methods
        .buyItem(this.props.component["id"])
        .send({ from: accounts[0] });
    }
  }

  componentDidMount() {
    this.revealPrice.bind(this);
    this.revealCount.bind(this);

    this.revealPrice();
    this.revealCount();
  }

  render() {
    const shape = this.props.component["shape"];

    return (
      <div className="item">
        <h3 className="headliner">ItemID: {this.props.component["id"]}</h3>
        <p className="description">
          {this.props.component.description}
          <br /> It costs {this.state.price} credits
        </p>
        <button className="btn" onClick={this.purchaseItem.bind(this)}>
          <img src={"./".concat(shape.concat(".svg"))} alt={shape}></img>
        </button>
        <div className="inventory">
          {shape}s in possession: <b>{this.state.count}</b>
        </div>
      </div>
    );
  }
}

export default Item;
