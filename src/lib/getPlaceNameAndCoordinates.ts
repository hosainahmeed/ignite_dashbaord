export async function getPlaceNameAndCoordinates(query: string) {
  try {
    const url = "https://places.googleapis.com/v1/places:searchText";
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      throw new Error("API key not found");
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.location"
      },
      body: JSON.stringify({
        textQuery: query
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log("API Error:", errorText);
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    if (!data.places || data.places.length === 0) {
      return null;
    }

    const place = data.places[0];

    return {
      name: place.displayName?.text ?? "",
      latitude: place.location?.latitude ?? null,
      longitude: place.location?.longitude ?? null,
    };

  } catch (err) {
    console.error(err);
    return null;
  }
}
