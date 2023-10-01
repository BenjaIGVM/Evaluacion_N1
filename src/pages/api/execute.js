

export default async function handler(req, res) {
    await fetch('http://localhost:3001/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: req.body,

    }).then((response)=> response.json()).then((data) => { res.status(200).json(data); })
        .catch((error) => { res.status(500).json({ error: `Internal Server Error ${error}` }); });

};