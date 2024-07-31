import classes from "../../styles/post-item.module.css";
import Link from "next/link";
import Image from "next/image";
import { parseISO, format } from 'date-fns';  // pour formater la date sans gestion de fuseau horaire: npm install date-fns

export default function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  // convertir la date en format lisible
  const formattedDate = new Date(date).toLocaleDateString("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // formater la date avec date-fns (npm install date-fns)
  // const formattedDate = format(parseISO(date), "MMMM d, yyyy");

  // chemin de l'image
  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} width={300} height={200} layout='responsive' />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
      </Link>
    </li>
  );
}
