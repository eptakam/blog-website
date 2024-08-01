import classes from "../../styles/contact-form.module.css";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";
import { el } from "date-fns/locale";
import { set } from "date-fns";

// fonction qui enverra les donnees du formulaire de contact a notre api route.
// elle peut etre definie dans un fichier separe et importee dans ce composant
async function sendContactData(contactDetails) {
  // envoyer une requete http a notre api route
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // verifier si la requete a reussi
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

export default function ContactForm() {
  // On peut utiliser useRef ou useState pour recuperer les valeurs des champs
 // par exemple : const enteredEmail = emailInputRef.current.value; et assigner emailInputRef à l'attribut ref de l'input email

  // ici nous utiliserons useState
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  //verifier l'etat actuel de la requete (ceci nous permettra d'afficher une notification en fonction de l'etat de la requete)
  const [requestStatus, setRequestStatus] = useState(); // undefined, pending, success, error

  // verifier si une erreur s'est produite lors de l'envoi de la requete
  const [requestError, setRequestError] = useState();

  // effacer la notification apres 3 secondes grace a useEffect, car useEffect me permet de gerer les effets secondaires dans les composants fonctionnels (changer le comportement d'un composant)
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      // nettoyer le timer
      return () => clearTimeout(timer);
    }
  }, [requestStatus]); // reagir a chaque changement de requestStatus 

  // fonction qui sera declenchée lorsqu'on soumettra le formulaire
  async function sendMessageHandler(event) {
    event.preventDefault(); // empecher le rechargement de la page

    // ajouter la validation des donnees cote client ici (optionnel, car nous avons deja un minimum avec les attributs required des inputs)

    // initialiser l'etat de la requete
    setRequestStatus("pending");

    // envoyer la requete http
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      // changer l'etat de la requete
      setRequestStatus("success");

      // effacer les champs du formulaire
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      // une erreur est survenue lors de l'envoi de la requete
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  // setterr la notification en fonction de l'etat de la requete
  // elle sera ensuite rendue au niveau du return (ci-dessous) ce composant
  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  } else if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  } else if (requestStatus === "error") { 
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }
  //  else {
  //   notification = null;
  // }


  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {/* afficher la notification */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
