import React from "react";
import classes from "../../../styles/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown"; // npm install react-markdown: convert markdown to html
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // npm install react-syntax-highlighter
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // npm install react-syntax-highlighter

export default function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  /* 
    renderers: permet de personnaliser le rendu de certains elements markdown. 
    
    nous en avons besoin car par defaut react-markdown rend les images avec le tag img, ce qui ne prend pas avantage de l'optimisation des images de Next.js. 
    
    comment lui dire que nous voulons utiliser la fonction Image de Next.js pour rendre les images?
  */

  // ceci ne fonctionne pas avec la nouvelle version de react-markdown!

  // const customRenderers = {
  //   // react-markdown appelera cette fonction pour chaque image qu'il trouvera dans le markdown
  //   image(image) {
  //     return (
  //       <Image
  //         src={`/images/posts/${post.slug}/${image.src}`}
  //         alt={image.alt}
  //         width={600}
  //         height={300}
  //       />
  //     );
  //   },
  // };

  const customComponents = {
    // ceci fonctionne mais cause l'erreur mentionnee ci-dessous

    // react-markdown appelera cette fonction pour chaque image qu'il trouvera dans le markdown
    // img({ node, ...props }) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${props.src}`}
    //       alt={props.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },

    // pour eviter les erreurs dues au fait que Next js rend cette image dans une div qui est contenue dans un paragraphe (markdown)
    p(paragraph) {
      const { node } = paragraph;

      // si le premier enfant du paragraphe est une image
      if (node.children[0].tagName === "img") {
        // retourner l'image sans le paragraphe
        const image = node.children[0];
        const { properties } = image;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${properties.src}`}
              alt={properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      // si le premier enfant du paragraphe n'est pas une image
      return <p>{paragraph.children}</p>;
    },

    // rendre le code snippet avec un style (npm install react-syntax-highlighter)
    code({ node, inline, className, children, ...props }) {
      // extraire le langage du className
      const match = /language-(\w+)/.exec(className || "");
      
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },


    // ne fonctionne pas avec la nouvelle version de react-markdown!

    // code(code) {
    //   const { language, value } = code;
    //   // const language = className.split("-")[1]; // extraire le langage du code snippet
    //   return (
    //     <SyntaxHighlighter
    //       style={atomDark}
    //       language={language}
    //       children={value}
    //     />
    //   );
    // },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {/* convert markdown to html */}
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
