
import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

import Web3 from 'web3';

class App extends Component 
{
  async componentWillUnmount() 
  //This function gets called before rendering any other code
  {
    await this.loadWeb3;

    await this.loadBlockchainData;
  }
   
  //function to make connections to a Metamask wallet making a website to a blockchain/ web3 website
  async loadWeb3() 
  {
    if(window.ethereum) //Checking whether Ethereum provider is installed or not 
    // Yes
    {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.Web3)
    // No
    {
      window.web3 = new Web3(window.web3.currentProvider)// Creating a new Ethereum provider
    }
    else //Giving a promt to install a Metamask in the browser 
    {
      window.alert('Non-Ethereum browser detected. You shoul consider trying Metamask !')
    }
  }

  //Get Blockchain data
  async loadBlockchainData()
  {
    const web3 = window.web3; 
    //Load Account 
    const accounts = await web3.eth.getAccounts(); //.then(console.log);
    console.log(accounts)
  }

  render() 
  {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Starter Kit
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Rohit Roy - Blockchain</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
