import React from "react";
import axios from "axios";

import {
  Button,
  Header,
  Modal,
  Form,
  Table,
  Icon,
  Menu
} from "semantic-ui-react";
export default class Store extends React.Component {
  state = {
    customers: [],
    newCustomerData: {
      name: "",
      address: ""
    },
    editCustomerData: {
      id: "",
      name: "",
      address: ""
    },
    newCustomerModal: false, //popup or popoff
    editCustomerModal: false //popup or popoff
  };
  componentWillMount() {
    this._refreshCustomers();
  }
  toggleNewCustomerModal() {
    this.setState({
      newCustomerModal: !this.state.newCustomerModal
    });
    // this.state.newCustomerModal = true;
  }
  toggleCancelCustomerModal() {
    this.setState({
      newCustomerModal: !this.state.newCustomerModal
    });
  }
  toggleEditCustomerModal() {
    this.setState({
      editCustomerModal: !this.state.editCustomerModal
    });
    // this.state.newCustomerModal = true;
  }
  toggleCancelEditCustomerModal() {
    this.setState({
      editCustomerModal: !this.state.editCustomerModal
    });
  }
  addCustomer() {
    axios
      .post(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores",
        this.state.newCustomerData
      )
      .then(response => {
        let { customers } = this.state;
        customers.push(response.data);
        this.setState({
          customers,
          newCustomerModal: false,
          newCustomerData: {
            name: "",
            address: ""
          }
        });
      });
  }
  updateCustomer() {
    let { name, address } = this.state.editCustomerData;
    axios
      .put(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores/" +
          this.state.editCustomerData.id,
        {
          name,
          address
        }
      )
      .then(response => {
        this._refreshCustomers();
        console.log(response.data);
      });
    this.setState({
      editCustomerModal: false,
      editCustomerData: { id: "", name: "", address: "" }
    });
  }
  editCustomer(id, name, address) {
    this.setState({
      editCustomerData: {
        id,
        name,
        address
      },
      editCustomerModal: !this.state.editCustomerModal
    });
  }
  deleteCustomer(id) {
    axios
      .delete(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores/" +
          id
      )
      .then(response => {
        this._refreshCustomers();
      });
  }
  _refreshCustomers() {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores"
      )
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      });
  }
  render() {
    let customers = this.state.customers.map(customer => {
      return (
        <Table.Row key={customer.id}>
          <Table.Cell>{customer.name}</Table.Cell>
          <Table.Cell>{customer.address}</Table.Cell>
          <Table.Cell>
            <Button
              onClick={this.editCustomer.bind(
                this,
                customer.id,
                customer.name,
                customer.address
              )}
            >
              Edit
            </Button>
            <Button onClick={this.deleteCustomer.bind(this, customer.id)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div>
        {/* Create A New Customer Modal */}
        <Button onClick={this.toggleNewCustomerModal.bind(this)}>
          Add Store
        </Button>
        <Modal open={this.state.newCustomerModal}>
          <Modal.Header>Add a New Store</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Store Information</Header>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input
                    id="name"
                    value={this.state.newCustomerData.name}
                    onChange={e => {
                      let { newCustomerData } = this.state;
                      newCustomerData.name = e.target.value;
                      this.setState({ newCustomerData });
                    }}
                    placeholder="Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input
                    id="address"
                    value={this.state.newCustomerData.address}
                    onChange={e => {
                      let { newCustomerData } = this.state;
                      newCustomerData.address = e.target.value;
                      this.setState({ newCustomerData });
                    }}
                    placeholder="Address"
                  />
                </Form.Field>
                <Button type="submit" onClick={this.addCustomer.bind(this)}>
                  Create
                </Button>
                <Button onClick={this.toggleCancelCustomerModal.bind(this)}>
                  Cancel
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        {/* Edit A Customer Modal */}

        <Modal open={this.state.editCustomerModal}>
          <Modal.Header>Edit Store</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Store Information</Header>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input
                    id="name"
                    value={this.state.editCustomerData.name}
                    onChange={e => {
                      let { editCustomerData } = this.state;
                      editCustomerData.name = e.target.value;
                      this.setState({ editCustomerData });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input
                    id="address"
                    value={this.state.editCustomerData.address}
                    onChange={e => {
                      let { editCustomerData } = this.state;
                      editCustomerData.address = e.target.value;
                      this.setState({ editCustomerData });
                    }}
                  />
                </Form.Field>
                <Button type="submit" onClick={this.updateCustomer.bind(this)}>
                  Edit
                </Button>
                <Button onClick={this.toggleCancelEditCustomerModal.bind(this)}>
                  Cancel
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{customers}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}
