import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class Navigation extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu>
          <NavLink to="/">
            <Menu.Item
              name="customer"
              active={activeItem === "customer"}
              onClick={this.handleItemClick}
            >
              Customer
            </Menu.Item>
          </NavLink>
          <NavLink to="/product">
            <Menu.Item
              name="product"
              active={activeItem === "product"}
              onClick={this.handleItemClick}
            >
              Product
            </Menu.Item>
          </NavLink>
          <NavLink to="/store">
            <Menu.Item
              name="store"
              active={activeItem === "store"}
              onClick={this.handleItemClick}
            >
              Store
            </Menu.Item>
          </NavLink>
          <NavLink to="/sale">
            <Menu.Item
              name="sale"
              active={activeItem === "sale"}
              onClick={this.handleItemClick}
            >
              Sale
            </Menu.Item>
          </NavLink>
        </Menu>
      </div>
    );
  }
}
