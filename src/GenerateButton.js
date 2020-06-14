import React from "react";

class GenerateButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="btn btn-outline-primary"
        onClick={this.props.generateList}
      >
        Generate List
      </button>
    );
  }
}

export default GenerateButton;
