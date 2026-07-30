import gsLogo from './gsLogo.png';
import './App.css';
import React from 'react';

// Component 1
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "admin",
      tempName: "",
      tempPrice: "",
      tempQuantity: 0,
      delName: "",
      delPrice: "",
      delQuantity: 0,
      updateName: "",
      updatePrice: "",
      updateQuantity: 0
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getData() {
    fetch('http://localhost:3001/home/')
      .then(res => res.json())
      .then(data => {
        this.setState(
          (prevState) => { return { dealer: data.info } }
        )
      });
  }

  postData(event){
    event.preventDefault();
    let data =  {name: this.state.tempName, price: this.state.tempPrice, quantity: Number(this.state.tempQuantity)};
    let options ={
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3001/home/', options).then();
  }

  delData(event){
    event.preventDefault();
    let data = { name: this.state.delName };
    let options ={
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3001/home/', options);
  }

  updateData(event){
    event.preventDefault();
    let data =  {name: this.state.updateName, price: this.state.updatePrice, quantity: Number(this.state.updateQuantity)};
    let options ={
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3001/home/', options);
  }

  render() {
    return (
      <div className="admin">
        <div id="logo-container">
          <img src={gsLogo} className="App-logo" alt="gs logo"/>
        </div>
        <div className="pageHeader">
          <button className="backButton" onClick={() => this.props.setPage("home")}>Back</button>
          <p>Admin Page</p>
        </div>
        <div className="App-header">
          <button onClick={() => this.getData()}>Get Data</button>
        </div>
        <div>
          <form onSubmit={(e)=>{this.postData(e)}}>
            <p><strong>Post Data:</strong></p>
            Enter Name:
            <input type="text" name="tempName" value={this.state.tempName} onChange={(e)=>{this.handleChange(e)}}></input>
            Enter Price:
            <input type="text" name="tempPrice" value={this.state.tempPrice} onChange={(e)=>{this.handleChange(e)}}></input>
            Enter Quantity:
            <input type="text" name="tempQuantity" value={this.state.tempQuantity} onChange={(e)=>{this.handleChange(e)}}></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div>
          <form onSubmit={(e)=>{this.delData(e)}}>
            <p><strong>Delete Data:</strong></p>
            Enter Name:
            <input type="text" name="delName" value={this.state.delName} onChange={(e)=>{this.handleChange(e)}}></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div>
          <form onSubmit={(e)=>{this.updateData(e)}}>
            <p><strong>Update Data:</strong></p>
            Enter Name:
            <input type="text" name="updateName" value={this.state.updateName} onChange={(e)=>{this.handleChange(e)}}></input>
            Enter Price:
            <input type="text" name="updatePrice" value={this.state.updatePrice} onChange={(e)=>{this.handleChange(e)}}></input>
            Enter Quantity:
            <input type="text" name="updateQuantity" value={this.state.updateQuantity} onChange={(e)=>{this.handleChange(e)}}></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
    );
  }
}

// Component 2
class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    };
  }

  getData() {
    fetch('http://localhost:3001/home/')
      .then(res => res.json())
      .then(data => {
        this.setState({ inventory: data.info || [] });
      });
  }


  render() {
    return (
      <div className="guest">
        <div id="logo-container">
          <img src={gsLogo} className="App-logo" alt="gs logo"/>
        </div>
        <div className="pageHeader">
          <button className="backButton" onClick={() => this.props.setPage("home")}>Back</button>
          <p>Guest Page</p>
          <button className="headerAction" onClick={() => this.getData()}>Get Data</button>
        </div>
        <div>
          {this.state.inventory.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.inventory.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

// Component 3 Initial Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home"
    };
  }


  //          <button onClick={()=>this.getData()}>Press</button> 

  render() {
    if (this.state.page === "home") {
      return (
        <div className="App">
          <div id="logo-container">
            <img src={gsLogo} className="App-logo" alt="gs logo"/>
          </div>
          <div className="App-header">
            <button onClick={()=>this.setState({ page: "admin" })}>Admin Login</button>
            <button onClick={() => this.setState({ page: "guest" })}>Guest Login</button>
          </div>
        </div>
      );
    } else if (this.state.page === "admin") {
      return (
        <Admin setPage={(page) => this.setState({ page })} />
      );
    } else if (this.state.page === "guest") {
      return (
        <Guest setPage={(page) => this.setState({ page })} />
      );
    }
  }
}

export default App;
