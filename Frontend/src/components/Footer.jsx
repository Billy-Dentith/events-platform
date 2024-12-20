import React from 'react'
import { FaRegCopyright, FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-content'>
            <h3>Join Event Nest. <Link className='sign-up-link' to="/account" >Get Started</Link></h3>
            <div className='footer-socials'>
                <h4>Follow us </h4>
                <div className='footer-socials-links'>
                    <a href='https://facebook.com'><FaFacebook className='icons' /></a>
                    <a href='https://instagram.com'><FaInstagram className='icons' /></a>
                    <a href='https://x.com'><FaSquareXTwitter className='icons' /></a>
                </div>
            </div>
            <div className='footer-links'>
                <nav className='footer-nav'>
                    Account
                    <ul>
                        <li><Link className='footer-link' to="/account" >Sign Up</Link></li>
                        <li><Link className='footer-link' to="/account" >Sign In</Link></li>
                    </ul>
                </nav>
                <nav className='footer-nav'>
                    Discover
                    <ul>
                        <li><Link className='footer-link' to="/events" >Events</Link></li>
                        <li><Link className='footer-link' to="/my-events" >My Events</Link></li>
                    </ul>
                </nav>
                <nav className='footer-nav'>
                    Support
                    <ul>
                        <li><Link className='footer-link' to="/" >About</Link></li>
                        <li><a href='mailto: '>Contact Us</a></li>
                    </ul>
                </nav>
            </div>
            <h5><FaRegCopyright className='copyright-logo'/> 2024 Event Nest. All Rights Reserved</h5>
        </div>
    </div>
  )
}

export default Footer