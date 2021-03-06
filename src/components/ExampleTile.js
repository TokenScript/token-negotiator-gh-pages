import React from 'react'
import {Link} from "react-router-dom";

class ExampleTile extends React.Component {


    render() {

        return <div className="listTile">
            <Link to={"/details/" + this.props.urlKey}>
                <div>
                    <img width={'100%'} src={this.props.example.thumbUrl}
                         srcSet={this.props.example.thumbUrl.replace('.png', '') + '@2x.png 800w, ' + this.props.example.thumbUrl.replace('.png', '') + '@3x.png 1200w'}
                         alt="Example thumbnail"/>
                </div>
                <h3 className="tileTitle" dangerouslySetInnerHTML={{__html: this.props.example.name.replace("(", "<br/>(")}}/>
            </Link>
        </div>;
    }
}

export default ExampleTile;