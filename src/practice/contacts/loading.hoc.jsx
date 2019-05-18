import React from 'react';

export default function WithLoading(WrappedComponent, isLoaded) {
  class ComponentWithLoading extends React.PureComponent {
    render() {
      if (isLoaded(this.props)) {
        return <WrappedComponent {...this.props} />;
      }
      return <h1>Loading...</h1>;
    }
  }
  return ComponentWithLoading;
}
