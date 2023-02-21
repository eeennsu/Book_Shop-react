import React, { useCallback, useEffect, useState, useMemo } from 'react';
import BooksHeader from './sections/pageIn/BooksHeader';
import Book from './sections/book/Book';
import BooksMenu from './sections/pageIn/BooksMenu';
import useGetBooks from '../../utils/customHook/useGetBooks';
import Placeholder from './sections/sekeleton/CardPlaceholder';
import TopButton from './sections/utils/TopButton';
import { FileDoneOutlined } from '@ant-design/icons';

const LandingPage = () => {

	const limit = 12;
	const [skip, setSkip] = useState(0);
	const [books, postSize, getBooks, isLoading, setIsLoading] = useGetBooks();

	const resetSkip = useCallback(() => {
		skip !== 0 && setSkip(0);
	}, [skip]);

	// 커스텀 훅으로 대체
	// const getBooks = (variables) => {
	// 	(async () => {
	// 		try {
	// 			const response = await axios.post(`${BOOK}getBooks`, variables);
	// 			const { getBooksSuccess, books, postSize } = response.data;

	// 			if (getBooksSuccess) {
	// 				// loadMore버튼을 누르는 상황이라면 기존의 것에서 이어서 해야하고, 필터 상황이면 새로 갱신해야 한다
	// 				if(variables.loadMore){
	// 					setBooks(prve => [...prve, ...books]);
	// 				} else {
	// 					setBooks(books);
	// 				}

	// 				setPostSize(postSize);	

	// 			} else {
	// 				message.error('Failed to import books. Please access again');
	// 			}
	// 		} catch (error) {
	// 			message.error('ERROR - Failed to import books. Please access again');
	// 			console.error(error);
	// 		}
	// 	})();
	// };

	// 책 더 가져오기
	
	const LoadMoreBooks = () => {
		// console.log('loadMore!');
		// 12개 까지는 스킵, 이후 12개 가져오기.. 를 반복한다. 예를들어 16, 24, 32 번째 부터 8개씩 까져온다
		const variables = {
			skip: skip + limit,
			limit: limit,
			loadMore: true,
		};	

		getBooks(variables);	
		setSkip(prev => prev + limit);
	};

	const reloading = () => {
		setIsLoading(true);
	};
	
	useEffect(() => {
		const variables = {
			skip: skip,
			limit: limit,
		};	

		getBooks(variables);
	}, []);	

	const loadingSkeleton = useMemo(() => (
		Array.from({ length: limit }).map((v, i) => (
			<div className='col-6 col-md-4 col-xl-3 mb-5' key={`card-placeholder-${i}`}>
				<Placeholder key={i} />
			</div>				
		))
	), []);
	
	
	return (
		<main className='landing_page'>
			<TopButton />
			<header className='header d-flex justify-content-center'>
				<BooksHeader />
			</header>			
			<section className='menus d-flex justify-content-center row mx-md-2 mx-1'>
				<BooksMenu resetSkip={resetSkip} limit={limit} getBooks={getBooks} reloading={reloading}/>
			</section>			
			<section className='body'>
				<div className='d-flex row align-items-center justify-content-start'>
					{							
						isLoading ? 

						loadingSkeleton :

						books && books.map(({ _id, title, price, images, type }, i) => (					
							<div className='col-6 col-md-4 col-xl-3 mb-5 ' key={_id} >
								<a href={`/book/${_id}`}>
									<Book 										
										title={title} 
										type={type}
										price={price} 
										images={images} 
										isLast={postSize >= limit && books.length -1 === i}
										cb={LoadMoreBooks}
										/>		
								</a>																				
							</div>							
						))
					}
					{
						postSize < limit && 						
						<div className='d-flex justify-content-center mb-4'>
							<div className='loaded d-flex flex-column align-items-center justify-content-center'>
								<FileDoneOutlined style={{ color: '#fff', fontSize: '3rem' }}/>
								<span style={{ color: '#fff', marginTop: '4px', fontSize: '16px' }}>All Book Loaded!</span>
							</div>							
						</div>	
					}
				</div>
			</section>
		</main>
	);
}

export default LandingPage;