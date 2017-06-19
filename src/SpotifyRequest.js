/**
 * Created by jdanko on 6/2/17.
 */

class SpotifyRequest {
	constructor() {
		this.authToken = {
			token: null,
			expires: null
		};
		this.getAuthToken();
	}

	getAuthToken() {
		fetch('http://jimdankojr.com/fest-16/spotify-token.php')
		.then((response) => {
			response.json().then((responseData) => {
				this.authToken.token = responseData.access_token;
				this.authToken.expires = Date.now() + (parseInt(responseData.expires_in, 10) * 1000);
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	checkAuthToken() {
		if (Date.now() > this.authToken.expires) {
			this.getAuthToken();
		}
	}

	getArtist(id) {
		return new Promise((resolve, reject) => {
			this.checkAuthToken();
			if (id === null) resolve(null);
			fetch('http://jimdankojr.com/fest-16/get-artist.php?id=' + id + '&token=' + this.authToken.token)
				.then((response) => {
					response.json().then((data) => {
						resolve(data);
					});
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

export default SpotifyRequest;