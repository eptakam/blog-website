/*
    nous allons utiliser le fonctionnalite 'Portals' de react pour afficher les notifications de la page de contact.

    Portals permet de rendre un composant nimporte ou dans notre structure html sans se soucier de la hierarchie des composants et l'accessibilite.

    Ici, nous allons implementer le hook (div dans ce cas) qu'aura besoin ce 'Portals' pour fonctionner. Par la suite, nous utiliserons cette div pour transferer notre composant de notification a cet endroit lors de son rendu.

    pour cela, nous irons dans notre composant de notification et le convertir en un portail.
*/

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
          {/* voir le composant de notification converti en portail dans le fichier notification.js */}
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}