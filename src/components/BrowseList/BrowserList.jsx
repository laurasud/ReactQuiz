import React, { Component } from 'react'
import './BrowserList.scss'
import {
  Link
} from 'react-router-dom'

class BrowserList extends Component {
	constructor(props) {
		super(props);

    this.state = {
      items: [],
      visible: 6
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 3};
    });
	}

	addToFavorites(item) {
		this.setState(this.state.items.map(element => {
			if (element === item) {
				element.favorite = !JSON.parse(item.favorite)
				return element;
			} else {
				return element;
			}
		}));
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
		fetch("http://localhost:3001/browse").then(
			res => res.json()
    ).then(res => {
      this.setState({
        items: res.items
      });
    }).catch(error => {
      console.error(error);
		});
	}

  render() {
    return (
      <div>
        <h1 className="header"><p>Browse Page</p></h1>
        <section className="page-list">
				{this.state.items.slice(0, this.state.visible).map((item, index) => {
					return (
						<div className="item-card" key={index}>
							<Link to={`/item/${item.integerId}`}>
								<img src={item.image} alt={item.attributes}></img>
							</Link>
							<div className="buttom-part">
								<p className="price">{item.price ? item.price.amounts.USD : 'Price Upon Request'}</p>
								<div className={"fav-icon " + item.favorite} onClick={() => this.addToFavorites(item)}></div>
							</div>
						</div>
						);
				})}
        {this.state.visible < this.state.items.length &&
					<div className="section-bottom">
						<button 
							onClick={this.loadMore} 
							type="button" 
							className="load-more-button">
							load more
						</button>
					</div>
				}
        </section>
			</div>
    );
  }
}

export default BrowserList;