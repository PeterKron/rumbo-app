import React, { useMemo } from "react";

const generateGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 17) return "God kväll";
  if (hour > 9) {
    var greetings = [
      "Hallå",
      "Hej",
      "Hello",
      "Hi",
      "Terve",
      "Bonjour",
      "Ciao",
      "Hola",
      "Witam", // Polska
      "Kamusta",  // filipino
      "Здравствуйте", // Ukrainska
      "नमस्ते", // Hindi
      "ሰላም", // Amharinha
      "你好", // Kinesiska
      "こんにちは", // Japanska
      "여보세요", // Koreanska
      "สวัสดี", // Thai
      "გამარჯობა", // Georgiska
    ];
    var greeting_id = Math.floor(Math.random() * greetings.length);
    return greetings[greeting_id];
  }
  if (hour > 6) {
    return "God morgon";
  }
  if (hour > 0) {
    return "God kväll";
  }

  return "Hej";
};

type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  const greeting = useMemo(() => generateGreeting(), []);

  return (
    <>
      {greeting} {name}
    </>
  );
};

export default Greeting;
