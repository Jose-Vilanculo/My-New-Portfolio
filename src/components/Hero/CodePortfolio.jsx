import classes from './CodePortfolio.module.css';


export const CodePortfolio = () => {
    return (
        <>
            <div className={classes.codePortfolio}>
                <div className={classes.top}>
                    <div className={classes.dots}>
                        <div className={classes.red}></div>
                        <div className={classes.yellow}></div>
                        <div className={classes.green}></div>
                    </div>

                    <div className={classes.selectedFile}>portfolio.js</div>

                    <div className={classes.file}>resume.jsx</div>
                </div>

                <div className={classes.middle}>
                    <div className={classes.numbers}>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                        <p>12</p>
                        <p>13</p>
                        <p>14</p>
                    </div>
                    <div className={classes.code}>
                        <p className={classes.blue}>const portfolio = {"{"}</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;name: "Jose Vilanculo",</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;roles: ["Software Developer", "Web Developer"],</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;tools: [</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Python",</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Django",</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"JavaScript,</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"React.js"</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;],</p>
                        <p className={classes.grey}>&nbsp;&nbsp;&nbsp;&nbsp;// Update this if your status changes</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;avaiable: True</p>
                        <p className={classes.blue}>{"}"};</p>
                        <p>{" "}&nbsp;</p>
                        <p className={classes.blue}>export default portfolio;</p>
                    </div>
                </div>

                <div className={classes.bottom}></div>
            </div>
        </>
    )
}