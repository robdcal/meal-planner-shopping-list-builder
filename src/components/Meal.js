import React from "react";
import { recipes } from "../recipes.js";

const recipesBuilder = [
  <option key="" value="">
    Choose...
  </option>,
];

for (const recipe in recipes) {
  recipesBuilder.push(
    <option key={recipe} value={recipe}>
      {recipes[recipe].recipeName}
    </option>
  );
}

class Meal extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updatePlan(this.props.day, this.props.meal, event.target.name, event.target.value);
  }

  render() {
    return (
      <div className="form-row">
        <div className="col-9">
          <label>
            <select
              className="form-control"
              name="recipe"
              value={this.props.value}
              onChange={this.handleChange}
            >
              {recipesBuilder}
            </select>
          </label>
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            name="servings"
            value={this.props.servings}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Meal;
