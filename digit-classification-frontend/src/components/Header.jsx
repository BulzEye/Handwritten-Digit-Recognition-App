import { Container, Navbar } from "react-bootstrap";
import styles from "./Header.module.css";

const Header = (props) => {
    return ( 
        // <header>
        //     <h1>Digit Classifier</h1>
        // </header>
        <Navbar className={styles.header}>
            <Container>
                <Navbar.Brand href="#home" className={styles.header_text}>
                    Digit Classifier
                </Navbar.Brand>
            </Container>
        </Navbar>
     );
}
 
export default Header;