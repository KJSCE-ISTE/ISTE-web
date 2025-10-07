import Card from "./Card";
import "./Workshop.css";

function Workshop() {
  const events = [
    {
      image: "/src/assets/event.jpg",
      title: "THINKSPRINT",
      date: "26th March 2025",
      participants: "Team of 2 or solo",
      fee: "Rs.80/- (team of 2) & Rs.50/- (solo)",
      prize: "Rs.5000/-",
      description:
        "ISTE KJSSE organized the Techtangle Challenge, a hands-on event blending coding and electronics.",
      info:
        "ThinkSprint, held as a pre-event for PRAKALPA’25, was a two-round innovative case competition challenging participants to solve real-world industry problems. The first round involved online case submissions with innovative, data-driven solutions. Shortlisted teams advanced to the offline final round, where a surprise industry twist tested their adaptability. Judged by Rajvardhan Patil, the event emphasized AI integration, feasibility, and business impact, offering participants valuable exposure and a platform to showcase strategic thinking."
    },
    {
      image: "/src/assets/event2.jpg",
      title: "CLICK.DRAG.CREATE",
      date: "13th September 2024",
      venue: "B113 Seminar Hall",
      participants: "Team of 2 or solo",
      fee: "Rs.80/- (for a team of 2) & Rs.50/- (for solo)",
      prize: "Rs.7000/-",
      description:
        "ISTE KJSSE hosted a fun AI challenge focusing on creativity with Generative AI.",
      info:
      "Click.Drag.Create, a hands-on Figma workshop, introduced students to UI/UX design through real-world applications. Conducted in collaboration with Friends of Figma, the session covered Figma fundamentals, UI elements, and concluded with an interactive quiz. Guided by experts Sooraj Nair and Rishabh Singh, participants explored design principles and left with practical skills, confidence, and inspiration to build creative digital experiences",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "CREAITE",
      date: "28th October 2023",
      mode: "Microsoft Teams",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "CreAIte, organized by ISTE KJSSE, was an online workshop on various AI tools and their functions. Led by Abhinav Gupta, founder of 100xengineers, the workshop attracted AI enthusiasts eager to explore practical applications. It covered key tools like ChatGPT for engaging content, Tome.ai for professional presentations, and rvc.ai for voice transformation. Abhinav's accessible style made complex AI concepts understandable, leaving participants inspired and equipped to integrate AI into their projects.",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "SPOTIFY RECOMMENDATION SYSTEM USING MACHINE LEARNING",
      date: "10th November 2021",
      Time: "6:00pm",
      mode: "Microsoft Teams",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "Machince intelligence is the last invention that humanity will ever need to make. - Nick Bostrom Machine learning drives our algorithms for demand forecasting, product search ranking, product & deals recommendations, merchandising placements, fraud detection, translations, and much more.Ms. Princey Yadav is an instructor and a product engineer at Coding Blocks with multiple years of experience in teaching tech and taking amazing workshops.",

    },
    {
      image: "/src/assets/event3.jpg",
      title: "PERSONALITY DEVELOPMENT",
      date: "22nd March 2021",
      Time: "6.00pm to 7.30pm",
      Mode: "Microsoft Teams",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "PCB Designing Using Eagle",
      date: "13th February 2021",
      Time: "12 PM Onwards",
      mode : "Microsoft Teams",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "Have you ever wondered how to design fascinating electronic schematics for fabrication using CAD software like EAGLE? Eagle is electronic design automation (EDA) software that lets printed circuit board (PCB) designers seamlessly connect schematic diagrams, component placement, PCB routing and comprehensive library content."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "BACKTRACKING ALGORITHM",
      date: "8th August 2020",
      Time:"8pm-10pm",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "ISTE-KJSSE presents workshop on BACKTRACKING ALGORITHMS in collaboration with CODING BLOCKS by Shubham Rawat , Mentor and product engineer at Coding blocks, Google Code-In Mentor 2018-2019 at Jboss.What does it feel like to watch a computer solve puzzles, crosswords, chess and verbal arithmetic with an unmatched speed? Thrilling, right? Backtracking algorithm is implemented to find solutions to some computational problems, notably Constraint Satisfaction Problems. Backtracking can prove to be quite an useful tool in the emerging domain of Artificial Intelligence and machine learning",


    },
    {
      image: "/src/assets/event3.jpg",
      title: "Analytics Using R programming",
      date: "3rd and 4th March 2020",
      Time: "5.30pm ownwards",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "Eagle Workshop",
      date: "4th Feb 2020",
      Time:"5.15pm ownwards",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "When you see an electric circuit, have you ever thought of how it is designed? Here's the answer to all your doubts! We are coming up with a workshop where you will be learning circuit desinging with the help of EAGLE software.",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "Augmented Reality Workshop",
      date: "5th October, 2019",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "On 5th October, 2019,. A workshop on AR was conducted by Team ISTE at B-110 , KJSSE. Augmented Reality is the integration of digital information with the user's environment in realtime. Unlike virtual reality which creates totally artificial environment, Augmented reality uses the existing environment and overlays new information on top of it. The session was conducted by 3 experts - Vishal,Rishabh And Ronit. Students were asked to install three softwares that were required(Blender,Unity and Android Studio). Students were able to grasp the concept easily. Good response was received from students.",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "UI Design Workshop",
      date: "11 Feb- 12 Feb 2019",
      Time:"5.30pm-7pm",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "UI Design which is an amazing and most trending thingy right now .... It's needed and used in day to day life, from basic pamphlets to high profile websites, almost everywhere. Venture into the world of designing things from scratch, right from Wire framing to design, we will teach you all. Mr. Arjun Patel, is a graphic and UI based designer in Mumbai. He has an experience of more than 3 years in this field. Worked with amazing companies. He’ll bring out all your creativity and turn it into a magnificent design.",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "Component and Calculator Workshop",
      date: "5th September, 2018",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "On 5th September, 2018,. A workshop on scientific calculator and component testing workshop was conducted at B-407 , KJSSE. This workshop was specially for first year students , it was even open for second students. It helped these students to know all the functions of Scientific Calculator for all the subjects in this semester as well as in coming semesters. The Components testing part helped the students to know how the circuit works as well as how we can practically mount any type of circuit and also the use of function generator and CRO . With the help of this they understood the circuits and how to mount circuits.",
    },
    {
      image: "/src/assets/event3.jpg",
      title: "Workshop on Component testing and identification",
      date: "8th September 2017",
      Time:"5:15 pm",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "ARDUINO MICROCONTROLLER WORKSHOP",
      date: "13th September to 15th September 2017",
      Time:"5:15 pm to 8:00 pm",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
        "Participants faced diverse tasks across four tables, including algorithm design, debugging, web development, and practical electronics, putting both their logic and technical skills to the test."
    },
    {
      image: "/src/assets/event3.jpg",
      title: "Hackathon",
      date: "5thMarch 2016",
      Time:"10am to 3pm",
      participants: "Team of 2",
      fee: "Rs.80/- (for a team of 2)",
      prize: "Rs.7000/-",
      description:
        "ISTE organized the most fun coding event of Abhiyantriki 2022: The Bro Code !",
      info:
      "It was a complete day event where participants came and converted their ideas into products. Followed by it there was a judging round. The event was judged byProf.Sujata Patak and Prof.Irfan A.Siddavatam. Winners of the round were given free entry for prakalpa.",
    },
    
    
  ];

  return (
    <div className="Workshop">
      <h1  style={{
          color: "white",
          fontSize : "50px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center"}}>WORKSHOPS</h1>
     {events.map((event, index) => (
  <Card
    key={index}
    index={index}  
    image={event.image}
    title={event.title.toUpperCase()}
    date={event.date}
    Time={event.Time}
    venue={event.venue}
    
    
    //description={event.description}
    info={event.info}
    mode={event.mode}
  />
))}
    </div>
  );
}

export default Workshop;
