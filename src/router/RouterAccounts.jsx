import { Routes, Route } from 'react-router-dom';

import PageLogin from 'pages/accounts/PageLogin';
import PageSignup from 'pages/accounts/PageSignup';

function RouterAccounts() {
  return (
    <div>
      <Routes>
        <Route path="/login/" element={<PageLogin />} />
        <Route path="/signup/" element={<PageSignup />} />
      </Routes>
    </div>
  );
}

export default RouterAccounts;
