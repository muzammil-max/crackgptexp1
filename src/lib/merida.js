// import fetch from "node-fetch";

// // Function to generate an image using the Pollinations API
// async function generateImageFromPollinations({
//   prompt,
//   width = 1080,
//   height = 1080,
//   seed = 10528376,
//   model = "flux",
// }) {
//   try {
//     const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
//       prompt
//     )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

//     // Fetch the image URL
//     const response = await fetch(imageUrl);

//     if (!response.ok) {
//       throw new Error(`Error fetching image: ${response.statusText}`);
//     }

//     // Return the image URL
//     return imageUrl;
//   } catch (error) {
//     console.error("Error generating image from Pollinations:", error);
//     throw new Error("Image generation failed.");
//   }
// }

// // Function to download the image (optional)
// async function downloadImage(imageUrl, filePath = "image.png") {
//   try {
//     const response = await fetch(imageUrl);
//     const buffer = await response.buffer();
//     fs.writeFileSync(filePath, buffer);
//     console.log(`Image downloaded to ${filePath}`);
//   } catch (error) {
//     console.error("Error downloading image:", error);
//   }
// }

// export { generateImageFromPollinations, downloadImage };
