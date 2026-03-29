const BASE_URL = "http://localhost:5276";

export function visualStyle(image?: string) {
  // Gracefully handle missing image data from backend by returning a
  // neutral background. If we have an image URL, use it with a subtle
  // gradient overlay; otherwise fall back to a solid background color.
  if (!image) {
    return {
      background: "linear-gradient(180deg, #f6f7f9, #eef1f6)"
    } as const;
  }

  // Wenn nicht http, dann BASE_URL davor setzen
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}/${image}`;

  return {
    backgroundImage: `linear-gradient(180deg, rgba(19, 34, 56, 0.08), rgba(19, 34, 56, 0.2)), url("${imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  } as const;
}