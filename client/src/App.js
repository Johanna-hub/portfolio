import React, { Component } from 'react';
import { Photos } from './components/photos';
import { Links } from './components/links';
import styled, { injectGlobal, css } from 'styled-components';

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

const Container = styled.div`
  font-family: 'Josefin Sans', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #556f82;
  width: 100vw;
  @media (max-width: 400px){
    height: unset;
  }
`;

injectGlobal`
  body {
margin: 0;
}
`;

class App extends Component {
  state = {
    photos: [],
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.callApi()
        .then(res => {
          this.setState({
            photos: res,
            isLoading: false
          });
        })

        .catch(err => console.log(err));
    }, 2000);
  }

  callApi = async () => {
    const response = await fetch('/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    return (
      <Container>
        <Links />
        <Photos photos={this.state.photos} isLoading={this.state.isLoading} />
      </Container>
    );
  }
}

export default App;
