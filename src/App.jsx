import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';

import { LabList } from './pages/LabList';
import { Lab } from './pages/Lab';
import { Model } from './pages/Model';
import { Auth } from './pages/Auth';
import { ModelList } from './pages/ModelList';
import { Error } from './pages/Error';
import { PrivateRoute } from './components';
import { AuthRedirect } from './pages/AuthRedirect';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Layout.Content style={{ padding: '24px 48px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/labs" />} />
            <Route path="/auth">
              <Route index element={<Auth />} />
              <Route path="redirect" element={<AuthRedirect />} />
            </Route>
            <Route path="labs">
              <Route index element={<PrivateRoute component={LabList} />} />
              <Route path=":labPath">
                <Route index element={<PrivateRoute component={Lab} />} />
                <Route path="models">
                  <Route index element={<PrivateRoute component={ModelList} />} />
                  <Route path=":modelPath" element={<PrivateRoute component={Model} />} />
                </Route>
              </Route>
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
