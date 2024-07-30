"use client";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string 
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState(2985775);
  const [energy, setEnergy] = useState(2532);
  const [click, setClick] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 10;
  const energyToReduce = 10;
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClick([...click, { id: Date.now(), x, y }]);
  };
  const handleAnimationEnd = (id: number) => {
    setClick((prevClick) => prevClick.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user)
      setUserData(WebApp.initDataUnsafe.user as UserData);
  }, []);


  return (
    <div className="min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 -z-10 h-full w-full items-center  py-10 [background:radial-gradient(125%_125%_at_50%_10%,#8d8c8c_30%,#422297_100%)] "></div>
      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-[#ffffff]">
          <div className="w-full cursor-pointer">
            <div className="flex items-center justify-center rounded-2xl">
              <Image
                src='/userIcon.png'
                alt="userICon"
                width={36}
                height={36}
                className="bg-[#c3bac7] rounded-3xl p-0.5"
              />
              {userData ? (
                <div className="ml-2">
                  <h1> {userData.first_name}</h1>
                </div>
              ) : (
                <>
                  <div className="ml-2"></div>
                </>
              )}
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <Image src="/coin.png" alt="" width={60} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <Image src="/trophy.png" alt="trophy" width={40} height={24} />
            <span className="ml-1 flex items-center justify-center">
              Gold
              <MdOutlineKeyboardArrowRight size={25} />
            </span>
          </div>
        </div>
        <div className="fixed bottom-0 w-full pb-4  z-10 px-6">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-12">
              <div className="flex items-center justify-center">
                <Image src="/energy2.png" alt="energy" width={30} height={40} />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">
                    {energy}
                  </span>
                  <span className="text-white text-lg opacity-75">/6500</span>
                </div>
              </div>
            </div>
            <div className="flex flex-grow max-w-56 text-sm">
              <div className="w-full bg-[#8478a7] p-1 rounded-2xl flex justify-around">
                <Link
                  href="https://tb-tech.io/"
                  target="_blank"
                  className="flex flex-col items-center gap-1"
                >
                  <div className="h-10">
                    <Image
                      src="/tbl.png"
                      alt="high voltage"
                      width={36}
                      height={36}
                    />
                  </div>
                  <span>TBL TECH</span>
                </Link>
                <div className="h-12 w-0.5 bg-[#bca6f7] mt-2"></div>

                <button className="flex flex-col items-center gap-1">
                  <div className="h-10">
                    <Image
                      src="/coin.png"
                      alt="high voltage"
                      width={36}
                      height={36}
                    />
                  </div>
                  <span>Earn</span>
                </button>
                <div className="h-12 w-0.5 bg-[#bca6f7] mt-2"></div>

                <button className="flex flex-col items-center gap-1">
                  <div className="h-10 flex items-center">
                    <Image
                      src="/boosts.png"
                      alt="high voltage"
                      width={36}
                      height={36}
                    />
                  </div>
                  <span>boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#936ef8] rounded-full mt-4 shadow-2xl">
            <div
              className="bg-gradient-to-r from-[#8d6aee] to-[#ffffff] h-4 rounded-full shadow-2xl"
              style={{ width: `${(energy / 6500) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <Image src="/main.png" alt="click me" width={256} height={256} />
            {click.map((clicks) => (
              <div
                key={clicks.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${clicks.y - 42}px`,
                  left: `${clicks.x - 28}px`,
                  animation: `float 1s ease-out`,
                }}
                onAnimationEnd={() => handleAnimationEnd(clicks.id)}
              >
                10
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
