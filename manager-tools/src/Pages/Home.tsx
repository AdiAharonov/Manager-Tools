import * as React from 'react';
import { Link } from 'react-router-dom';
import { globalService } from '../Services/globalServices';
import logo from '../assets/images/logo.png';
import landingImage from '../assets/images/landing-image.png';
import logoName from '../assets/images/logo-name.png';
import SvgAnimationCmp  from '../Cmps/StyleCmps/SvgAnimationCmp';
export interface HomeProps {}

interface Categorie {
  name: string;
  link: string;
}

export const Home: React.FC<HomeProps> = () => {
  const [categories, setCategories] = React.useState<Categorie[]>([]);

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
      <SvgAnimationCmp />
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
