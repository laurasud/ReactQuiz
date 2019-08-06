import React, { Component } from 'react'
import './ItemDetails.scss'

class ItemDetails extends Component {
	constructor(props) {
		super(props);

		this.goBack = this.goBack.bind(this);

    this.state = {
			item: {},
			measurements: ''
    };
	}

	goBack(){
		this.props.history.push("/");
	}

	addToFavorites(item) {
		item.favorite = !JSON.parse(item.favorite)
		this.setState(this.state);
		this.setFavorites(item);
	}

	setFavorites(item) {
		fetch(`http://localhost:3001/favorite/${item.integerId}`, {
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: `favorite=${item.favorite}`
		}).then(
			res => res.json()
		).then(res => {
			this.setState(this.state);
		}).catch(error => {
			console.error(error);
		});
	}
	
	componentDidMount() {
		fetch(`http://localhost:3001/item/${this.props.match.params.itemId}`).then(
			res => res.json()
    ).then(res => {
      this.setState({
				item: res,
				measurements: res.measurements.display
      });
    }).catch(error => {
      console.error(error);
		});
	}
	
	render() {
		return (
			<div>
				<h1 className="header">
					<a onClick={this.goBack}>&nbsp;Home</a>
					<p>{this.state.item.title}</p>
				</h1>
				<section className="page-list">
					<div className="inner-page">
						<div className="block image-block">
						<div className={"fav-icon " + this.state.item.favorite} onClick={() => this.addToFavorites(this.state.item)}></div>
							<img src={this.state.item.image} alt={this.state.item.attributes}></img>
						</div>
						<div className="description-block">
							<div className="block top-part">
								<h2>{this.state.item.attributes}</h2>
								<p className="price">{this.state.item.price ? this.state.item.price.amounts.USD : 'Price Upon Request'}</p>
								<p className="measurements no-margin"><b>Measurements: </b></p>
								<p className="measurements">{this.state.measurements}</p>
								<div className="action-buttons">
									<button className="right-border">purchase</button>
									<button>make offer</button>
								</div>
							</div>
							<div className="block bottom-part">
								<p>{this.state.item.description}</p>
								<p><b>Creator:</b> {this.state.item.creators}</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default ItemDetails;