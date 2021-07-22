import React, { Component } from "react";
import Item from "./Item";

class ShopItems extends Component {
  state = {
    shapes: [
      {
        shape: "Triangle",
        id: 0,
        description: "This is a triangle. It has 3 edges and 3 lines.",
      },
      {
        shape: "Square",
        id: 1,
        description: "This is a square. It has 4 edges and 4 lines. ",
      },
      {
        shape: "Circle",
        id: 2,
        description: "This is a circle. It has 0 edges and 1 line.",
      },
    ],
  };

  render() {
    return (
      <div>
        {this.state.shapes.map((shape) => {
          return (
            <Item
              key={shape["id"]}
              contract={this.props.contract}
              web3={this.props.web3}
              component={shape}
            ></Item>
          );
        })}
      </div>
    );
  }
}

export default ShopItems;
