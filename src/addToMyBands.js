/**
 * Created by jdanko on 6/6/17.
 */
import React, {Component} from 'react';

class AddToMyBands extends Component {
	render() {
		return (
			<i
				onClick={() => this.props.addToMyBands()}
				className={this.props.cssClass + ' material-icons mdc-icon-toggle my-band-toggle'}
				role="button" aria-pressed="false"
				aria-label={(this.props.isInMyBands() ? 'Remove from my bands' : 'Add to my bands')}
				tabIndex="0"
				data-toggle-on='{"label": "Remove from my bands", "content": "star"}'
			    data-toggle-off='{"label": "Add to my bands", "content": "star_border"}'
			>{(this.props.isInMyBands() ? 'star' : 'star_border')}</i>
		)
	}
}

export default AddToMyBands;