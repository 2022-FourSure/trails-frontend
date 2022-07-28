import Trails from "../components/Trails";
import styled from 'styled-components'

const HomepageBody = styled.div`
    h1 {
        font-size: 50px;
        text-align: center;
    }
`

const Home = ({trails, updateTrailState}) => {
    return (
        <HomepageBody>
            <img src="../../public/assets/homepage-background.png" alt="background" />
            <h1>Take a Hike</h1>
            <div>
                <Trails trails={trails} updateTrailState={updateTrailState}/>
            </div>
        </HomepageBody>
    );
};

export default Home;
