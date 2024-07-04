"use client";

import Link from "next/link";
import Image from 'next/image';
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { TicketIcon } from "@heroicons/react/24/outline";
import { Balance } from "~~/components/scaffold-eth";
import { useEffect, useState } from "react";
const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const texts = ["Welcome to ENS Airlines!",
    "ENS Havayollarına Hoş Geldiniz!",
    "Bienvenue chez ENS Airlines!",
    "Willkommen bei ENS Airlines!",
    "¡Bienvenido a ENS Airlines!",
    "Benvenuto su ENS Airlines!"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // 2000ms = 2 saniye

    return () => clearInterval(intervalId); // Temizleme işlevi
  }, [texts.length]);






  return (
    <>

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <Image src={"/ensairlines.jpg"} alt={"200"} width={2200} height={200}></Image>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image src={"/ensairlines.jpg"} alt={"200"} width={2200} height={200}></Image>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image src={"/ensairlines.jpg"} alt={"200"} width={2200} height={200}></Image>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Image src={"/ensairlines.jpg"} alt={"200"} width={2200} height={200}></Image>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="inline-flex mx-auto mt-10 items-center font-semibold text-5xl">
          <TicketIcon className="mr-2 mt-3 h-14" /> {texts[currentTextIndex]}
        </div>
      </div>

      <div className="flex justify-center my-5">

        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title">Our flights starts from</div>
            <div className="stat-value mx-5">0.1 Ξ</div>
          </div>

          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value"><Balance className="text-2xl font-bold" address={connectedAddress} /></div>
          </div>
        </div>
      </div>


      <ul className="steps">
        <li className="step step-primary dark:step-warning">Search ticket</li>
        <li className="step ">Select Ticket</li>
        <li className="step">Purchase</li>

      </ul>




      <div className="hero justify-center">
        <div className="hero-content flex-col lg:flex-row-reverse rounded-xl">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Widen your world!</h1>
            <p className="py-6">
              Travel the world with ENS Airlines. We offer you the best prices and the best service.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <span className="label-text mx-3 mb-2 font-bold">From ✈️</span>
                <select className="select w-full max-w-xs" disabled>
                  <option>Istanbul</option>
                </select>
              </div>
              <div className="form-control my-2">
                <span className="label-text mx-3 mb-2 font-bold">To 📍</span>
                <select className="select w-full max-w-xs" disabled>
                  <option>Anywhere</option>
                </select>

              </div>
              <div className="form-control my-2">
                <span className="label-text mx-3 mb-2 font-bold">Date 📅</span>
                <select className="select w-full max-w-xs" disabled>
                  <option>12.07.2024</option>
                </select>

              </div>
              <div className="form-control mt-6">
                <Link href="/flights" className="bg-primary rounded-xl text-center text-xl font-mono">Buy Cheap Ticket 🎫</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="toast my-10">
        <div className="alert alert-error text-center">
          <span>Unfortunately,
            <br />We have limited flights!</span>
        </div>
      </div>



    </>
  );
};

export default Home;
