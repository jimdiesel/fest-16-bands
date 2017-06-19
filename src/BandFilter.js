/**
 * Created by jdanko on 6/2/17.
 */
import React, {Component} from 'react';
const mdcDrawer = require('@material/drawer/dist/mdc.drawer.min');
const mdcSelect = require('@material/select/dist/mdc.select.min');

class BandFilter extends Component {
	componentDidMount() {
		let drawer = new mdcDrawer.MDCPersistentDrawer(document.querySelector('.mdc-persistent-drawer'));
		drawer.drawerClickHandler_ = null;
		document.querySelector('.menu').addEventListener('click', () => drawer.open = !drawer.open);
		document.querySelector('.mdc-persistent-drawer__drawer').removeEventListener('click', drawer.drawerClickHandler_);
		let sortSelect = new mdcSelect.MDCSelect(document.querySelector('.sort-select'));
		sortSelect.listen('MDCSelect:change', () => {
			this.props.sortBands(sortSelect.value);
		});
	}
	render() {
		return (
			<header className="mdc-toolbar mdc-toolbar--fixed">
				<div className="mdc-toolbar__row">
					<section className="mdc-toolbar__section mdc-toolbar__section--align-start">
						<button className="menu mdc-button mdc-button--accent mdc-button--raised">
							<i className="material-icons">menu</i>
							My Bands
						</button>
					</section>
					<section className="mdc-toolbar__section mdc-theme--dark">
						<div className="mdc-select sort-select" role="listbox" tabIndex="0">
							<span className="mdc-select__selected-text">Sort by:</span>
							<div className="mdc-simple-menu mdc-select__menu">
								<ul className="mdc-list mdc-simple-menu__items">
									<li className="mdc-list-item" role="option" id="sort-default" aria-selected="false" aria-disabled="true">Sort by:</li>
									<li className="mdc-list-item" role="option" id="sort-alpha" aria-selected="false">Alphabetical</li>
									<li className="mdc-list-item" role="option" id="sort-alpha-r" aria-selected="false">Alphabetical (Reverse)</li>
									<li className="mdc-list-item" role="option" id="sort-followers" aria-selected="false">Followers</li>
									<li className="mdc-list-item" role="option" id="sort-followers-r" aria-selected="false">Followers (Low to High)</li>
									<li className="mdc-list-item" role="option" id="sort-pop" aria-selected="false">Popularity</li>
									<li className="mdc-list-item" role="option" id="sort-pop-r" aria-selected="false">Popularity (Low to High)</li>
								</ul>
							</div>
						</div>
					</section>
					<section className="mdc-toolbar__section mdc-toolbar__section--align-end">
						<div className="mdc-textfield mdc-theme--dark">
							<input className="mdc-textfield__input" type="search" name="band-filter" onChange={this.props.filterBands} placeholder="Search Bands/Cities" />
						</div>
					</section>
				</div>
			</header>
		)
	}
}

export default BandFilter;