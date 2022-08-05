import Trails from "../components/Trails";
// import styled from 'styled-components'

// const HomepageBody = styled.div`
//     h1 {
//         font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
//         font-size: 5vw;
//         text-align: center;
//     }
// `

// const BackgroundImage = styled.div`
//     opacity: 0.35;
//     img {
//         width: 100%;
//     }
//     margin-bottom: -100px;
// `
const Home = ({trails, updateTrailState}) => {
    return (
        // <HomepageBody>
        <div className="home">

            {/* <BackgroundImage> */}
            
            <div className="box">
                <img 
                    className="bg-img" 
                    src="/assets/background_image.jpg" 
                    alt="background" />   
            </div>
            
            {/* </BackgroundImage> */}

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

        // </HomepageBody>

    );
};

export default Home;
