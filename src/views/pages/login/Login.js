import React, { useState } from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardGroup, CAlert } from '@coreui/react';
import { login } from '../../../utils/LoginApi';
import LoginForm from '../../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../../../scss/login-background.scss';
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async (username, password) => {
    try {
      setAlertVisible(false);
      const data = await login(username, password);
      const { message } = data || {}; // Usamos el campo message si está presente
      if (message) {
        setAlertMessage(message);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);
      } else if (data && data.userId) { // Verificamos si los datos contienen userId
        localStorage.setItem('user', JSON.stringify(data)); // Guarda los datos del usuario en el almacenamiento local
        setIsLoggedIn(true); // Actualiza el estado de autenticación en App.js
        navigate('/DefaultLayout', { state: { responseData: data } });
      } else {
        setAlertMessage('Invalid credentials');
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setAlertMessage('Login failed. Please try again.');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="login-background c-app c-default-layout d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <LoginForm onLogin={handleLogin} />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        {alertVisible && alertMessage && (
          <CAlert color="danger" show={alertVisible.toString()}>
            {alertMessage}
          </CAlert>
        )}
      </CContainer>
      <footer className="position-absolute bottom-0 start-50 translate-middle-x">
        <p className="text-muted">
          Your Company Name | <a href="https://www.yourcompany.com">www.yourcompany.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
