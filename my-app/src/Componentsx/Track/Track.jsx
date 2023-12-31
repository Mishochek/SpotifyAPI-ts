import React from "react";
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if(this.props.isRemoval) {
            return <button className='Track-action' onClick={this.removeTrack}>-</button>
        } else { return <button className='Track-action' onClick={this.addTrack}>+</button>}
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    render() {
        return(
            <div className="Track">
                <audio src={this.props.track.preview} id='player'/>

                <script>
                    let myAudio = document.getElementById('my-audio');
                    console.log(myAudio);
                </script>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}             
            </div>
        )
    }
}