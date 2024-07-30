// this is our welcome component

import classes from "../../styles/hero.module.css";

import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/emma.jpg"
          alt="An image showing Emmanuel"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Emmanuel</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}
