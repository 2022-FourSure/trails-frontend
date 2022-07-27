import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const TrailDetails = ({ trails }) => {
    const [trail, setTrail] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/trails/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setTrail(json);
            })
            .catch(console.error);
    }, [id]);

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
              {trail.description}
            </div>
            {/* HR: Should ONLY be available to logged in user. Currently active for test purposes */}
            <div>
                <Link to={`/trails/edit/${trail._id}`}>Edit Trail</Link>
                <button>Delete</button>
            </div>
            <div>
                {/* TODO: Reviews section */}
            </div>
        </div>
    );
};

export default TrailDetails;
