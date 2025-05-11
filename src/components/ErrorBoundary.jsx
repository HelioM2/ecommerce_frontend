import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode logar o erro ou enviar para um serviço de rastreamento de erros
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode personalizar o componente de fallback
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
