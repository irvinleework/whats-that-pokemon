import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10
    }
  }


  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          seconds: 10
        })
      })
      .catch((err) => console.log(err))
  }

  timer = () => {
    let countdown = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({
          seconds: this.state.seconds - 1
        })
      } else if (this.state.seconds == 0) {
        clearInterval(countdown)
      }
    }, 1000)
  };

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.timer()}}>Start!</button>
        <h1 className={'timer'} >{this.state.seconds}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style={this.state.seconds == 0 ? {filter: "brightness(100%)"} : {filter: "brightness(0%)"}} />
          <h1 className={'pokeName'} style={this.state.seconds == 0 ? {opacity: "1"} : {opacity: "0"}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;