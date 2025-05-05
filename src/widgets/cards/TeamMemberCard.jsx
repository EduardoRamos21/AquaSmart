import PropTypes from 'prop-types';
import styles from './TeamMemberCard.module.css';

const TeamMemberCard = ({ name, position, image, twitter, linkedin, github, email }) => {
  return (
    <div className={styles.column} data-aos="fade-up" data-aos-duration="1000">
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img src={image} alt={`${name} profile`} />
        </div>
        <h3>{name}</h3>
        <p>{position}</p>
        <div className={styles.icons}>
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <i className="fas fa-envelope"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
};

export default TeamMemberCard;
