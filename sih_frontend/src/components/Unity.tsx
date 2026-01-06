function Unity() {
  return (
    <div>
      <h2>My Unity Game</h2>
      <iframe
        src={`${process.env.PUBLIC_URL}/Project/index.html`}
        width="960"
        height="600"
        frameBorder="0"
        allow="fullscreen; autoplay"
        title="Unity WebGL Game"
      ></iframe>
    </div>
  );
}

export default Unity;
