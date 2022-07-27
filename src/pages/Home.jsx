import React, { useState, useEffect } from "react";
import Trails from "../components/Trails";

const Home = () => {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        // HR: Wrote out the whole link to hit PORT 8000
        fetch("http://localhost:8000/trails/")
            .then((res) => res.json())
            .then((json) => {
                setTrails(json);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {/* HR: Potential App Name? */}
            <h1>Take a Hike</h1>
            <div>
                <Trails trails={trails} setTrails={setTrails} />
            </div>
        </div>
    );
};

export default Home;
