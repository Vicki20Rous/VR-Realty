import axios from "axios";

export default async function handler(req, res) {
    const options = {
        method: "GET",
        url: "https://realty-in-us.p.rapidapi.com/locations/auto-complete",
        params: { input: req.query.keyword },
        headers: {
            "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
            "x-rapidapi-key":"22539d0047mshaba23ae76c1a0c3p1d7388jsn5281cea1a33d",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
}