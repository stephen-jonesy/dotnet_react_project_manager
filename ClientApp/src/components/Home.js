import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to Tuesday!</h1>
        <p>A personal project manager application built on <code>Dotnet</code> & <code>React</code>  </p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>Get started by <a href='https://get.asp.net/'>registering a user</a> or <a href="">Logging in</a>.</p> 
        <p>Then go to the <a href="">List</a> tab and create a project.</p>

      </div>
    );
  }
}
