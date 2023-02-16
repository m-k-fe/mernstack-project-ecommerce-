import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendToAdmin } from "../redux/features/usersSlice";

function Contact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    object: "",
    msg: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.name && info.email && info.object && info.msg) {
      dispatch(sendToAdmin({ info, token }));
      setInfo({
        name: "",
        email: "",
        object: "",
        msg: "",
      });
      alert("Success");
      navigate("/");
    } else alert("Please add all fields");
  };
  return (
    <section id="contact">
      <h1 className="section_title">Nous Contacter</h1>
      <div className="localisation_contact_div">
        <div className="localisation">
          <h3>Notre Adresse</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10499.966567606692!2d2.285747998068967!3d48.85836977022069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1644955637071!5m2!1sfr!2sfr"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="form_contact">
          <h3>Envoyer un message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Adresse Mail"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Objet"
              value={info.object}
              onChange={(e) => setInfo({ ...info, object: e.target.value })}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Message"
              value={info.msg}
              onChange={(e) => setInfo({ ...info, msg: e.target.value })}
            ></textarea>
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
