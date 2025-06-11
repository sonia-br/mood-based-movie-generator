import { useParams } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();

    return (
        <div>
            <h1>Movie name</h1>
            <p>Movie details here</p>
        </div>
    );
}
export default MovieDetails;