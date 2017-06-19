import React, {Component} from 'react';
//import 'material-components-web/dist/material-components-web.css';
//import '@material/theme/dist/mdc.theme.css';
import '@material/layout-grid/dist/mdc.layout-grid.min.css';
import './mdc.grid-list.min.css';
import './App.css';
import Bands from "./bands";
import MyBands from "./MyBands";
import BandFilter from "./BandFilter";
import BandDetail from './BandDetail';
import SpotifyRequest from './SpotifyRequest';
const bandsJSON = require('./bands.json');
const mdcDialog = require('@material/dialog/dist/mdc.dialog.min');
const mdcIconToggle = require('@material/icon-toggle/dist/mdc.iconToggle.min');
const deferredStylesheets = [
	//'/css/mdc.grid-list.min.css',
	'/css/material-components-web.min.css',
	//'/css/App.css',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'/css/mdc.theme.css',
];
let bandDetailsModal;

class App extends Component {
	constructor() {
		super();
		this.state = {
			allBands: this.getBands(),
			bands: this.getBands(),
			myBands: JSON.parse(localStorage.getItem('myBands') || '[]'),
			spotify: new SpotifyRequest(),
			bandDetails: null,
			currentBand: null
		};
	}

	componentDidMount() {
		if (document.createStyleSheet) {
			deferredStylesheets.forEach(url => {
				document.createStyleSheet(url);
			});
		} else {
			deferredStylesheets.forEach(url => {
				let stylesheet = document.createElement('link');
				stylesheet.href = url;
				stylesheet.rel = 'stylesheet';
				stylesheet.type = 'text/css';
				document.getElementsByTagName('head')[0].appendChild(stylesheet);
			});
		}
		bandDetailsModal = new mdcDialog.MDCDialog(document.querySelector('#band-details'));
		mdcIconToggle.MDCIconToggle.attachTo(document.querySelector('.my-band-toggle'));
	}

	getBands() {
		const bands = bandsJSON;
		for(let i = 0; i < bands.length; i++) {
			bands[i].key = i;
			if (bands[i].location === null) {
				bands[i].location = '';
			}
			if (bands[i].followers === null) {
				bands[i].followers = 0;
			}
			if (bands[i].popularity === null) {
				bands[i].popularity = 0;
			}
		}
		return bands;
	}

	filterBands(event) {
		let filteredBands = this.state.allBands;
		let filteredBandsLocation = this.state.allBands;
		filteredBands = filteredBands.filter(function(band) {
			return band.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		});
		filteredBandsLocation = filteredBandsLocation.filter(function(band) {
			return band.location.toLowerCase().search(event.target.value.toLowerCase()) !== -1 && filteredBands.filter(b => b.key === band.key).length <= 0;
		});
		filteredBands = filteredBands.concat(filteredBandsLocation);
		this.setState({
			bands: filteredBands
		});
	}

	addToMyBands(band) {
		let myBands = this.state.myBands;
		if (myBands.filter(b => b.name === band.name).length <= 0) {
			myBands.push(band);
			myBands = myBands.sort((a, b) => {
				return a.name.replace(/^(The )/, '').localeCompare(b.name.replace(/^(The )/, ''));
			});
			this.setState({
				myBands: myBands
			});
			localStorage.setItem('myBands', JSON.stringify(this.state.myBands));
		} else {
			let index = myBands.findIndex(b => b.key === band.key);
			this.removeFromMyBands(index);
		}
	}

	removeFromMyBands(index) {
		let myBands = this.state.myBands;
		myBands.splice(index, 1);
		this.setState({
			myBands: myBands
		});
		localStorage.setItem('myBands', JSON.stringify(this.state.myBands));
	}

	isInMyBands(key) {
		let myBands = this.state.myBands;
		return (myBands.filter(b => b.key === key).length > 0);
	}

	showBandDetails(index) {
		// TODO: Display loading gif until getArtist call finishes
		let band = this.state.bands[index];
		let bandDetails = this.state.spotify.getArtist(band.id);
		bandDetails.then((data) => {
			if (data !== null) {
				this.setState({
					currentBand: band,
					bandDetails:
						<BandDetail
							id={band.id}
							bandDetails={data}
							spotify={this.state.spotify}
							addToMyBands={() => this.addToMyBands(band)}
							isInMyBands={() => this.isInMyBands(band.key)}
						/>
				});
			} else {
				this.setState({
					currentBand: band,
					bandDetails: <div>Spotify info not available for this artist. Womp womp.</div>
				});
			}
			bandDetailsModal.show();
		});
	}

	hideBandDetails() {
		this.setState({
			currentBand: null,
			bandDetails: null
		});
	}

	sortBands(sortBy) {
		let bands = this.state.bands;
		switch(sortBy) {
			case 'sort-alpha-r':
				bands = bands.sort((a,b) => {
					return b.name.replace(/^(The )/, '').localeCompare(a.name.replace(/^(The )/, ''));
				});
				break;
			case 'sort-followers':
				bands = bands.sort((a, b) => {
					return parseInt(b.followers, 10) - parseInt(a.followers, 10);
				});
				break;
			case 'sort-followers-r':
				bands = bands.sort((a, b) => {
					return parseInt(a.followers, 10) - parseInt(b.followers, 10);
				});
				break;
			case 'sort-pop':
				bands = bands.sort((a, b) => {
					return b.popularity - a.popularity;
				});
				break;
			case 'sort-pop-r':
				bands = bands.sort((a, b) => {
					return a.popularity - b.popularity;
				});
				break;
			default: // Sort alphabetically
				bands = bands.sort((a, b) => {
					return a.name.replace(/^(The )/, '').localeCompare(b.name.replace(/^(The )/, ''));
				});
				break;
		}
		this.setState({
			bands: bands
		});
	}

	render() {
		return (
			<div className="App">
				<BandFilter
					filterBands={(event) => this.filterBands(event)}
				    sortBands={(sortBy) => this.sortBands(sortBy)}
				/>
				<Bands
					bands={this.state.bands}
					addToMyBands={(band) => this.addToMyBands(band)}
				    spotify={this.state.spotify}
				    showBandDetails={(index) => this.showBandDetails(index)}
				    isInMyBands={(key) => this.isInMyBands(key)}
				/>
				<MyBands
					myBands={this.state.myBands}
					removeFromMyBands={(index) => this.removeFromMyBands(index)}
				/>
				<aside id="band-details" className="mdc-dialog" role="alertdialog" aria-labelledby="band-detail-label">
					<div className="mdc-dialog__surface">
						<header className="mdc-dialog__header" style={{flexWrap: 'wrap'}}>
							<h2 className="mdc-dialog__header__title" id="band-detail-label">{(this.state.currentBand !== null ? this.state.currentBand.name : '')}</h2>
							<p style={{flexBasis: '100%'}}>{(this.state.currentBand !== null ? this.state.currentBand.location : '')}</p>
						</header>
						<section className="mdc-dialog__body mdc-dialog__body--scrollable">
							{this.state.bandDetails}
						</section>
						<footer className="mdc-dialog__footer">
							<button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel" onClick={() => this.hideBandDetails()}>Close</button>
						</footer>
					</div>
					<div className="mdc-dialog__backdrop" />
				</aside>
			</div>
		);
	}
}

export default App;
