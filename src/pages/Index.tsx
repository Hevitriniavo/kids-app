import Header from "@/components/Header";
import ActivityCard from "@/components/ActivityCard";
import Character from "@/components/Character";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMessageStore } from '../store/messageStore';
import { Send } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const Index = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const setMessageStore  = useMessageStore(state=>state.setMessage)

  const handleClick = () => {
    setMessageStore(message)
    navigate("/talk-bot");
  };

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  
  const activities = [
    {
      title: "Scanner d'objets",
      description: "Prends un objet en photo et apprends ce que c'est !",
      icon: "📸",
      color: "kid-blue",
      route: "/scanner",
    },
    {
      title: "Assistant vocal",
      description: "Pose-moi des questions et je te répondrai !",
      icon: "🎤",
      color: "kid-purple",
      route: "/voice",
    },
    {
      title: "Lecture de dessins",
      description: "Dessine quelque chose et je devinerai ce que c'est !",
      icon: "🎨",
      color: "kid-yellow",
      route: "/drawing",
    },

    {
      title: "Apprentissage fruité",
      description: "Apprentissage pratique à travers l'utilisation des fruits.",
      icon: "🍒",
      color: "kid-red",
      route: "/fruit-learn",
    },
    {
      title: "Histoires interactives",
      description: "Écoute des histoires et influence l'intrigue !",
      icon: "📚",
      color: "kid-green",
      route: "/stories",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-800" data-aos="fade-up">
              Bienvenue sur Kiki AI !
            </h1>
            <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="200">
              Un monde d'apprentissage t'attend !
            </p>
          </div>

          <div className="flex justify-center mb-12" data-aos="zoom-out"  >
            <Character message="Salut ! Je suis Kiki, ton compagnon d'exploration. Que veux-tu faire aujourd'hui ?" />
          </div>
          <div className="w-full max-w-7xl relative">
            <textarea
              className="w-full p-4 pl-10 pr-14 border bg-gray-300 rounded-md mb-4 text-gray-800"
              rows={3}
              placeholder="Écris quelque chose..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="absolute right-4 bottom-10 text-blue-500 bg-kid-blue hover:bg-kid-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors "
              onClick={handleClick}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Activités</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-aos="fade-up"
     data-aos-duration="3000">
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
                color={activity.color}
                route={activity.route}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 bg-white">
        <p>Kiki AI - Apprends en t'amusant !</p>
      </footer>
    </div>
  );
};

export default Index;
