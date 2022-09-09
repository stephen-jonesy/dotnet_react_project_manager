import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Response } from './response-message/Response';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Response />
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
