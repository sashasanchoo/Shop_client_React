import React from 'react'
import Navbar from './Components/navbar';
import Layout from './Components/Layout';
import StateProvider from './Context/stateProvider';
import RoutesProvider from './pages/routeProvider';

function App() {
  return (
    <>
      <StateProvider>
      <Navbar/>
          <Layout>
          <RoutesProvider/>
          </Layout>
      </StateProvider>
      
    </>   
  );
}

export default App;
