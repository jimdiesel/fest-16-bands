/**
 * Created by jdanko on 6/2/17.
 */
import React, {Component} from 'react';
import AddToMyBands from "./addToMyBands";

class Band extends Component {
	render() {
		return (
			<li key={this.props.band.key} className="mdc-grid-tile band">
				<div className="mdc-grid-tile__primary" onClick={() => this.props.showBandDetails()}>
					<img data-src={(this.props.band.image !== null ? this.props.band.image : "/fest-logo.png")} alt="" className="band-image" />
				</div>
				<div className="mdc-grid-tile__secondary">
					<AddToMyBands
						addToMyBands={() => this.props.addToMyBands()}
					    isInMyBands={() => this.props.isInMyBands()}
					    cssClass="mdc-grid-tile__icon"
					/>
					<span className="mdc-grid-tile__title" onClick={() => this.props.showBandDetails()}>{this.props.band.name}</span>
					<span className="mdc-grid-tile__support-text" onClick={() => this.props.showBandDetails()}>{this.props.band.location}</span>
				</div>
			</li>
		)
	}
}

export default Band;
