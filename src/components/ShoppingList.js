import React from "react";
import ShoppingListItem from "../components/ShoppingListItem";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container mt-5">
        <h2>Shopping List</h2>
        <table className="table w-50 mx-auto text-left">
          <thead>
            <tr>
              <th>Department</th>
              <th>Ingredient</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>

          {Object.keys(this.props.list).map((key) => (
            <ShoppingListItem
              key={key}
              name={key}
              details={this.props.list[key]}
            />
          ))}
            
          </tbody>
        </table>
        {/* <ul className="d-inline-block text-left">
          {Object.keys(this.props.list).map((key) => (
            <ShoppingListItem
              key={key}
              name={key}
              details={this.props.list[key]}
            />
          ))}
        </ul> */}
      </div>
    );
  }
}

export default ShoppingList;
