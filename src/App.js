import { Route, Routes } from 'react-router-dom';
import RouterAccounts from 'router/RouterAccounts';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/accounts/*" element={<RouterAccounts />} />
      </Routes>
    </div>
  );
}

export default App;
