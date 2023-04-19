import { useRef } from "react";
import styles from "./Canvas.module.css";
import { Button } from "react-bootstrap";

const Canvas = (props) => {
    const canvasRef = useRef(null);

    const handleDrag = (e) => {
        if(e.buttons === 1) {
            // console.log(e.clientX - e.target.offsetLeft)
            const context = canvasRef.current.getContext("2d");
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            context.beginPath();
            context.arc(x, y, 5, 0, 2*Math.PI);
            context.fillStyle = "black";
            context.fill();
            context.stroke();
        }

    }

    const sendImage = () => {
        const imageLink = canvasRef.current.toDataURL("image/jpg");
        console.log(imageLink);
        fetch(`http://b1dd-35-238-211-46.ngrok.io/getImage`, {
            method: "POST",
            mode: "no-cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({image: imageLink})
        })
        return;
        // let a = document.createElement('a');
        // a.href = imageLink;
        // a.download = "canvasImage.jpg";
        // a.style.display = "none";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
    }

    return ( 
        <>
            <canvas ref={canvasRef} {...props} onMouseMove={handleDrag} className={styles.canvas}>

            </canvas>
            <div className="buttonSection">
                <Button onClick={sendImage} variant="success">
                    Submit
                </Button>
                {' '}
                <Button 
                    onClick={() => canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)}
                    variant="danger"
                >
                    Clear
                </Button>
            </div>
        </>
     );
}
 
export default Canvas;