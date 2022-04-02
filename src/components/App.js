import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import Meal from "../components/Meal";
import ShoppingList from "../components/ShoppingList";
import { recipes } from "../recipes";

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
    console.log(chosenRecipes);

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
              // if the ingredient name is already in the shopping list
              recipes[recipe].ingredients[g].name in list
            ) {
              // for (let n = 0; n < list[recipes[recipe].ingredients[g].name].length; n++) {
              // for each 'amount/unit' obj in a list item
              // if (list[recipes[recipe].ingredients[g].name][n].unit === recipes[recipe].ingredients[g].unit) {
              if (
                list[recipes[recipe].ingredients[g].name].some(
                  (el) => el.unit === recipes[recipe].ingredients[g].unit
                )
              ) {
                // if the unit exists already then add the amount to the existing object
                for (
                  let n = 0;
                  n < list[recipes[recipe].ingredients[g].name].length;
                  n++
                ) {
                  // for each 'amount/unit' obj in a list item
                  if (
                    list[recipes[recipe].ingredients[g].name][n].unit ===
                    recipes[recipe].ingredients[g].unit
                  ) {
                    list[recipes[recipe].ingredients[g].name][n].amount +=
                      (recipes[recipe].ingredients[g].amount /
                        recipes[recipe].servings) *
                      chosenRecipes[i][1];
                  }
                }
              } else {
                // else add the recipe ingredient amount & unit as a new object to the ingredient array
                list[recipes[recipe].ingredients[g].name].push({
                  amount:
                    (recipes[recipe].ingredients[g].amount /
                      recipes[recipe].servings) *
                    chosenRecipes[i][1],
                  unit: recipes[recipe].ingredients[g].unit,
                });
              }
              // }
            } else {
              // otherwise, create a new ingredient object in the shopping list
              list[recipes[recipe].ingredients[g].name] = [
                {
                  amount:
                    (recipes[recipe].ingredients[g].amount /
                      recipes[recipe].servings) *
                    chosenRecipes[i][1],
                  unit: recipes[recipe].ingredients[g].unit,
                },
              ];
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
        <div className="schedule">
          <div className="schedule-days">
            <div className="h5">Monday</div>
            <div className="h5">Tuesday</div>
            <div className="h5">Wednesday</div>
            <div className="h5">Thursday</div>
            <div className="h5">Friday</div>
            <div className="h5">Saturday</div>
            <div className="h5">Sunday</div>
          </div>
          <div className="schedule-meals">
            <div className="h5">Breakfast</div>
            <div className="h5">Lunch</div>
            <div className="h5">Dinner</div>
          </div>
          <div className="recipe-pickers">
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
        </div>
        <ShoppingList list={this.state.list} />
      </div>
    );
  }
}

export default App;
