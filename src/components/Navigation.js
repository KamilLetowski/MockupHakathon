import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { routing } from '../utils/routing';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { search } = routing;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Optima</NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href={search.value}>{search.key}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">mapa 2</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">mapa 1</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
