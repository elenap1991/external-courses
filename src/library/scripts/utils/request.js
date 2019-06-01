async function request(url) {
    try {
        var response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(response.statusText);
    } catch (err) {
        alert("Server request failed: " + err);
    }
    return undefined;
}