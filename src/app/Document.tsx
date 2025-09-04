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

      {/* OG Images */}
      <meta property="og:image" content="/images/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />

      <meta property="og:title" content="RWSDK Add Ons" />
      <meta
        property="og:description"
        content="RedwoodSDK Add Ons are pre-built, production-ready components and applications that install with a single command. Focus on what makes your app unique."
      />
      <meta property="og:url" content="https://Shareware.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RWSDK Add Ons" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="RWSDK Add Ons" />
      <meta
        name="twitter:description"
        content="RedwoodSDK Add Ons are pre-built, production-ready components and applications that install with a single command. Focus on what makes your app unique."
      />
      <meta name="twitter:image" content="/images/og-image.png" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="627" />
      <meta name="twitter:url" content="https://Shareware.dev" />
      <meta name="twitter:site" content="@redwoodjs" />
      <meta name="twitter:creator" content="@redwoodjs" />

      {/* prismjs */}
      <script src="/prism/prism.js" />
      <link rel="stylesheet" href="/prism/prism.css" />

      {/* favicon */}
      <link rel="icon" href="/favicon.png" type="image/png" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
      <script
        async
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
    </body>
  </html>
);
