import React, { useState, useEffect } from "react";
import "./About.css"; // Import your CSS file for styling
import img from "../../bgpics/Shikhar.png";
import Talkie from "../../bgpics/Logo.png";
import { ChevronDownIcon } from "@chakra-ui/icons";

const About = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about">
      <img
        className="Talkie"
        src={Talkie}
        borderRadius="full"
        alt="Talkie Image"
      ></img>

      <div className="left">
        <h1>
          <u>Talkie</u>
        </h1>
        <h2> Chat App: Connect and Communicate Seamlessly</h2>
        <p>
          {/* <h2> Chat App: Connect and Communicate Seamlessly</h2> */}
          <br />
          Talkie Chat App is a versatile communication platform designed to
          enhance your chatting experience. Whether you're engaging in
          one-on-one conversations or participating in group chats, talkie
          ensures seamless and secure communication. With its user-friendly
          interface and a range of features, staying connected has never been
          easier.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>
            <strong>
              <u>One-on-One Chats:</u>
            </strong>{" "}
            Engage in private conversations with friends and family, sharing
            text, images, and videos effortlessly.
          </li>
          <li>
            <strong>
              <u>Group Chats:</u>
            </strong>{" "}
            Create or join group conversations, perfect for coordinating with
            teams, planning events, or staying connected with your social
            circles.
          </li>
          <li>
            <strong>
              <u>Password Change:</u>
            </strong>{" "}
            Your privacy is paramount. Change your account password easily to
            maintain a secure chatting environment.
          </li>
          <li>
            <strong>
              <u>Dark and Light Mode:</u>
            </strong>{" "}
            Customize your app's appearance with both dark and light modes,
            ensuring comfortable usage in any lighting conditions.
          </li>
          <li>
            <strong>
              <u>Notifications:</u>
            </strong>{" "}
            Stay updated with real-time notifications for new messages, ensuring
            you never miss an important conversation.
          </li>
          <li>
            <strong>
              <u>User-Friendly Interface:</u>
            </strong>{" "}
            Enjoy an intuitive interface that prioritizes user experience,
            making navigation and interaction a breeze.
          </li>
          <li>
            For further assistance and queries, contact us at '
            <u>
              <a href="mailto:teamtalkie27@gmail.com">Talkie support</a>'
            </u>
            .
          </li>
        </ul>
        <div class="scroll-arrow">
          <ChevronDownIcon />
        </div>
      </div>
      <div className="right">
        <div className="img-container">
          <div className="img-stack top">
            <img src={img} alt="image" />
          </div>
        </div>
        <p>
          <h2>
            <u>
              <b>Author :</b>
            </u>
          </h2>
          <i>
            "Talkie holds a special place in my heart as my{" "}
            <b>inaugural full-stack</b> project. With unwavering dedication,
            This journey has been a remarkable learning experience, allowing me
            to refine my skills and delve into the intricate world of software
            development. As I continue to nurture and enhance Talkie, I invite
            you to join me on this exciting endeavor. Let's connect and share
            thoughts – your feedback and collaboration would mean the world to
            me. Together, we can shape talkie into an exceptional communication
            tool that leaves a positive impact on how we interact and connect."
          </i>
          <br />
          <b className="auth">-Shikhar Agrawal...✒️</b>
          <div>
            <br />
            <a href="https://shikhar-agrawal.netlify.app/" target="_blank">
              <button className="btn">Connect with me</button>
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

export default About;
