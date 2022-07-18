import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faGoogle, faInstagram, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faHome, faPhone, faPrint, faGem} from '@fortawesome/free-solid-svg-icons';
const FooterComponent = () => {
  return (
    <div>
        <footer className="text-center text-lg-start bg-dark text-white text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                {/*Left */}
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                {/*Right */}
                <div>
                    <a href="#" className="me-4 text-reset">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </section>

            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            <FontAwesomeIcon icon={faGem} /> Company name
                        </h6>
                        <p>
                            Here you can use rows and columns to organize your footer content. Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit.
                        </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <p>
                            <a href="#" className="text-reset">Java</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">React</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">Python</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">ML</a>
                        </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Useful links
                        </h6>
                        <p>
                            <a href="#" className="text-reset">Test</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">Test</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">Test</a>
                        </p>
                        <p>
                            <a href="#" className="text-reset">Test</a>
                        </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Contact
                        </h6>
                        <p><FontAwesomeIcon icon={faHome}/> Viet Nam</p>
                        <p>
                            <FontAwesomeIcon icon = {faEnvelope} /> thuan.jolly@gmail.com
                        </p>
                        <p><FontAwesomeIcon icon={faPhone} /> + 01 234 567 88</p>
                        <p><FontAwesomeIcon icon={faPrint} /> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2022 Copyright:&nbsp;
                <a className="text-reset fw-bold" href= "https://github.com/VThuan5421">VThuan5421</a>
            </div>
        </footer>
    </div>
  )
}

export default FooterComponent;