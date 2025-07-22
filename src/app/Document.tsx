import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <link rel="stylesheet" href={styles} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RWSDK Add Ons</title>
      <link rel="modulepreload" href="/src/client.tsx" />

      {/* prismjs */}
      <script src="/prism/prism.js" />
      <link rel="stylesheet" href="/prism/prism.css" />

      {/* favicon */}
      <link rel="icon" href="/favicon.png" type="image/png" />

      {/* Fathom Analytics */}
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="NWQXOCYG"
        defer
      ></script>
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
      <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
    </body>
  </html>
);
