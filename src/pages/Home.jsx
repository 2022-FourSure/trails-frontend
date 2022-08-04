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
    margin-bottom: -50px;
`
const Home = ({trails, updateTrailState}) => {
    return (
        <HomepageBody>
            <BackgroundImage>
                <div class="bg-img">
                    <img src="/assets/background_image.jpg" alt="background" />
                </div>
            </BackgroundImage>
            <div>
                <Trails trails={trails} updateTrailState={updateTrailState}/>
            </div>
        </HomepageBody>
    );
};

export default Home;
