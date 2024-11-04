async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const albums = await response.json();
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album: any) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
