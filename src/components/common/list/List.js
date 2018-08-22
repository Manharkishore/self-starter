import React from 'react';

class List extends React.Component{
    /* React State: It is an object that determines how our component renders and behave. 
     It allows us to create dynamic and interactive components. */
    constructor(){                  //for initializing the state we need class constructor method.
                                    /*Everytime we are creating class constructor we need to call a super method bcz ES6 class constructor call super
                                    if they are sub classes and all our class based components are sub class of 'React.Component' class. 
                                     and also 'this' keyword is uninitialized if super is not called.*/
                
                    super(); 

                    this.state = {    //creating an initial state after super.
                        loading: false,
                        currencies : [],
                        error : null
                    };
                }

                componentDidMount() {

                    this.setState({ loading: true });
                    fetch('https://api.udilia.com/coins/v1/cryptocurrencies?page=1&perPage=20')
                    .then(response => {
                      return response.json().then(json => {
                        return response.ok ? json : Promise.reject(json);
                      });
                    })
                    .then((data) => {
                     this.setState({
                         currencies: data.currencies,
                         loading: false 
                        });
                    })
                    .catch((error) => {
                        this.setState({ 
                         error: error.errorMessage,
                         loading: false 
                        });
                    });
                }

            render(){
                    console.log(this.state);

                  if(this.state.loading){
                         return <div>Loading...</div>
                 }


        return(
            <div> list </div>
    );
    }
}

export default List;