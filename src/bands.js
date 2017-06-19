/**
 * Created by jdanko on 6/2/17.
 */
import React, {Component} from 'react';
import Band from "./band";
let io;

class Bands extends Component {
	componentDidMount() {
		if (window.IntersectionObserver) {
			const ioOptions = {
				root: null,
				rootMargin: '0px',
				threshold: 0.1
			};
			io = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						let imageTag = entry.target.querySelector('.band-image');
						imageTag.src = imageTag.dataset.src;
						io.unobserve(entry.target);
					}
				});
			}, ioOptions);
			const bandImages = [...document.querySelectorAll('.band')];
			bandImages.forEach(image => {
				io.observe(image);
			});
		}
	}
	shouldComponentUpdate() {
		return true;
	}
	componentWillUpdate() {
		// TODO: Is there a better way to do this?
		// Currently disconnecting observer then reinitializing it
		io.disconnect();
	}
	componentDidUpdate() {
		this.componentDidMount();
	}
	render() {
		let bands = [];
		for(let i = 0; i < this.props.bands.length; i++) {
			bands.push(<Band
				key={this.props.bands[i].key}
				band={this.props.bands[i]}
				addToMyBands={() => this.props.addToMyBands(this.props.bands[i])}
			    spotify={this.props.spotify}
			    showBandDetails={() => this.props.showBandDetails(i)}
			    isInMyBands={() => this.props.isInMyBands(this.props.bands[i].key)}
			/>);
		}
		return (
			<div className="mdc-grid-list mdc-grid-list--twoline-caption mdc-grid-list--with-icon-align-start">
				<ul className="bands mdc-grid-list__tiles">
					{bands}
				</ul>
			</div>
		)
	}
}

export default Bands;