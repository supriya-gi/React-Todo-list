import React from "react";
import "./Todo.css";
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
    };
    this.textChange = this.textChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  textChange(event) {
    this.setState({
      text: event.target.value,
    });
  }
  addItem(event) {
    event.preventDefault();
    let newItem = {
      id: Date.now(),
      text: this.state.text,
    };

    this.setState((oldState) => ({
      items: oldState.items.concat(newItem),
      text: "",
    }));
  }
  handleDeleteItem(itemId) {
    let updatedItems = this.state.items.filter((item) => {
      return item.id !== itemId;
    });
    this.setState({
      items: [].concat(updatedItems),
    });
  }
  render() {
    return (
      <>
        <h2>React Todo List</h2>
        <form>
          <input
            type="text"
            value={this.state.text}
            onChange={this.textChange}
            placeholder="Enter list Name"
          />
          <button type="button" id="btn" onClick={this.addItem}>
            Add
          </button>
          <ItemList
            items={this.state.items}
            onDeleteItem={this.handleDeleteItem}
          />
        </form>
      </>
    );
  }
}
class ItemList extends React.Component {
  render() {
    return (
      <>
        <ul>
          {this.props.items.map((item) => {
            return (
              <ItemName
                key={item.id}
                id={item.id}
                text={item.text}
                onDeleteItem={this.props.onDeleteItem}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
class ItemName extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem() {
    this.props.onDeleteItem(this.props.id);
  }
  render() {
    return (
      <>
        <li>
          {this.props.text}
          <button type="button" id="delete" onClick={this.deleteItem}>
            Delete
          </button>
        </li>
      </>
    );
  }
}
export default TodoList;
