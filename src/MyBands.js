/**
 * Created by jdanko on 6/2/17.
 */
import React, {Component} from 'react';

class MyBands extends Component {
	render() {
		let myBands = [];
		for (let i = 0; i < this.props.myBands.length; i++) {
			myBands.push(
				<li key={i} id={"my-bands-" + this.props.myBands[i].key} className="">
					<span>{this.props.myBands[i].name}</span>
					<button onClick={(index) => this.props.removeFromMyBands(i)} className="mdc-button mdc-button--primary">x</button>
				</li>
			);
		}
		return (
			<aside className="mdc-persistent-drawer" id="my-bands">
				<div className="mdc-persistent-drawer__drawer">
					<header className="mdc-persistent-drawer__header">
						<span className="mdc-permanent-drawer__header-content">My Bands</span>
					</header>
					<ul className="mdc-persistent-drawer__content mdc-list">
						{myBands}
					</ul>
				</div>
			</aside>
		)
	}
}

export default MyBands;