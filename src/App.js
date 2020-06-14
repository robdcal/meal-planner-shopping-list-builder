import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Meal from "./Meal";
import GenerateButton from "./GenerateButton";
import ShoppingList from "./ShoppingList";
import { recipes } from "./recipes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekPlan: {
        monday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        tuesday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        wednesday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        thursday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        friday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        saturday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
        sunday: {
          breakfast: ["", 0],
          lunch: ["", 0],
          dinner: ["", 0],
        },
      },
      list: {},
    };
    this.updatePlan = this.updatePlan.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  updatePlan(day, meal, name, value) {
    if (value !== "") {
      if (name == "recipe") {
        const weekPlan = { ...this.state.weekPlan };
        weekPlan[day][meal][0] = value;
        weekPlan[day][meal][1] = recipes[weekPlan[day][meal][0]].servings;
        this.setState({ weekPlan });
        this.updateList();
      } else {
        const weekPlan = { ...this.state.weekPlan };
        weekPlan[day][meal][1] = value;
        this.setState({ weekPlan });
        this.updateList();
      }
    }
  }

  updateList() {
    let chosenRecipes = [];
    Object.keys(this.state.weekPlan).map((day) => {
      Object.keys(this.state.weekPlan[day]).map((meal) => {
        return this.state.weekPlan[day][meal][0] !== ""
          ? chosenRecipes.push([
              this.state.weekPlan[day][meal][0],
              this.state.weekPlan[day][meal][1],
            ])
          : null;
      });
    });

    const list = {};
    // for each of the chosen recipes
    for (let i = 0; i < chosenRecipes.length; i++) {
      // for reach recipe in the database
      for (const recipe in recipes) {
        // if the database recipe matches the chosen recipe
        if (recipe === chosenRecipes[i][0]) {
          // for each of the ingredients in the recipe database
          for (let g = 0; g < recipes[recipe].ingredients.length; g++) {
            if (
              // if the ingredient in already in the shopping list
              recipes[recipe].ingredients[g].name in list &&
              // AND the unit of measurement is the same
              recipes[recipe].ingredients[g].unit ==
                list[recipes[recipe].ingredients[g].name].unit
            ) {
              // console.log(recipes[recipe].ingredients[g].unit + "  |  " + list[recipes[recipe].ingredients[g].name].unit)
              // add the recipe ingredient amount to the existing shopping list amount
              list[recipes[recipe].ingredients[g].name].amount +=
                (recipes[recipe].ingredients[g].amount /
                  recipes[recipe].servings) *
                chosenRecipes[i][1];
            } else if (
              // if the ingredient in already in the shopping list
              recipes[recipe].ingredients[g].name in list &&
              // AND the unit of measurement is **NOT** the same
              recipes[recipe].ingredients[g].unit !==
                list[recipes[recipe].ingredients[g].name].unit
            ) {
              console.log ("ingredient in list but in different unit of measurement")
            } else {
              // otherwise, create a new entry in the shopping list
              list[recipes[recipe].ingredients[g].name] = {
                amount:
                  (recipes[recipe].ingredients[g].amount /
                    recipes[recipe].servings) *
                  chosenRecipes[i][1],
                unit: recipes[recipe].ingredients[g].unit,
              };
            }
          }
        }
      }
    }
    this.setState({ list });
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="py-5">
          <h1>Weekly Meal Plan</h1>
        </div>
        <div className="schedule-grid">
          {Object.keys(this.state.weekPlan).map((day) =>
            Object.keys(this.state.weekPlan[day]).map((meal) => (
              <Meal
                key={day + "-" + meal}
                day={day}
                meal={meal}
                updatePlan={this.updatePlan}
                value={this.state.weekPlan[day][meal][0]}
                servings={this.state.weekPlan[day][meal][1]}
              />
            ))
          )}
        </div>
        {/* <div>
          <GenerateButton updateList={this.updateList} />
        </div> */}
        <div>
          <h2>Shopping List</h2>
          <ShoppingList list={this.state.list} />
        </div>
      </div>
    );
  }
}

export default App;
