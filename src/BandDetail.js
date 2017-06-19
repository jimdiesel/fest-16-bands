/**
 * Created by jdanko on 6/2/17.
 */
import React, {Component} from 'react';
import AddToMyBands from "./addToMyBands";

class BandDetail extends Component {
	constructor() {
		super();
		this.state = {
			isInMyBands: false
		}
	}
	componentDidMount() {
		this.setState({
			isInMyBands: this.props.isInMyBands()
		});
	}
	starClick() {
		let isInMyBands = this.state.isInMyBands;
		this.props.addToMyBands();
		this.setState({
			isInMyBands: !isInMyBands
		});
	}
	render() {
		if (this.props.bandDetails !== null) {
			return (
				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					<div style={{flexBasis: '100%'}}>
						<span>{(this.state.isInMyBands ? 'Remove from my bands' : 'Add to my bands')}&nbsp;</span>
						<AddToMyBands
							addToMyBands={() => this.starClick()}
						    isInMyBands={() => this.props.isInMyBands()}
						    cssClass=""
						/>
					</div>
					<div style={{flexBasis: '50%'}}>
						<dl>
							<dt>Popularity:</dt>
							<dd>{this.props.bandDetails.popularity}</dd>
							<dt>Followers:</dt>
							<dd>{this.props.bandDetails.followers.total.toLocaleString()}</dd>
							<dt>Genres:</dt>
							<dd>{this.props.bandDetails.genres.length > 0 ? this.props.bandDetails.genres.reduce((all, current, index) => all + ', ' + current) : ''}</dd>
						</dl>
					</div>
					<div style={{flexBasis: '50%'}}>
						<iframe src={'https://open.spotify.com/embed/artist/' + this.props.id} width="300" height="380" frameBorder="0" allowTransparency="true" title={'Listen to ' + this.props.bandDetails.name}></iframe>
					</div>
				</div>
			)
		}
		return null
	}
}

export default BandDetail;