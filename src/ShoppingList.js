import React from "react";
import ShoppingListItem from "./ShoppingListItem";

class ShoppingList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  };
    }
  
    render() {
      return (
        <ul className="float-left text-left">
          {Object.keys(this.props.list).map((key) =>
            <ShoppingListItem key={key} name={key} details={this.props.list[key]} />
          )}
        </ul>
      );
    }
  }

export default ShoppingList;
