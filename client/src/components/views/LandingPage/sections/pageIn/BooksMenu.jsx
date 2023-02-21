import React from 'react';
import { useState } from 'react';
import BookTypeCheckbox from '../menus/BookTypeCheckbox';
import PriceRadio from '../menus/PriceRadio';
import { priceRanges } from '../menus/PriceRadio';
import SearchBooks from '../menus/SearchBooks';

const BooksMenu = ({ resetSkip, limit, getBooks, reloading }) => {

    const [filters, setFilters] = useState({
		type: [],
		price: []
	});
	const [searchkeyword, setSearchKeyword] = useState();

    const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,	
			limit: limit,
			filters: filters
		};
     
		getBooks(variables);
		resetSkip();
	};

    const handleFilters = (__filters, category) => {
		
		let newFilters = { ...filters };
		newFilters[category] = __filters;

		if (category === 'price') {
			newFilters[category] = [...priceRanges].filter(({ index }) => index === __filters)[0].range;
		}

		setFilters(newFilters);
		showFilteredResults(newFilters);
	}; 

	const updateSearchBooks = (searchKeyword) => {		
		const variables = {
			skip: 0,
			limit: limit,
			filters: filters,	
			searchKeyword: searchKeyword,		
		};

		resetSkip();
		setSearchKeyword(searchKeyword);
		getBooks(variables);
	};

    return (
        <React.Fragment>
			<div className='col-md-6 mb-3 mb-md-0 rounded'>
				<BookTypeCheckbox handleFilters={filters => handleFilters(filters, 'type')} reloading={reloading}/>
			</div>
		    <div className='col-md-6'>
				<PriceRadio handleFilters={filters => handleFilters(filters, 'price')} reloading={reloading}/>
			</div>	
			<div className='d-flex justify-content-center justify-content-md-end mt-2'>
				<SearchBooks updateSearchBooks={updateSearchBooks}/>         
			</div>
			<hr className='menu_border'/>					
        </React.Fragment>
    );
};

export default BooksMenu;