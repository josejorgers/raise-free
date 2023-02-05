import './App.css';
import TopNavbar from './components/topNavbar/topNavbar';
import Listing from './components/listing/listing';
import { Route, Routes } from 'react-router-dom';
import CreateFundraisingForm from './components/createForm/createForm';
import FundraisingDetail from './components/details/details';


function App() {
  

  return (
    <div className='main-app'>
      <TopNavbar />
      <main className='flex flex-col items-center justify-center w-full mt-20'>
        <Routes>
          <Route path="/create" element={<CreateFundraisingForm />} />
          <Route path="/details/:id" element={<FundraisingDetail />} />
          <Route path="/" element={ <Listing /> } />
        </Routes>
      </main>
    </div>
    
  )
}

export default App;
