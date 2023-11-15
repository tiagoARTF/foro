import {} from 'react';
import './css/Inicio.css'



const Inicio = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="src/assets/logo.png" alt="Logo" />
        </div>
        <div className="menu">
          <ul>
            <li><a href="#acerca-de">Acerca de Nosotros</a></li>
            <li><a href="#soporte">Soporte</a></li>
          </ul>
        </div>
        <div className="acciones">
          <button className="boton-link" onClick={() => window.location.href = '/sign-up'}>Registro</button>
          <button className="boton-link" onClick={() => window.location.href = '/sign-in'}>Iniciar Sesión</button>
        </div>
      </header>
      <main>
        <div className="imagen-principal-container">
          {/* Imagen principal con fondo oscuro y borroso */}
          <img className="imagen-principal" src="../src/assets/library.jpg" alt="Imagen Principal" />
          {/* Descripción y botón superpuestos en el centro de la imagen */}
          <div className="descripcion-superpuesta">
            <h1>Bienvenido a tu red social de libros</h1>
            <p>Descubre un mundo de lectura y conecta con amantes de los libros como tú.</p>
            <button className="boton-link" onClick={() => window.location.href = '/libros'}>Explorar</button>
          </div>
        </div>

        <section className="contenido" id="acerca-de">
          <div className="acerca-de">
            <h2>Acerca de Nosotros</h2>
            <p>

            Bienvenido a LitSphere, el refugio virtual para todos aquellos que encuentran en las páginas de un libro un mundo infinito de posibilidades. En LitSphere, hemos creado un espacio digital donde los amantes de la lectura pueden reunirse, conectarse y celebrar la belleza de las palabras impresas.

            Nuestra Historia

            Nuestra historia comenzó con una pasión compartida por la literatura. Un grupo de ávidos lectores se unió con el deseo de crear un lugar en línea donde la magia de los libros pudiera ser compartida, debatida y celebrada. Desde entonces, LitSphereha crecido hasta convertirse en una comunidad literaria diversa y vibrante, uniendo a personas de todos los rincones del mundo en una conversación global sobre la literatura.
            </p>
          </div>
          <div className="imagen-derecha">
            <img src="src/assets/about.jpg" alt="Imagen Derecha" />
          </div>
        </section>

        <section className="soporte" id="soporte">
          <h2>Soporte</h2>
          <p>
            Ofrecemos soporte para nuestros usuarios. Si tienes preguntas o necesitas ayuda, contáctanos.
          </p>
          <p>Correo: soporte@turedsocial.com</p>
          <p>Redes Sociales: <a href="#">Facebook</a>, <a href="#">Twitter</a></p>
          <p>Teléfono: +123456789</p>
        </section>
      </main>
    </div>
  );
}

export default Inicio;


