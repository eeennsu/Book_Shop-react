import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootParent } from './components/styled/Styled';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import UploadBookPage from './components/views/UploadBookPage/UploadBookPage';
import Auth from './hoc/auth'                 // 로그인여부, 관리자여부등의 확인을 담당해주는 Auth를 모든 페이지에 감싸면 HOC 기능이 적용된다
import './app.scss';
import Footer from './components/views/Footer/Footer';
import DetailBookPage from './components/views/DetailBookPage/DetailBookPage';
import FavoritesPage from './components/views/FavoritesPage/FavoritesPage';
import RecordPage from './components/views/RecordPage/RecordPage';

const Auth_LandingPage = Auth(LandingPage, null);
const Auth_LoginPage = Auth(LoginPage, false);
const Auth_RegisterPage = Auth(RegisterPage, false);
const Auth_UploadBookPage = Auth(UploadBookPage, true);
const Auth_DetailBookPage = Auth(DetailBookPage, true);
const Auth_FavoritesPage = Auth(FavoritesPage, true);
const Auth_RecordPage = Auth(RecordPage, true);

const App = () => {	

	return (
		<Router>
			<NavBar />
				<RootParent>
					<Routes>
						<Route exact path='/' element={<Auth_LandingPage />} />               {/*관리자만 들어가야하는 페이지는 3번째 인자로 true를 준다*/}
						<Route exact path='/loginPage' element={<Auth_LoginPage /> } />    
						<Route exact path='/registerPage' element={<Auth_RegisterPage />} />      
						<Route exact path='/book/upload' element={<Auth_UploadBookPage />}/>
						<Route exact path='/book/:bookId' element={<Auth_DetailBookPage />} />
						<Route exact path='/user/favorites' element={<Auth_FavoritesPage />} />
						<Route exact path='/user/record' element={<Auth_RecordPage />} />
					</Routes>
				</RootParent>      
			<Footer/>      
		</Router>
	);
}

export default App;