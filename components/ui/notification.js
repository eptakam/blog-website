/*
    en ce qui concerne les notifications, nous pouvons utiliser le contexte pour les gerer. cependant dans notre cas, cela n'est pas necessaire car les notifications ne sont pas partagées entre plusieurs composants.
    
    nous avons besoin des notifications juste au niveau de notre formulaire de contact. nous pouvons donc les gerer localement dans le composant contact-form.js en important le composant Notification.
*/

import ReactDOM from 'react-dom';

import classes from '../../styles/notification.module.css';

function Notification(props) {
  // destructuring des props pour recuperer les valeurs des proprietes title, message et status
  const { title, message, status } = props;

  // definir les classes css en fonction de la valeur de la propriete status
  let statusClasses = '';

  // si status est 'success', on utilise la classe css success
  if (status === 'success') {
    statusClasses = classes.success;
  }

  // si status est 'error', on utilise la classe css error
  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
