import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="description" content="A site for my programming portfolio" />
          <meta charSet="utf-8" />
          <meta name="robots" content="noindex, nofollow" />  
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}