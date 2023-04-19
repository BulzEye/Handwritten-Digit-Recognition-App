import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Canvas from './components/Canvas';

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <Canvas />
            </Container>
        </div>
    );
}

export default App;
