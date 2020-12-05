import React, { useState, useEffect, useRef } from 'react';
import styles from './GraphCanvas.module.scss';
import { useTheme } from './../../contexts/ThemeContext';
import classNames from 'classnames';
import { mapLogsToGraphData } from '../../util/statsHelpers';

const ReturnGraph = ( {points} ) => {
    const darkTheme = useTheme();

    return (
        <polyline points={points} className={classNames(
            styles.graph_stroke,
            darkTheme && styles.dark
        )}/>
    )
}

const GraphCanvas = ({logs}) => {
    const [ width, setWidth ] = useState(0);
    const graphRef = useRef(null);

    const returnPolylinePoints = (list) => {
        let pointsString = '';

        for (let i = 0; i < list.length; i++) {
            let ratingYpos = 220 - (Number(list[i].rating) * 20);
            pointsString += (Math.floor((width / 21) * (list.length - i - 1))) + "," + ratingYpos + " "; 
        }

        return pointsString
    }

    const handleResize = () => {
        let newWidth = 0;

        if (graphRef.current && graphRef.current.offsetWidth) {
            newWidth = graphRef.current.offsetWidth;
        } else {
            newWidth = 490;
        };

        if (newWidth !== width) {
            setWidth(newWidth);
        };
    };

    useEffect( () => {
        window.addEventListener('resize', handleResize);

        if (!width && graphRef.current && graphRef.current.offsetWidth) {
            setWidth(graphRef.current.offsetWidth)
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        }
        // eslint-disable-next-line
    }, []);

    const graphData = mapLogsToGraphData(logs);

    if (!graphData || !graphData.length) {
        return null;
    }

    const firstDate = graphData[0].date;
    const lastDate = graphData[graphData.length - 1].date;

    return (
        <div className={styles.graph_container}>
            <p><strong>Your mood graph</strong></p>
            <div className={styles.graph_canvas} ref={graphRef} >
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
                    <ReturnGraph points={returnPolylinePoints(graphData)} />
                </svg>
            </div>
            <div>From {lastDate} to {firstDate}</div>
        </div>
    )
}

export default GraphCanvas;