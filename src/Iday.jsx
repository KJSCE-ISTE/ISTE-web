import Card from "./Card.jsx";
import "./Iday.css";

function Iday() {
  const events = [
    
    {
      image: "/src/assets/event.jpg",
      title: "Independence Day 2016",
      date: "16th Aug 2015",
      Time:"12pm to 12:45pm",
      Venue:"Amphitheater",
      org: "ISTE COUNCIL",
      theme: "Digital India",
      info:
      "Independence Day was celebrated with great enthusiasm and respect by ISTE Student chapter and KJSSE Student’s council. The ceremony started at 12:30 PM in the amphitheater with large crowd of staff and students.The celebration commenced with greeting the crowd by Ayush Gandhi, member of Student’s council. He shared his views on the significance of the day. A group of students sang patriotic songs that awakened everyone’s feelings towards our Mother Land. It was further lead by Team Rhapsody who expressed their views on Indian pledge in a unique way. Then on behalf of ISTE council, Kiran Jawahirani delivered a speech highlighting the importance of Independence Day. The programme concluded with the singing of National Anthem. The celebration was indeed joyful, it fostered the spirit of love and respect for the Nation.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "Independence Day 2015",
      date: "5th and 7th March 2015",
      Time:"12pm to 12:45pm",
      Venue:"New Building Quadrangle.",
      org: "ISTE COUNCIL",
      theme: "Security Systems",
      info:
      "The History repeats itself. As every year, this year as well Independence Day was celebrated on 16th Aug. The celebration included the Somaiya prayer followed by the National Anthem sung by the entire crowd present at the event. It ended in a peaceful way with smiling faces around.. Appreciable amount of students and faculty members were present.",
      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "Independence Day 2014",
      date: "14th and 15th March 2014",
      Time:"12pm to 12:45pm",
      Venue:"New Building Quadrangle.",
      org: "ISTE COUNCIL",
      theme: "Sustainable Development",
    info:
      "The History repeats itself. As every year, this year as well Independence Day was celebrated on 16th Aug. The celebration included the Somaiya prayer followed by the National Anthem sung by the entire crowd present at the event. It ended in a peaceful way with smiling faces around.. Appreciable amount of students and faculty members were present.",      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "Independence Day 2013",
      date: "5th and 6th April 2013",
      Time:"12pm to 12:45pm",
      Venue:"Old Building Quadrangle",
      org: "ISTE COUNCIL",
      theme: "Enginnering for physically challenged",
info:
      "The History repeats itself. As every year, this year as well Independence Day was celebrated on 16th Aug. The celebration included the Somaiya prayer followed by the National Anthem sung by the entire crowd present at the event. It ended in a peaceful way with smiling faces around.. Appreciable amount of students and faculty members were present.",      brochureLink: "https://your-brochure.pdf"
    },
    {
      image: "/src/assets/event.jpg",
      title: "Independence Day 2012",
      date: "30th-31st March 2012.",
      Time:"12pm to 12:45pm",
      Venue:"Old Building Quadrangle",
      org: "ISTE COUNCIL",
      theme: "Enginnering for physically challenged",
      info:
      "As 15th Aug being a bank holiday,Independence Day Celebration was scheduled on 16th of August during the lunch break.The Celebration was commenced with the Somaiya Prayer followed by the National Anthem in a very unique way by Sohail Shah's flute.It ended in a peaceful way with the smiling faces aroundAppreciable amount of students and faculty members were present.",
      brochureLink: "https://your-brochure.pdf"
    }
  ];

  return (
    <div className="Iday">
      <h1
        style={{
          color: "white",
          fontSize: "60px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        INDEPENDENCE DAY
      </h1>
      {events.map((event, index) => (
        <Card
    key={index}
    index={index}  
    image={event.image}
    title={event.title.toUpperCase()}
    date={event.date}
    Time={event.Time}
    Venue={event.Venue}
    org={event.org}
    
    
    //description={event.description}
    info={event.info}
    mode={event.mode}
  />
      ))}
    </div>
  );
}

export default Iday;
