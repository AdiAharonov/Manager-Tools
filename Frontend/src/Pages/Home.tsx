import * as React from 'react';
import { Link } from 'react-router-dom';
import { globalService } from '../Services/globalServices';
import logo from '../assets/images/logo.png';
import landingImage from '../assets/images/landing-image.png';
import logoName from '../assets/images/logo-name.png';
import {Login} from '../Cmps/Login';

export interface HomeProps {}

interface Categorie {
  name: string;
  link: string;
}

export const Home: React.FC<HomeProps> = () => {
  const [categories, setCategories] = React.useState<Categorie[]>([]);
  const [loginForm, setLoginForm] = React.useState<{showForm: boolean, formType: string}>({showForm: false, formType: 'login'});

  React.useEffect(() => {
    const currCategories = globalService.getCategories();
    console.log(currCategories);
    setCategories(currCategories);
  }, []);

  return (
    <div className="home main-container">
      <div className="logo-container">
        <img className="logo" src={logo} alt={logoName} />
        <img className="logo-name" src={logoName} alt="" />
      </div>

      <div className="login">
      <button className="register" onClick={() => setLoginForm({showForm: true, formType: 'register'})}>Register</button>
      <button className="login" onClick={() => setLoginForm({showForm: true, formType: 'login'})}>Login</button>
      </div>

     {loginForm.showForm && <Login newUser={loginForm.formType === 'login' ? false : true} closeModal={setLoginForm} />} 

     
      <div className="greeting">
        <h2>Welcome!</h2>
        <h3>What's the plan for today:</h3>
      </div>

      {categories && (
        <div className="categories">
          {categories.map((categorie, idx) => (
            <Link to={categorie.link} key={idx}>
              <div className="categorie">{categorie.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
