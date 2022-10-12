import React, { Fragment } from "react";
import { AiOutlineFacebook, AiOutlineGithub, AiOutlineGooglePlus, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <Fragment>
      <footer className="text-center bg-gray-900 text-white">
        <div className="container px-1 lg:px-6 pt-6">
          <div className="flex flex-wrap justify-center items-center mb-6">
            <a className="mx-2" href={'https://github.com/iamharshkr'}>
                <AiOutlineGithub className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://facebook.com/iamharshkr'}>
                <AiOutlineFacebook className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://instagram.com/iamharshk'}>
                <AiOutlineInstagram className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://www.linkedin.com/in/harsh-kumar-75129a155/'}>
                <AiOutlineLinkedin className="text-2xl" />
            </a>
            <a className="mx-2" href={'#'}>
                <AiOutlineGooglePlus className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://twitter.com/tehzfun'}>
                <AiOutlineTwitter className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://youtube.com/techzfun'}>
                <AiOutlineYoutube className="text-2xl" />
            </a>
          </div>
        </div>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright: 
          <a className="text-whitehite" href="https://tailwind-elements.com/">
            Apna Stock
          </a>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
