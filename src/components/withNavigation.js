import React from 'react';
import { useNavigate } from 'react-router-dom';

// Higher Order Component to inject the navigate function into class components
export function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
