import Card from "./Card";
import "./Abhiyantriki.css";

function Abhiyantriki() {
  const events = [
    {
      image: "/src/assets/event.jpg",
      title: "TECHTANGLE - ABHIYANTRIKI 2024",
      date: "14th Oct 2024",
      participants: "Team of 2 or solo",
      fee: "Rs.80/- (team of 2) & Rs.50/- (solo)",
      prize: "Rs.5000/-",
      description:
        "ISTE KJSSE organized the Techtangle Challenge, a hands-on event blending coding and electronics.",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "/src/assets/event2.jpg",
      title: "GEN AI WEBCRAFT CHALLENGE - ABHIYANTRIKI 2023",
      date: "5th Oct 2023",
      participants: "Team of 2 or solo",
      fee: "Rs.80/- (for a team of 2) & Rs.50/- (for solo)",
      prize: "Rs.7000/-",
      description:
        "ISTE KJSSE hosted a fun AI challenge focusing on creativity with Generative AI.",
      info:
        "The GenAI WebCraft Challenge invited participants to create innovative websites or Apps using various generative AI tools. Participants tackled a problem statement, showcasing their creativity and technical skills with these AI capabilities."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "The BROCODE - ABHIYANTRIKI 2022",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "",
      title: "",
      date: "18th Nov 2022",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
  ];

  return (
    <div className="Abhiyantriki">
      <h1  style={{
          color: "white",
          fontSize : "50px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center"}}>ABHIYANTRIKI</h1>
     {events.map((event, index) => (
  <Card
    key={index}
    index={index}  
    image={event.image}
    title={event.title}
    date={event.date}
    participants={event.participants}
    fee={event.fee}
    prize={event.prize}
    description={event.description}
    info={event.info}
  />
))}
    </div>
  );
}

export default Abhiyantriki;
