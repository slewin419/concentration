import React from 'react';
//import Cell from './Cell';
import PropTypes from 'prop-types';

class SquareGrid extends React.Component
{
    constructor(props){
        super(props);

        this.size     = props.size;
        this.numCells = Math.pow(props.size, 2);
    }

    renderGrid(){
        let grid = [];

        for(let i=0;i<this.numCells;i++){
            grid.push(<div key={i}>{i}</div>);
        }

        return grid;
    }

    render(){
        let columnStyle = {gridTemplateColumns: 'auto '.repeat(this.size)};
        return(
            <div className="grid" style={{...gridStyle,...columnStyle}}>
                {this.renderGrid()}
            </div>
        )
    }
}

SquareGrid.propTypes = {
    size: PropTypes.number
};

const gridStyle = {
    display: 'grid'
};

export { SquareGrid };
