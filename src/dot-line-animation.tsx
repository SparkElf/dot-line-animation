import React from "react"
import { Renderer } from "./renderer"
var containerCSS = {
    margin: '0',
    padding: '0',
    backgroundColor: '#FFFFFF',
}
export const DotLineAnimation = (props) => {
    const [app,] = React.useState(new Renderer())
    React.useEffect(() => {
        app.launch(props.area ? props.area : void 0)
    }, [])
    return (
        <div id="dot-line-container" className={props.className} style={containerCSS}>
            <canvas id="dot-line-canvas">
            </canvas>
        </div>
    )
}