import React from 'react'

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: props.time,
            step: props.step,
            inProgress: false,
            progressBar: 100,
        }
        this.timerButton = React.createRef();
    }

    tick = () => {
        
        this.setState({
            time: this.state.time - this.state.step,
            progressBar: (this.state.time - this.state.step)/this.props.time*100
        })
        if (this.props.onTick){
            if (this.state.time > 0){
                this.props.onTick.call(this,this.state.time);
            }
            else {
                this.props.onTick.call(this,0);
            }
        }
    }

    componentDidMount() {
        if (this.props.autostart){
            this.startStop();
        }
    }

    startStop = (e) => {
        if (!this.state.inProgress){

            if(this.props.onTimeStart){
                this.props.onTimeStart();
            }
            if (this.state.time <= 0){
                this.setState({
                    time: this.props.time,
                    progressBar: 100
                })
            }
            this.timerButton.current.innerText = 'pause';
            this.setState({
                inProgress: true,
            });
            this.timerID = setInterval(()=>{
                this.tick()
                if (this.state.time <= 0){
                    this.timerButton.current.innerText = 'start';
                    this.setState({
                        inProgress: false,
                        time: 0,
                        progressBar: 0
                    });
                    clearInterval(this.timerID);
                    if (this.props.onTimeEnd){
                        this.props.onTimeEnd();
                    }
                }
            },this.state.step)
        }
        else{
            this.timerButton.current.innerText = 'resume';
            this.setState({
                inProgress: false,
            });
            if(this.props.onTimePause){
                this.props.onTimePause()
            }
            clearInterval(this.timerID);
        }
    }

    humanReadable(ms) {
        const pad = function(x) {
            return (x < 10) ? "0"+x : x; 
        }
        const addZero = function(x){
            let num = x.toString()
            while (num.length < 3){
                num = '0' + num
            }
            return num
        }
        return pad(parseInt(ms/(60*1000))) + ':' +
            pad(parseInt(ms/1000)) + ':' +
            addZero(ms%1000)
    }


    render(){
        const style = {width: this.state.progressBar+"%"}
        return(
            <div className="timer">
                <h1>
                {this.humanReadable(this.state.time)}
                </h1>
                <button onClick={this.startStop} ref={this.timerButton}>Start</button>
                <div className="bar" style={style}></div>
            </div>
        )
    }
}

Timer.defaultProps = {
    autostart: false,
    time: 10000,
    step: 1000
}

export default Timer