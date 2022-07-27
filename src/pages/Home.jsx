import Trails from "../components/Trails";

const Home = ({trails, updateTrailState}) => {
    return (
        <div>
            {/* HR: Potential App Name? */}
            <h1>Take a Hike</h1>
            <div>
                <Trails trails={trails} updateTrailState={updateTrailState}/>
            </div>
        </div>
    );
};

export default Home;
