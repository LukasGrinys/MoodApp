import React, { Component } from 'react';
import styles from './stats.module.css';
import { graphStroke } from './../../widgets/nightmodeColors';

class GraphCanvas extends Component {
    state = {
        width: 0
    }
    constructor(props){
        super(props);
        this.myInput = React.createRef()
    };
    returnPolylinePoints = (list) => {
        let pointsString = '';
        const elementWidth = this.state.width;
        for (let i = 0; i < list.length; i++) {
            let ratingYpos = 220 - (list[i] * 20);
            pointsString += (Math.floor((elementWidth / 21) * (list.length - i - 1))) + "," + ratingYpos + " "; 
        }
        return pointsString
    }
    componentDidMount () {
        window.addEventListener('resize', () => {
            let newWidth = this.myInput.current.offsetWidth;
            if (newWidth !== this.state.width) {
                this.setState({
                    width: newWidth
                })
            };
        });
        if (this.state.width === 0) {
            this.setState({
                width: this.myInput.current.offsetWidth
            })
        };
    }

    render() {
        return (
            <div className={styles.graph_canvas} ref={this.myInput} >
                <div className={styles.y_axis_number}>10</div>
                <div className={styles.y_axis_number} style={{transform: "translate(10px, 100px)"}}>5</div>
                <div className={styles.y_axis_number} style={{transform: "translate(10px, 200px)"}}>0</div>
                <svg width={"100%"} height={"100%"}>
                    <polyline points={"1,20 490,20"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,40 490,40"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,60 490,60"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,80 490,80"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,100 490,100"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,120 490,120"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,140 490,140"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,160 490,160"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,180 490,180"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,200 490,200"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={this.returnPolylinePoints(this.props.list)}
                    className={styles.graph_stroke} style={graphStroke(this.props.nightmode)}/>
                </svg>
            </div>
        )
    }
}

export default GraphCanvas;