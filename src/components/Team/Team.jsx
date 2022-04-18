import React, { useState } from "react";
import "./Team.css";
import MemberOne from "../../assets/images/memberone.png";
import MemberTwo from "../../assets/images/membertwo.png";
import MemberThree from "../../assets/images/memberthree.png";
import MemberFour from "../../assets/images/memberfour.png";
import DiamondThree from "../../assets/images/diamond-three.png";
import CubesFour from "../../assets/images/cubes-four.png";
import TwitterImg from "../../assets/images/twitter.png";
import TelegramImg from "../../assets/images/telegram.png";

const Team = () => {
  const [member, setMember] = useState(true);
  const [memberTwo, setMemberTwo] = useState(true);
  const [memberThree, setMemberThree] = useState(true);
  const [memberFour, setMemberFour] = useState(true);

  return (
    <div className="team" id="team">
      <h3>Zinar Team</h3>

      <div className="team-members">
        <div className="member" onClick={() => setMember(!member)}>
          {member ? (
            <div className="member-content one">
              <img src={MemberOne} alt="MemberOne" className="member-img" />
            </div>
          ) : (
            <div className="about-member one">
              <p>Business Development</p>
              <div className="member-links">
                <a href="/">
                  <img src={TwitterImg} alt="twitter handle" />
                </a>
                <a href="/">
                  <img src={TelegramImg} alt="telegram handle" />
                </a>
              </div>
            </div>
          )}

          <p className="member-name">Mika’el Benard</p>
        </div>

        <div className="member" onClick={() => setMemberTwo(!memberTwo)}>
          {memberTwo ? (
            <div className="member-content two">
              <img src={MemberTwo} alt="MemberTwo" className="member-img" />
            </div>
          ) : (
            <div className="about-member two">
              <p>Technical Lead(Blockchain)</p>
              <div className="member-links">
                <a href="/">
                  <img src={TwitterImg} alt="twitter handle" />
                </a>
                <a href="/">
                  <img src={TelegramImg} alt="telegram handle" />
                </a>
              </div>
            </div>
          )}
          <p className="member-name">Akay</p>
        </div>

        <div className="member" onClick={() => setMemberThree(!memberThree)}>
          {memberThree ? (
            <div className="member-content three">
              <img src={MemberThree} alt="MemberThree" className="member-img" />
            </div>
          ) : (
            <div className="about-member three">
              <p>Front End Engineer</p>
              <div className="member-links">
                <a href="/">
                  <img src={TwitterImg} alt="twitter handle" />
                </a>
                <a href="/">
                  <img src={TelegramImg} alt="telegram handle" />
                </a>
              </div>
            </div>
          )}
          <p className="member-name">SOI</p>
        </div>

        <div className="member" onClick={() => setMemberFour(!memberFour)}>
          {memberFour ? (
            <div className="member-content four">
              <img src={MemberFour} alt="MemberFour" className="member-img" />
            </div>
          ) : (
            <div className="about-member four">
              <p>Chief Design Officer</p>
              <div className="member-links">
                <a href="/">
                  <img src={TwitterImg} alt="twitter handle" />
                </a>
                <a href="/">
                  <img src={TelegramImg} alt="telegram handle" />
                </a>
              </div>
            </div>
          )}
          <p className="member-name">Sir_Uddy</p>
        </div>
      </div>
      <img src={DiamondThree} alt="diamond-three" className="diamondthree" />
      <img src={CubesFour} alt="cubes-four" className="cubes-four" />
    </div>
  );
};

export default Team;
