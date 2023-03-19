import { useState } from "react";

const fetchImage = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [image, setImage] = useState({});

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => {
        if (!res.ok) throw Error('Error retrieving image object')
        res.json();
    }).then(data => {
        setIsLoading(false);
        setImage(data.sprites)
    }).catch(err => {
        setIsLoading(false);
        setError(err.message);
    })

    return {image, isLoading, error}
}

export default fetchImage;