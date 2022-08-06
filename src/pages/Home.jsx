import Trails from "../components/Trails";

const Home = ({trails, updateTrailState}) => {
    return (
        <div className="home">

            <div className="box">
                <img 
                    className="bg-img" 
                    src="/assets/background_image.jpg" 
                    alt="background" />   
            </div>
            
            <div className="quote-overlay">
                <figure className="text-center">
                        <blockquote className="blockquote h5">
                            <p>There are no shortcuts to any place worth going.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Beverly Sills 
                        </figcaption>
                    </figure>          
            </div>
            <div>
                <Trails trails={trails} updateTrailState={updateTrailState}/>
            </div>            
        </div>

    );
};

export default Home;
