"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const sParams = useSearchParams();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState('0');
  const [step, setStep] = React.useState(1);
  const [user, setUser] = React.useState(localStorage.getItem('user'));

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    let data;

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
      data = {
        skillsDescription: formElements[1]?.value
      }
      setStep(3); // Reset to the first step or navigate to another page
    }

    console.log("data:", data);
    changePage();
  }

  const getStepStyle = (currentStep, elementStep) => {
    return parseInt(currentStep) >= elementStep ? "step-primary" : "";
  }

  useEffect(() => {
    if (user === null || user === undefined) {
      router.push(`/events/register/${params.eventId}?step=1`);
    } else {
      router.push(`/events/register/${params.eventId}?step=2`);
    }
  }, [user]);

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
                    <textarea name="" id="" disabled={selectedOption === '2' || selectedOption === '0'} cols="30" rows="10" className={`textarea textarea-bordered ${selectedOption === '2' || selectedOption === '0' ? 'textarea-disabled' : ''}`} placeholder="Explicate aquí" required={selectedOption === '1'}></textarea>
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
              </p>
            </div>
          </center>
        </main>
      );
    }
  }

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
