import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Canvas from './components/Canvas';
import styles from "./App.module.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <h2 className={styles.intro_heading}>Draw the digit in the canvas below</h2>
                <Canvas width={280} height={280}/>
            </Container>
        </div>
    );
}

export default App;
