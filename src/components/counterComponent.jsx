import React, { Component } from "react";

class Counter extends React.Component {
  state = {
    count: 0,
    tags: [],
  };

  styles = {
    fontSize: 10,
    fontWeight: "bold",
  };

  renderTags() {
    if (this.state.tags.length === 0) return null;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.state.tags.length === 0 && "Please Create a new tag!"}
        {this.renderTags()}
      </div>
    );
  }
}

export default Counter;
