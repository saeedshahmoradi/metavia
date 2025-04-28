import { motion } from 'motion/react';
import styles from './home.module.css';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import ParticlesBackground from '../../components/particlesBackground/ParticlesBackground';


export default function Home() {

  const { team, fullScreen, t, language } = useContext(AppContext);

  const description = t("home.teamDescription").split('');

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.metaDescription')} />
        <link rel="canonical" href={`https://www.metavia.ir/${language}/`} />
      </Helmet>

      <div style={{ perspective: '400px', height: '100%' }}>

        <motion.div className={`${styles.container} ${fullScreen ? 'fullScreen_page_container' : 'page_container'}`}
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ rotateX: -130 }}
          animate={{ rotateX: 0, transformOrigin: '0 0 0' }}
          // animate={{ rotateX: [-130, 10, -5, 0], transformOrigin: '0 0 0' }}
          exit={{ rotateX: 130, transformOrigin: '0 bottom 0' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >

          {/* START TEST */}
          <ParticlesBackground />
          {/* END TEST */}

          {(fullScreen || window.innerWidth < 992) && <img className={styles.logo} src={team.photo ?? "/logo512.png"} alt={team.name} />}

          <h1 className={styles.teamName}>{team.name}</h1>

          <strong className='text-center'>
            {description.map((char, index) =>
              <span className={styles.descSpan} style={{ animationDelay: `${(index * 0.07) + 1}s` }} key={index + 1}>
                {char}
              </span>)}
          </strong>

          {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid rerum, laboriosam provident accusantium iusto maiores unde aspernatur. Possimus accusantium adipisci quis asperiores minus provident suscipit non, eligendi doloremque autem nulla iure! Praesentium officiis, consequatur voluptatibus sit magni similique culpa cum dolorem quia delectus qui! Amet, commodi vel exercitationem quis cumque id perferendis quisquam, quia omnis aliquid obcaecati nesciunt accusantium quas itaque quae nihil. Non nemo saepe facere magnam dolorum esse assumenda doloribus quas perferendis! Magnam aliquid, vitae libero debitis laborum enim officia animi nulla dolores architecto, nobis odio. Nemo explicabo perspiciatis voluptatem natus modi itaque commodi molestiae, aliquam libero. Nesciunt autem, officia cumque quae aliquam ut? Ad eaque, aliquam itaque fuga commodi expedita ea quibusdam rerum magnam, aliquid ullam blanditiis incidunt cum, repellat ab! Impedit numquam fugiat vero commodi ullam culpa repellendus facere aspernatur veniam quasi? Quis, aliquam libero? Ea perspiciatis, quis cupiditate saepe sint sed amet ut corporis quaerat consectetur corrupti, ipsum neque laborum sapiente eaque dolores labore sequi cum reiciendis suscipit! Qui sapiente distinctio cumque commodi, deserunt hic officia quisquam reiciendis inventore, magnam minus? Cum minus deserunt labore at repellendus consectetur nam assumenda eos magni porro libero aliquam, pariatur sequi fuga, consequatur dolor enim. Iste possimus ex fuga dicta doloremque magnam aliquam architecto sunt eius, nulla earum placeat asperiores, veniam similique omnis. Aut temporibus voluptatem accusantium incidunt unde dolore libero recusandae, fuga doloremque, corporis ea esse numquam sapiente in est praesentium obcaecati maiores quos odio, animi perspiciatis. Architecto cupiditate tempore explicabo consequuntur. Libero rerum dicta qui nobis odio, error aperiam suscipit quas optio, provident, hic quasi tenetur ad voluptatem temporibus nemo repellat molestiae dignissimos esse ut id sunt nesciunt. Est nihil sequi natus necessitatibus officia quas doloremque debitis porro quae autem reiciendis laborum fuga obcaecati assumenda vel nam magni vero quam, maxime inventore dolor et! Molestias vitae corporis magnam. Eius delectus fuga ratione distinctio accusamus aliquam? Voluptates rem recusandae doloremque vel veniam eum, optio dolores ipsum dolore laudantium veritatis maiores voluptatum vero repellendus fugiat saepe nemo nostrum repellat qui, reiciendis pariatur deserunt itaque omnis. Aliquid quisquam temporibus reiciendis aperiam sint voluptas dolorum, reprehenderit veritatis asperiores non ratione, ut quo saepe voluptatum modi aut quos. Deserunt culpa praesentium itaque neque natus a eos dignissimos quasi modi eius nihil, dicta, dolores voluptas? Temporibus dolor ea in ut facere, nulla consectetur sit doloremque nam ipsa velit labore error ducimus dignissimos saepe et assumenda, repudiandae unde earum, voluptates facilis quasi! Reprehenderit sit voluptatum aliquid alias officiis consectetur eaque! Quo cumque assumenda ipsum quae, a eos voluptatum repellendus porro quisquam perspiciatis ut, veritatis quia cum voluptate eum dolorum atque illo velit. Atque quidem porro et ducimus nostrum veritatis at consequatur excepturi magnam, eveniet quis corporis odio ullam debitis illum praesentium magni voluptas. Quo delectus ipsum dolorem ratione? Exercitationem cum repellendus esse, excepturi vero nulla, maiores laborum nostrum, accusamus eligendi possimus illo doloremque. Totam nihil animi recusandae rem, eius a possimus obcaecati illum est neque accusamus minus, iste laborum facilis sapiente aliquam sed repudiandae veniam vero assumenda eaque quos quidem. Eveniet, maiores exercitationem maxime voluptatibus dolorem quis. Dolorum facere at repellat. Quos alias maxime explicabo nesciunt dolorum. Earum provident commodi maiores totam perspiciatis sapiente delectus voluptate dicta quod ullam quibusdam omnis vero facere culpa quos cupiditate voluptates, accusantium, iste rem, tempore recusandae ea harum magni. Et possimus sunt ipsa fugiat. Possimus quisquam minima, in aspernatur amet rem exercitationem saepe nesciunt atque, ab, ad magni ex at a quae enim sint id? Quibusdam molestiae, expedita voluptate iure deserunt ex veritatis quas explicabo debitis asperiores? Eum totam excepturi odit nihil, laudantium, iste ab sit ad sunt autem consequuntur quae necessitatibus aspernatur porro ullam tempora accusantium perspiciatis delectus adipisci! Modi similique, incidunt voluptates a officia sapiente ipsum repudiandae tempora quasi voluptatem numquam accusantium maiores porro necessitatibus neque perferendis libero mollitia laudantium ex possimus! Reprehenderit facilis minima, sapiente dolorem dignissimos magnam possimus, placeat at ad et obcaecati? Magnam, obcaecati! Ea, atque tenetur expedita voluptate excepturi qui totam veniam at reprehenderit repellendus assumenda numquam illum odit cupiditate illo modi eos debitis aspernatur eligendi. Commodi perferendis ratione veniam, nihil adipisci, alias unde dolore voluptates aliquam non amet enim dolor molestias harum quae repudiandae nisi recusandae doloremque vero repellat cumque. Atque architecto sed, sunt adipisci dolore et quia rerum dolores alias natus quos, commodi amet rem facilis hic sint beatae dolor excepturi ratione nisi porro reprehenderit! Repellendus natus error explicabo quis ipsum id alias, eveniet soluta ratione a? Pariatur perspiciatis ad inventore, totam quibusdam voluptatibus dignissimos harum in numquam doloremque nisi, consectetur corporis molestias tenetur qui quos rem? Nihil hic deleniti maiores quam sit, consequuntur quod repellat temporibus et itaque facilis sed fugit quaerat labore soluta debitis nemo explicabo ratione iusto aliquid eligendi. Suscipit sequi nisi sed? Iure repellendus corrupti magnam pariatur, minus nam omnis explicabo eveniet fugiat. Consectetur vitae officia amet dolores. Numquam neque officia vero quasi explicabo? Id modi, at accusamus molestiae numquam facere magni, eum dignissimos vero atque et quae quibusdam pariatur, ex a excepturi? Libero, atque quaerat perferendis sint ipsa excepturi? Dicta autem natus possimus quis corrupti rerum, hic facilis facere, perferendis deleniti vero modi illo ad enim quod, debitis id impedit in architecto voluptatem qui similique aut. Ducimus voluptates architecto natus dicta quis! Est consequatur eligendi labore ut voluptatem maxime eaque dicta quibusdam minus error veritatis itaque magnam nisi repudiandae aperiam, quia ex exercitationem velit dignissimos id. Vel aspernatur exercitationem, adipisci corrupti illo, facere error alias tenetur odit esse accusantium quas dicta suscipit est ea excepturi dolores possimus. Corporis qui voluptatibus nobis fugit! Rem sunt temporibus necessitatibus incidunt at in quasi repellendus, porro possimus iste blanditiis magni tenetur autem. Dicta, maiores praesentium. Enim ut reiciendis necessitatibus minus unde, dicta mollitia doloremque molestiae. Deleniti optio odio debitis iusto corrupti repellat veniam aliquam nobis, quidem, dicta praesentium dignissimos delectus maxime magnam non nulla voluptate velit commodi, fugit deserunt officia reiciendis. Rem ducimus natus in. Tenetur, quisquam? Aut, quos esse. Fugiat ipsa officia voluptas numquam necessitatibus unde laboriosam eos veritatis recusandae. Consequatur sit repellendus dignissimos odit omnis unde ut odio delectus. Facilis quam dolorem ut porro provident consectetur. Ut!</p> */}

          {fullScreen &&
            <div className={styles.social_container}>
              <a href={team.instagram} target='_blank' rel='noreferrer noopener'><AiFillInstagram className={styles.social_icon} /></a>
              <a href={team.telegram} target='_blank' rel='noreferrer noopener'><FaTelegramPlane className={styles.social_icon} /></a>
              <a href={team.whatsapp} target='_blank' rel='noreferrer noopener'><IoLogoWhatsapp className={styles.social_icon} /></a>
            </div>
          }
        </motion.div >
      </div >
    </>
  )
}
