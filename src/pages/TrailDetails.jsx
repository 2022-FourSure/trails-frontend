import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const TrailDetails = () => {
    const [trail, setTrail] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/trails/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setTrail(json);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            <div>
                <img src={trail.image} alt={trail.name} />
            </div>
            <div>
                <h2>{trail.name}</h2>
                <p>{trail.location}</p>
                <p>Difficulty: Level {trail.difficulty}</p>
                <p>Length: {trail.length} mile(s)</p>
                <p>Elevation Change: {trail.elevationChange}</p>
            </div>
            <div>
                {/* HR: Need to talk about Reviews together */}
                <Link to="/">Write a Review</Link>
            </div>
              {/* HR: Render when user is logged in */}
              {/* <div>
                <button>Edit</button>
                <button>Delete</button>
              </div> */}
            <div>
              {trail.description}
            </div>
        </div>
    );
};

export default TrailDetails;
