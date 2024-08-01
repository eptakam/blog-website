/*
  en faisant npm run build, nous avons remarque que notre [slug].js est trop lourd. en regardant de pret, nous avons vu que c'est a cause de react-syntax-highlighter de ce fichier post-content.js qui est trop lourd.

  pour resoudre ce probleme, nous allons utiliser la version light de react-syntax-highlighter
*/

import React from "react";
import classes from "../../../styles/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown"; // npm install react-markdown: convert markdown to html
import Image from "next/image";
// attention: react-syntax-highlighter est trop lourde d'ou nous prndrons plutot la version light
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"; // npm install react-syntax-highlighter 
// import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; 
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark"; 
// importation du langage javascript et css utlises dans le code snippet
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"; 
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css"; 

// appeler les identifiants des langages presents dans le code snippet de mon markdown file (js et css dans ce cas)
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  /* 
    renderers: permet de personnaliser le rendu de certains elements markdown. 
    
    nous en avons besoin car par defaut react-markdown rend les images avec le tag img, ce qui ne prend pas avantage de l'optimisation des images de Next.js. 
    
    comment lui dire que nous voulons utiliser la fonction Image de Next.js pour rendre les images?
  */

  const customComponents = {
    // pour eviter les erreurs dues au fait que Next js rend cette image dans une div qui sera elle-meme contenue dans un paragraphe (markdown) par la suite
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
