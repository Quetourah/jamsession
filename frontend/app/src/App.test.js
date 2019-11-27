import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD

import App from './App';




it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App.WrappedComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

=======
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
>>>>>>> changes
