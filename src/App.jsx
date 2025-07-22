import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Header from './components/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound'; //404대응

import DagymGuide from './pages/dagymguide';
import Works from './pages/Works';

function App() {
	return (
		<Router>
			{/* 상단 내비게이션 바 -> 각 페이지로 이동*/}
			
			{/* 라우팅 영역 */}
			<div className="min-h-screen">
				<Routes>
					<Route path="/" element={<Home />} />
					{/* 원하는 만큼 페이지 경로 추가 */}
					<Route path="*" element={<NotFound />} />

					<Route path="dagymguide" element={<DagymGuide />} />
					<Route path="works" element={<Works />} />

			
				</Routes>
			</div>
		</Router>
	);
}

export default App;