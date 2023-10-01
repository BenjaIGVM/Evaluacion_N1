export default async function handler(req, res) {
    let iconName = '';

    try {
        // First, make a request to the search endpoint
        const searchResponse = await fetch(`https://api.iconify.design/search?limit=32&query=${req.query}`, { method: 'GET' });

        if (!searchResponse.ok) {
            throw new Error(`Search API request failed with status ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();

        if (searchData.icons && searchData.icons.length > 0) { iconName = searchData.icons[0];
        } else { throw new Error('No matching icons found.'); }

        // Then, make a request to the specific icon endpoint
        const iconResponse = await fetch(`https://api.iconify.design/${iconName.replace(':', '/')}`, { method: 'GET' });

        if (!iconResponse.ok) { throw new Error(`Icon API request failed with status ${iconResponse.status}`); }

        const iconData = await iconResponse.json();

        res.status(200).json(iconData);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}