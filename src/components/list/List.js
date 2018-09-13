import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

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
                        error : null,
                        totalPages: 0,
                        page: 1,
                    };
                    this.handlePaginationClick = this.handlePaginationClick.bind(this);
                }

                componentDidMount() {
                    this.fetchCurrecies();
                }

                fetchCurrecies(){
                    this.setState({ loading: true });

                    const { page } = this.state;

                    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
                    .then(handleResponse)
                    .then((data) => {
                       const { currencies, totalPages } = data;
                        
                     this.setState({
                         currencies,
                         totalPages,
                         loading: false,
                        });
                    })
                    .catch((error) => {
                        this.setState({ 
                         error: error.errorMessage,
                         loading: false,
                        });
                    });
                }

               

                handlePaginationClick(direction){

                    let nextPage = this.state.page;

                    // Increment nextPage if direction variable is next, otherwise decrement
                   
                    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

                    
                    
                    //if(direction === 'next'){
                    //     nextPage++;
                    // }
                    // else{
                    //    nextPage--; 
                    // }

                    this.setState({ page: nextPage }, () => {
                        // call fetchCurrencies function inside setState's callback
                        // because we have to make sure first page state is updated
                        this.fetchCurrecies();
                    });
                }

            render(){
                // ES6 Destructuring.
                const { loading, error, currencies, page, totalPages } = this.state;
                // render only loading component, if loading state is set to true
                  if(loading){
                         return <div className = "loading-container"><Loading /></div>
                 }

                 //render only error message, if error occurred while fetching data
                 if(error) {
                     return <div className="error">{error}</div>
                 }


        return(
            <div>
                <Table 
                    currencies={currencies}
                   
                />
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />

           </div>
    );
    }
}

export default List;