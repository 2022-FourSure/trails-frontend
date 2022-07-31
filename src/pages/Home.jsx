import Trails from "../components/Trails";
import styled from 'styled-components'

const HomepageBody = styled.div`
    h1 {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 5vw;
        text-align: center;
    }
`

const BackgroundImage = styled.div`
    opacity: 0.35;
    img {
    width: 100%;
    }
`
const Home = ({trails, updateTrailState}) => {
    return (
        <HomepageBody>
            <h1>Take a Hike</h1>
            <BackgroundImage>
                <img src="/assets/background.png" alt="background" />
            </BackgroundImage>
            <div>
                <Trails trails={trails} updateTrailState={updateTrailState}/>
            </div>
        </HomepageBody>
    );
};

export default Home;
