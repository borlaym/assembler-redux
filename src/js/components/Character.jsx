import React from 'react';

export default React.createClass({

  render() {

    var showX = this.props.character.defeated ? (<span className="dead">X</span>) : "";
    var isFighting = this.props.character.isFighting && !this.props.character.defeated;
    var classes = isFighting ? 'character fighting' : 'character';

    return (
      <div className={classes}>
        {showX}
        <img src={this.props.character.thumbnail} />
        <span onClick={this.props.onRemove} className="remove">&times;</span>
        <p className="name">{this.props.character.name}</p>
      </div>
    );
  }
});
