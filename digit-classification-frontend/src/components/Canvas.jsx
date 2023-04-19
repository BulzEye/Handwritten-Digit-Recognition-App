import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";
import { Button } from "react-bootstrap";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        clearCanvas();
    })

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
        setPrediction(null);
        const imageLink = canvasRef.current.toDataURL("image/jpg");
        console.log(imageLink);
        fetch(`http://127.0.0.1:5000/getImage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({image: imageLink})
        })
        .then(res => res.json())
        .then(data => {
            console.log(`Received data: ${JSON.stringify(data)}`);
            setPrediction(data.prediction);
        })
        // return;
        // let a = document.createElement('a');
        // a.href = imageLink;
        // a.download = "canvasImage.jpg";
        // a.style.display = "none";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
    }

    const clearCanvas = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.fillStyle = "white";
		context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
                    onClick={clearCanvas}
                    variant="danger"
                >
                    Clear
                </Button>
            </div>
            {(prediction !== null) && <div className={styles.prediction}>
                <h2>The predicted value is:</h2>
                <h1>{prediction}</h1>
            </div>}
        </>
     );
}
 
export default Canvas;