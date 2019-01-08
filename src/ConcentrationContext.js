import React from 'react';
const Context = React.createContext();

class Provider extends React.Component {
    constructor(props){
        super(props);
        
        this.state= {
            score: 0,
	    steps: 0,
	    timer: null,
	};
    }
    
    render(){
	return (
	    <Context.Provider value={{state: this.state}}>
		{this.props.children}
	    </Context.Provider>
	)
    }
}

const Consumer = Context.Consumer;

export { Consumer };

export default Provider;
