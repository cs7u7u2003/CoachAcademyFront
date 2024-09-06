import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CCol } from '@coreui/react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    onLogin(username, password);
  };

  return (
    <CForm>
      <CInputGroup className="mb-3">
      <CInputGroupText>
          <CIcon icon={cilUser} /> 
        </CInputGroupText>
        <CFormInput placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </CInputGroup>
      <CInputGroup className="mb-4">
      <CInputGroupText>
          <CIcon icon={cilLockLocked} /> 
        </CInputGroupText>
        <CFormInput type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </CInputGroup>
      <CRow>
        <CCol xs={6}>
          <CButton color="primary" className="px-4" onClick={handleLoginClick}>
            Login
          </CButton>
        </CCol>
        <CCol xs={6} className="text-right">
          <CButton color="link" className="px-0">
            Forgot password?
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default LoginForm;
