import {} from 'react';
import '../src/css/Inicio.css'
import Navbar from './components/Navbar';


const Inicio = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="hh lg-flex lg-justify-center">
          <div className="imagen-principal-container">
            <div className="imagen-principal">
              <img src="../src/assets/l.jpg" alt="Imagen Principal" />
            </div>
            <div className="descripcion-superpuesta">
              <h1 className=" ff text-5xl lg-text-8xl font-semibold">
                ¡Bienvenido a nuestro apasionante rincón literario!
              </h1>
              <p className="">
                Descubre un mundo de lectura y conecta con amantes de los libros como tú.
              </p>
              <button
                className="qq btn  btn-outline-light"
                style={{ padding: '1vw 3vw' }}
                onClick={() => (window.location.href = '/libros')}
              >
                Explorar
              </button>
            </div>
          </div>
        </div>

        <section className="contenido" id="acerca-de">
          <div className="acerca-de p-4 md:p-8 lg:flex lg:justify-between" style={{ overflow: "auto" }}>
            <div className="md:w-full lg:w-2/3 lg:pr-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                Acerca de Nosotros
              </h2>
              <p className="text-sm md:text-base lg:text-lg mb-4">
                Bienvenido a LitSphere, el refugio virtual para todos aquellos que encuentran en las páginas de un libro un mundo infinito de posibilidades. En LitSphere, hemos creado un espacio digital donde los amantes de la lectura pueden reunirse, conectarse y celebrar la belleza de las palabras impresas.
              </p>
              <p className="text-sm md:text-base lg:text-lg mb-4">
                Nuestra historia comenzó con una pasión compartida por la literatura. Un grupo de ávidos lectores se unió con el deseo de crear un lugar en línea donde la magia de los libros pudiera ser compartida, debatida y celebrada. Desde entonces, LitSphere ha crecido hasta convertirse en una comunidad literaria diversa y vibrante, uniendo a personas de todos los rincones del mundo en una conversación global sobre la literatura.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:w-full lg:w-1/3">
              <div style={{ float: "right" }}>
              </div>
            </div>
          </div>
        </section>


        <section className="soporte" id="soporte">
          <div className="p-4 lg:flex lg:justify-between">
            <div className="lg:w-3/5">
              <h2 className="text-2xl lg:text-3xl">Soporte</h2>
              <p className="text-base lg:text-lg">
                Ofrecemos soporte para nuestros usuarios. Si tienes preguntas o necesitas ayuda, contáctanos.
              </p>
              <p className="text-base lg:text-lg">Correo: litsphere@gmail.com</p>
              <p className="text-base lg:text-lg">
                Redes Sociales: <a href="#">Facebook</a>, <a href="#">Twitter</a>
              </p>
              <p className="text-base lg:text-lg">Teléfono: +123456789</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Inicio;
