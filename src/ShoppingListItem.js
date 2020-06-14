import React from "react";
import { ingredientsList } from "./ingredientsList";

class ShoppingListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  };
    }

    render() {
      return (
        <li>{ingredientsList[this.props.name].name} {this.props.details.amount} {this.props.details.unit}</li>
        // formerly ingredientsList[this.props.name].unit
      );
    }
  }

export default ShoppingListItem;
