import * as React from "react";
import { Link } from 'react-router-dom';
import { globalService } from '../Services/globalServices';

export interface HomeProps {
    
}

interface Categorie {
    name: string,
    link: string
}


export const Home:React.FC<HomeProps> = () => {

    const [categories, setCategories] = React.useState<Categorie[]>([]);

    React.useEffect(() => {
        const currCategories = globalService.getCategories();
        console.log(currCategories)
        setCategories(currCategories);
      }, [])
    

    
        return (
            <div className="home">
                <h1>MANAGER TOOLS</h1>
                {categories && <div className="categories">
                    {categories.map((categorie, idx) => <Link to={categorie.link} key={idx}><div className="categorie">{categorie.name}</div></Link>) }
                </div>}
            </div>
        )
    
}
