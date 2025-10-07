import Card_button from "./Card_button";
import "./Prakalpa.css";

function Prakalpa() {
  const events = [
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2025",
      date: "9th April 2025",
      theme: "TECHNOVATE",
      info:
        "Prakalpa’25 – Technovate, the 16th edition of ISTE KJSCE’s flagship event, was a national-level paper and working model presentation competition that stood out for its scale, innovation, and impact. With a prize pool of ₹75,000 and participation from 60+ teams across India, it was our biggest Prakalpa yet — and the first to receive an international entry. The event brought together brilliant minds showcasing tech-driven solutions across diverse domains, fostering creativity, research, and collaborative problem-solving among budding innovators.",
        websiteLink: "https://prakalpa2025.istekjsce.com/",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2024",
      date: "3rd April 2024",
      theme: "TECHXPO",
      info:
        "Prakalpa’24, was back with its 15th edition featuring record-breaking entries of hardware and software projects, as well as research papers, with participants from beyond Maharashtra. PRAKALPA is a national-level event hosted annually by the ISTE Students' Chapter at K J Somaiya College of Engineering. The competition showcases technical paper presentations alongside a display of innovative working model projects.",
        websiteLink: "https://prakalpa2024.istekjsce.com/",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2023",
      date: "13th April 2023",
      theme: "TECHNOVALLEY",
      info:
        "ISTE-KJSCE is organizing the 14th PRAKALPA event on 13th April 2023. Open to all UG / PG students of engineering colleges, this national-level competition involves presenting technical abilities, exchanging new ideas, and implementing teamwork. PRAKALPA is a state-level competition that includes technical paper presentations and a working model project exhibition organized by ISTE Students' Chapter at K J Somaiya College of Engineering annually.",
        websiteLink: "https://istekjsce.com/prakalpa2023/index.html",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2019",
      date: "22nd March -23rd March 2019",
      theme: "TECHNOVATORS",
      info:
        "PRAKALPA is a state level competition which includes technical paper presentation and working model project exhibition organized by ISTE Students' Chapter MH-60 at K J Somaiya College of Engineering annually. It is being conducted since the year 2006 and has been a remarkable success over the years has been growing a notch higher with each coming year. It has witnessed a participation of more than 500 students all over Maharashtra. This year, Prakalpa will be held on 22nd and 23rd March, 2019.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2018",
      date: "16th and 17th March, 2018",
      theme: "TECHNOVERSE",
      info:
        "PRAKALPA is a state level competition which includes technical paper presentation and working model project exhibition organized by ISTE Students' Chapter MH-60 at KJ Somaiya College of Engineering annually. It is being conducted since the year 2006 and has been a remarkable success over the years has been growing a notch higher with each coming year. It has witnessed a participation of more than 500 students all over Maharashtra. This year, Prakalpa will be held on 16th and 17th March, 2018.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2017",
      date: "31st March - 1st April, 2017",
      theme: "Artificial Intelligence-Innovation towards Future",
      info:
        "Prakalpa is a technical paper conference and working model/project competition organized by ISTE Council and K.J. Somaiya College of Engineering. This is a state-level competition which is conducted annually in K.J. Somaiya College of Engineering, Vidyavihar. This year prakalpa will be conducted on 31st March & 1st April, 2017. The competition is being organized since 2006 and now becoming more and more popular among the students.",
      
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2016",
      date: "18th March and 19th March 2016",
      theme: "Digital India",
      info:
        "Prakalpa is a technical paper conference and working model/project competition organized by ISTE Council and K.J. Somaiya College of Engineering. This is a state-level competition which is conducted annually in K.J. Somaiya College of Engineering, Vidyavihar. This year prakalpa will be conducted on 18, 19 March, 2016. The competition is being organized since 2006 and now becoming more and more popular among the students",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2015",
      date: "5th and 7th March 2015",
      theme: "Security Systems",
      info:
        "Prakalpa is a technical paper conference and working model/project competition organized by ISTE Council. This is a state-level competition which is conducted annually in K.J. Somaiya College of Engineering, Vidyavihar.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2014",
      date: "14th and 15th March 2014",
      theme: "Sustainable Development",
      info:
        "Prakalpa is a State level Competition organized by K. J. Somaiya College of Engineering and the ISTE Student Chapter — KJSCE since 2006.In 2011, Prakalpa included project exhibition of working models.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2013",
      date: "5th and 6th April 2013",
      theme: "Enginnering for physically challenged",
      info:
        "Prakalpa is a State level Competition organized by K. J. Somaiya College of Engineering and the ISTE Student Chapter — KJSCE since 2006.In 2011, Prakalpa included project exhibition of working models.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "PRAKALPA 2012",
      date: "30th-31st March 2012.",
      theme: "Enginnering for physically challenged",
      info:
        "Prakalpa is a State level Competition organized by K. J. Somaiya College of Engineering and the ISTE Student Chapter KJSCE since 2006.This year, Prakalpa includes Technical Paper Presentation (30th March) along with Working models exhibition (31st March).",
      brochureLink: "https://your-brochure.pdf"
    }
  ];

  return (
    <div className="Prakalpa">
      <h1
        style={{
          color: "white",
          fontSize: "60px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        PRAKALPA
      </h1>
      {events.map((event, index) => (
        <Card_button
          key={index}
          index={index}
          image={event.image}
          title={event.title}
          date={event.date}
          theme={event.theme}
          info={event.info}
          websiteLink={event.websiteLink} // will only exist till 2017
          brochureLink={event.brochureLink}
        />
      ))}
    </div>
  );
}

export default Prakalpa;
