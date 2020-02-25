import React from "react";
import axios from "axios";

import {
  Button,
  Header,
  Modal,
  Form,
  Table,
  Icon,
  Menu,
  Dropdown
} from "semantic-ui-react";
export default class App extends React.Component {
  state = {
    customers: [],
    products: [],
    stores: [],
    sales: [],

    newSaleData: {
      dateSold: "2020-02-14T22:22:21",
      customerId: null,
      productId: null,
      storeId: null
    },
    editSaleData: {
      id: 0,
      dateSold: "2020-02-14T22:22:21",
      customerId: null,
      productId: null,
      storeId: null
    },
    updateSale: {
      id: "",
      dateSold: "",
      customerId: "",
      customer: null,
      productId: "",
      product: null,
      storeId: "",
      store: null
    },
    newSaleModal: false, //popup or popoff
    editSaleModal: false //popup or popoff
  };
  componentWillMount() {
    this._refreshCustomers();
    this._refreshProducts();
    this._refreshStores();
    this._refreshSales();
  }
  toggleNewSaleModal() {
    this.setState({
      newSaleModal: !this.state.newSaleModal
    });
    // this.state.newCustomerModal = true;
  }
  toggleCancelSaleModal() {
    this.setState({
      newSaleModal: !this.state.newSaleModal
    });
  }
  toggleEditSaleModal() {
    this.setState({
      editSaleModal: !this.state.editSaleModal
    });
  }
  toggleCancelEditSaleModal() {
    this.setState({
      editSaleModal: !this.state.editSaleModal
    });
  }
  addSale() {
    axios
      .post(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/sales",
        this.state.newSaleData
      )
      .then(response => {
        this._refreshSales();
        this.setState({
          newSaleModal: false
        });
      });
  }
  editSale(id) {
    this.setState({
      editSaleData: {
        id
      },
      editSaleModal: !this.state.editSaleModal
    });
  }
  updateSale() {
    this.getCustomers();
    this.getProducts();
    this.getStores();
    this.getTotal();
  }
  getTotal() {
    console.log(this.state.updateSale);
  }
  getCustomers(id) {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/customers/" +
          this.state.editSaleData.customerId
      )
      .then(response => {
        this.setState({
          updateSale: {
            customer: response.data
          }
        });
      });
  }
  getProducts(id) {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/products/" +
          this.state.editSaleData.productId
      )
      .then(response => {
        this.setState({
          updateSale: {
            product: response.data
          }
        });
      });
  }
  getStores(id) {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores/" +
          this.state.editSaleData.storeId
      )
      .then(response => {
        this.setState({
          updateSale: {
            store: response.data
          }
        });
      });
  }
  deleteSale(id) {
    axios
      .delete(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/sales/" +
          id
      )
      .then(response => {
        this._refreshSales();
      });
  }
  _refreshCustomers() {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/customers"
      )
      .then(response => {
        this.setState({
          customers: response.data
        });
      });
  }
  _refreshProducts() {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/products"
      )
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  _refreshStores() {
    axios
      .get(
        "https://onboardingwebapi20200225125425.azurewebsites.net/api/stores"
      )
      .then(response => {
        this.setState({
          stores: response.data
        });
      });
  }
  _refreshSales() {
    axios
      .get("https://onboardingwebapi20200225125425.azurewebsites.net/api/sales")
      .then(response => {
        this.setState({
          sales: response.data
        });
      });
  }
  render() {
    let sales = this.state.sales.map(sale => {
      return (
        <Table.Row key={sale.id}>
          <Table.Cell>{sale.dateSold}</Table.Cell>
          <Table.Cell>{sale.customer.name}</Table.Cell>
          <Table.Cell>{sale.product.name}</Table.Cell>
          <Table.Cell>{sale.store.name}</Table.Cell>
          <Table.Cell>
            <Button
              onClick={this.editSale.bind(
                this,
                sale.id,
                sale.dateSold,
                sale.customer.name,
                sale.product.name,
                sale.store.name
              )}
            >
              Edit
            </Button>
            <Button onClick={this.deleteSale.bind(this, sale.id)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div>
        {/* Create A New Sale Modal */}
        <Button onClick={this.toggleNewSaleModal.bind(this)}>Add Sale</Button>
        <Modal open={this.state.newSaleModal}>
          <Modal.Header>Add a New Sale</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Sale Information</Header>
              <Form>
                <Form.Field>
                  <label>Date Sold</label>
                  <input />
                </Form.Field>
                <Form.Field>
                  <label>Customer</label>
                  <Dropdown
                    placeholder="Customer"
                    fluid
                    selection
                    options={this.state.customers.map(customer => {
                      return {
                        key: customer.id,
                        text: customer.name,
                        value: customer.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { newSaleData } = this.state;
                      newSaleData.customerId = value;
                      this.setState({ newSaleData });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Product</label>
                  <Dropdown
                    placeholder="Product"
                    fluid
                    selection
                    options={this.state.products.map(product => {
                      return {
                        key: product.id,
                        text: product.name,
                        value: product.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { newSaleData } = this.state;
                      newSaleData.productId = value;
                      this.setState({ newSaleData });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Store</label>
                  <Dropdown
                    placeholder="Store"
                    fluid
                    selection
                    options={this.state.stores.map(store => {
                      return {
                        key: store.id,
                        text: store.name,
                        value: store.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { newSaleData } = this.state;
                      newSaleData.storeId = value;
                      this.setState({ newSaleData });
                    }}
                  />
                </Form.Field>
                <Button type="submit" onClick={this.addSale.bind(this)}>
                  Create
                </Button>
                <Button onClick={this.toggleCancelSaleModal.bind(this)}>
                  Cancel
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        {/* Edit */}
        <Modal open={this.state.editSaleModal}>
          <Modal.Header>Edit Sale</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Sale Information</Header>
              <Form>
                <Form.Field>
                  <label>Date Sold</label>
                  <input />
                </Form.Field>
                <Form.Field>
                  <label>Customer</label>
                  <Dropdown
                    placeholder={"Customer"}
                    fluid
                    selection
                    options={this.state.customers.map(customer => {
                      return {
                        key: customer.id,
                        text: customer.name,
                        value: customer.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { editSaleData } = this.state;
                      editSaleData.customerId = value;
                      this.setState({ editSaleData });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Product</label>
                  <Dropdown
                    placeholder="Product"
                    fluid
                    selection
                    options={this.state.products.map(product => {
                      return {
                        key: product.id,
                        text: product.name,
                        value: product.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { editSaleData } = this.state;
                      editSaleData.productId = value;
                      this.setState({ editSaleData });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Store</label>
                  <Dropdown
                    placeholder="Store"
                    fluid
                    selection
                    options={this.state.stores.map(store => {
                      return {
                        key: store.id,
                        text: store.name,
                        value: store.id
                      };
                    })}
                    onChange={(e, { value }) => {
                      let { editSaleData } = this.state;
                      editSaleData.storeId = value;
                      this.setState({ editSaleData });
                    }}
                  />
                </Form.Field>
                {/* <Button type="submit" onClick={this.updateSale.bind(this)}>
                  Edit
                </Button> */}
                <Button type="submit" onClick={this.updateSale.bind(this)}>
                  Edit
                </Button>
                <Button onClick={this.toggleCancelEditSaleModal.bind(this)}>
                  Cancel
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{sales}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
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
