'use client' // For Vercel
import React, { useEffect } from "react"; // For using React
import { useSearchParams } from "next/navigation"; // For getting the params
import { useRouter } from "next/navigation"; // For navigation
import axios from 'axios'; // For making the request to the API
import { v4 as uuidv4 } from 'uuid'; // For generating the user id
import Joi from 'joi'; // For validating the data

const page = ({ params }) => {
  const sParams = useSearchParams(); // Get the params
  const router = useRouter(); // Get the router
  const [selectedOption, setSelectedOption] = React.useState('0'); // For the select
  const [step, setStep] = React.useState(1); // For the steps

  // Schema of the JSON
  const schema = Joi.object().keys({
    id: Joi.string().error(new Error('id is not valid')),
    eventId: Joi.string().error(new Error('eventId is not valid')),
    fullname: Joi.string().error(new Error('fullname is not valid')),
    intraname: Joi.string().error(new Error('intra is not valid')),
    email: Joi.string().error(new Error('email is not valid')),
    skills: Joi.string().error(new Error('skills is not valid'))
  });

  // For the steps
  const changePage = () => {
    const step = parseInt(sParams.get("step")) || 0;
    const id = params.eventId;
    const newStep = step + 1;
    console.log("newStep:", newStep);
    let url = `/events/register/${id}?step=${newStep}`;
    setTimeout(() => {
      router.push(url);
    }, 100);
  }

  // For the submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    let data;
    let skills;

    if (step === 1) {
      data = {
        name: formElements[0]?.value,
        lastname: formElements[1]?.value,
        intra: formElements[2]?.value,
        email: formElements[3]?.value
      }
      // Save data to localStorage
      localStorage.setItem('user', JSON.stringify(data));
      setStep(2); // Move to the next step
    } else if (step === 2) {
      if (selectedOption === '0' || selectedOption === '2') {
        setStep(3);
      } else {
        skills = {
          skills: formElements?.namedItem('skillDescription')?.value
        }
        localStorage.setItem('skills', JSON.stringify(skills));
        setStep(3);
      }
    }
    changePage();
  }

  // For sending the email
  const sendMail = async (uId) => {
    if (!uId || uId === '') return Promise.reject("No user id found");
    // Get the assistan data by the uId
    try {
      const response = await axios.get(`/api/events/assistants/${uId}`);
      if (response.status === 200) {
        const data = response.data;
        console.log("data:", data);
        const emailData = {
          "to": data?.email,
          "text": `Hola ${data?.fullname}, gracias por registrarte en el evento. En breve recibirás un email con el código QR para poder acceder al evento.`
        }
        const emailResponse = await axios.post(`/api/email/${params?.eventId}`, emailData);
        if (emailResponse.status === 200) {
          setTimeout(() => {
            router.push('/events');
          }, 100);
        }
      }
    } catch (error) {
      console.log("error:", error);
      return Promise.reject(error);
    }
  }

  // For registering the user
  const handleRegister = async () => {
    if (typeof window === 'undefined') {
      return Promise.reject("localStorage is not available");
    }

    // Version: 2.0
    // Get the user data
    const userData = JSON.parse(localStorage.getItem('user'));
    const skillsData = JSON.parse(localStorage.getItem('skills'));
    console.log("userData:", userData); //DEBUG: Check if parsing is working
    console.log("skillsData:", skillsData); //DEBUG: Check if parsing is working
    const registerData = {
      "id": uuidv4(),
      "eventId": params?.eventId,
      "fullname": userData?.name + ' ' + userData?.lastname,
      "intraname": userData?.intra,
      "email": userData?.email,
      "skills": skillsData?.skills || ''
    }
    console.log("registerData:", registerData); //DEBUG: Just to check if it's working
    // Check if the JSON is valid
    if (!registerData || registerData === '') {
      return Promise.reject("No data found");
    }
    // Using JOI library to validate the data
    const { error } = schema.validate(registerData);
    if (error) {
      return Promise.reject(error);
    }
    // Send the data to the API
    try {
      const response = await axios.post(`/api/events/assistants`, JSON.stringify(registerData));
      if (response.status === 200) {
        // Send the email
        const uId = response.data?.id;
        // Save the uId to localStorage
        localStorage.setItem('uId', uId);
        // Remove the data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('skills');
        // Send the email
        await sendMail(uId);
        setTimeout(() => {
          router.push('/events');
        }, 100);
      }
      return Promise.resolve(response);
    } catch (error) {
      console.error("error:", error?.response?.data?.message);
      return Promise.reject(error);
    }
  }

  // For the steps
  const getStepStyle = (currentStep, elementStep) => {
    return parseInt(currentStep) >= elementStep ? "step-primary" : "";
  }

  // For the steps
  const changeStep = (step, hSubmit) => {
    if (step === "1") {
      return (
        <main>
          <center>
            <div className="">
              <h2 className="pt-10 text-2xl font-bold text-white">
                Identificación
              </h2>
              <form onSubmit={hSubmit}>
                <div className="w-full h-full mt-10 ">
                  <label className="mb-5 form-control w-80">
                    <div className="label">
                      <span className="label-text">Nombre</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered"
                      required
                      name="firstName"
                    />
                  </label>
                  <label className="mb-5 form-control w-80">
                    <div className="label">
                      <span className="label-text">Apellidos</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered"
                      required
                      name="lastName"
                    />
                  </label>
                </div>
                <label className="mb-5 w-80 form-control">
                  <div className="label">
                    <span className="label-text">Usuario Intra</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered"
                    required
                    name="intraName"
                  />
                </label>
                <label className="mb-5 form-control w-80">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder="Type here"
                    className="input input-bordered"
                    required
                    name="email"
                  />
                </label>
                <br />
                <br />
                <div className="w-full">
                  <button className="mt-10 btn btn-primary w-80" type="submit">NEXT</button>
                </div>
              </form>
            </div>
          </center>
        </main>
      )
    } else if (step === "2") {  
      const handleChange = (event) => {
        setSelectedOption(event.target.value);
      }
  
      return (
        <main>
          <center>
            <div className="">
              <h2 className="pt-10 text-2xl font-bold text-white">
                Habilidades
              </h2>
              <form onSubmit={hSubmit}>
                <div className="w-full h-full mt-10 ">
                  <label className="mb-5 form-control w-80">
                    <div className="label">
                      <span className="label-text">Tus habilidades</span>
                    </div>
                    <select className="w-full max-w-xs select select-bordered" defaultValue={0} onChange={handleChange} required={selectedOption === '0'}>
                      <option disabled value={'0'}>Selecciona una opción</option>
                      <option value={'1'}>Sí</option>
                      <option value={'2'}>No</option>
                  </select>
                  </label>
                  <label className="mb-5 form-control w-80">
                    <div className="label">
                      <span className="label-text">¿Cuál?</span>
                    </div>
                    <textarea name="skillDescription" id="" disabled={selectedOption === '2' || selectedOption === '0'} cols="30" rows="10" className={`textarea textarea-bordered ${selectedOption === '2' || selectedOption === '0' ? 'textarea-disabled' : ''}`} placeholder="Explicate aquí" required={selectedOption === '1'}></textarea>
                  </label>
                </div>
                <br />
                <br />
                <div className="w-full">
                  <button className="mt-10 btn btn-primary w-80">NEXT</button>
                </div>
              </form>
            </div>
          </center>
        </main>
      )
    } else if (step === "3") {
      const user = JSON.parse(localStorage.getItem('user'));
      return (
        <main>
          <center>
            <div className="">
              <h2 className="pt-10 text-2xl font-bold text-white">
                Instrucciones
              </h2>
              <p className="mt-10">
                <span className="text-lg">Hola! <b>{user.name}</b></span> <br />
                Lo primero, gracias por tu interés en participar en este evento. <br />
                <br />
                A continuación te dejamos las instrucciones para que puedas participar en el evento: <br />
                <br />
                1. La fecha, hora y lugar se te notificará por correo electrónico (Será el que nos habeis facilitado en el apartado de datos). <br />
                <br />
                2. En ese mismo email, te llegará un código QR que deberás presentar en la entrada para poder asistir.
                <br />
                <br />
                3. Una vez terminado el evento, te llegará un email con un formulario de feedback para que nos cuentes tu experiencia (Para ver si podremos repetir este tipo de eventos).
                <br />
                <button className="mt-10 btn btn-primary w-80" onClick={() => changePage()}>NEXT</button>
              </p>
            </div>
          </center>
        </main>
      );
    } else if (step === "4") {
      return (
        <main>
          <center>
            <div className="">
              <h2 className="pt-10 text-2xl font-bold text-white">
                Finalizar
              </h2>
              <p className="mt-10">
                <span className="text-lg">¡Gracias por participar!</span> <br />
                <br />
                En breve recibirás un email con el código QR para poder acceder al evento.
                <br />
                <br />
                <button className="mt-10 btn btn-primary w-80" onClick={() => handleRegister()}>Finalizar</button>
              </p>
            </div>
          </center>
        </main>
      );
    }
  }

  // Main Body of the page
  return (
    <div className="w-full h-full">
      <header className="flex lg:justify-center md:justify-start">
        <ul className="mt-10 steps steps-horizontal lg:steps-horizontal">
          <li className={getStepStyle(sParams.get("step"), 1) + ` step`}>
            Datos
          </li>
          <li className={getStepStyle(sParams.get("step"), 2) + ` step`}>Skills</li>
          <li className={getStepStyle(sParams.get("step"), 3) + ` step`}>
            Instrucciones
          </li>
          <li
            className={getStepStyle(sParams.get("step"), 4) + ` step`}
          >
            Finalizar
          </li>
        </ul>
      </header>
      {changeStep(sParams.get("step"), handleSubmit)}
    </div>
  );
};

export default page;
