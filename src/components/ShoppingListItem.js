import React from "react";
import { ingredientsList } from "../ingredientsList";

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buildListItem() {
    console.log(this.props.name);
    let ingredientString = "";
    let unit = "";
    let amount = "";
    for (let i = 0; i < this.props.details.length; i++) {
      unit = this.props.details[i].unit;
      amount = this.props.details[i].amount.toString();
      ingredientString += ` ${i !== 0 ? "+" : ""} ${amount} ${unit}`;
    }
    return ingredientString;
  }

  render() {
    return (
      <tr>
        <td>{ingredientsList[this.props.name].dept}</td>
        <td>{ingredientsList[this.props.name].name}</td>
        <td>{this.buildListItem()}</td>
      </tr>
    );
  }
}

export default ShoppingListItem;
