"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const changeStepStyle1 = (step) => {
  const activeStep = "step step-primary";
  const inactiveStep = "step";

  return step === "1" ? activeStep : inactiveStep;
};

const changeStepStyle2 = (step, previousStep) => {
  const activeStep = "step step-primary";
  const inactiveStep = "step";

  return step === "2" ? activeStep : inactiveStep;
};

const changeStepStyle3 = (step, previousStep) => {
  const activeStep = "step step-primary";
  const inactiveStep = "step";

  return step === "3" ? activeStep : inactiveStep;
};

const changeStepStyle4 = (step, previousStep) => {
  const activeStep = "step step-primary";
  const inactiveStep = "step";

  return step === "4" ? activeStep : inactiveStep;
};

const changeStep = (step) => {
  if (step === "1") {
    const handleSubmit = () => {
      const sParams = useSearchParams();
    
      const step = sParams.get("step");
      // split to get the dynamic route
      const id = window.location.pathname.split("/")[3];
      const newStep = (step === 1 || step === 2 || step === 3) ? step + 1 : 4;
      console.log("newStep:", newStep);
      window.location.href = `/events/register/${id}?step=${newStep}`;
    }
    return (
      <main>
        <center>
          <div className="">
            <h2 className="pt-10 text-2xl font-bold text-white">
              Identificación
            </h2>
            <form action="">
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
                />
              </label>
              <br />
              <br />
            </form>
            <div className="w-full">
                <button className="mt-10 btn btn-primary w-80" onClick={() => handleSubmit}>NEXT</button>
            </div>
          </div>
        </center>
      </main>
    )
  } else if (step === "2") {
    const [selectedOption, setSelectedOption] = React.useState('0');

    const handleSubmit = () => {
      const sParams = useSearchParams();
    
      const step = sParams.get("step");
      // split to get the dynamic route
      const id = window.location.pathname.split("/")[3];
      const newStep = (step === 1 || step === 2 || step === 3) ? step + 1 : 4;
      console.log("newStep:", newStep);
      window.location.href = `/events/register/${id}?step=${newStep}`;
    }

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    }

    React.useEffect(() => {
      console.log(selectedOption);
    }, [selectedOption])

    return (
      <main>
        <center>
          <div className="">
            <h2 className="pt-10 text-2xl font-bold text-white">
              Habilidades
            </h2>
            <form action="">
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
            </form>
            <div className="w-full">
              <button className="mt-10 btn btn-primary w-80" onClick={() => handleSubmit()}>NEXT</button>
            </div>
          </div>
        </center>
      </main>
    )
  }
}

const page = ({ params }) => {
  const sParams = useSearchParams();

  return (
    <div className="w-full h-full">
      <header className="flex lg:justify-center md:justify-start">
        <ul className="mt-10 steps steps-horizontal lg:steps-horizontal">
          <li className={changeStepStyle1(sParams.get("step"))}>
            Identificación
          </li>
          <li className={changeStepStyle2(sParams.get("step"))}>Habilidades</li>
          <li className={changeStepStyle3(sParams.get("step"))}>
            Instrucciones
          </li>
          <li
            className={changeStepStyle4(
              sParams.get("step"),
              sParams.get("previousStep")
            )}
          >
            Finalizar
          </li>
        </ul>
      </header>
      {changeStep(sParams.get("step"))}
    </div>
  );
};

export default page;
