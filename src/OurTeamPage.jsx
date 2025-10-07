import React, { useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';

const styles = `
  @keyframes wave {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-10px); }
    75% { transform: translateY(-25px) translateX(5px); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
  
  .water-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }
  
  .wave-layer {
    position: absolute;
    width: 200%;
    height: 100%;
    background: linear-gradient(60deg, 
      transparent 0%, 
      rgba(6, 182, 212, 0.1) 25%,
      transparent 50%,
      rgba(14, 165, 233, 0.1) 75%,
      transparent 100%
    );
    animation: wave 20s ease-in-out infinite;
  }
  
  .bubble {
    position: absolute;
    bottom: -50px;
    width: 3px;
    height: 3px;
    background: rgba(103, 232, 249, 0.3);
    border-radius: 50%;
    animation: float 15s ease-in-out infinite;
  }
`;


export default function OurTeamPage() {
  const [activeYear, setActiveYear] = useState('2025-26');
  

const [hoveredIcon, setHoveredIcon] = useState(null);
const [visibleCards, setVisibleCards] = useState(new Set());

React.useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCards((prev) => new Set([...prev, entry.target.dataset.cardId]));
        }
      });
    },
    { threshold: 0.1 }
  );

  const cards = document.querySelectorAll('[data-card-id]');
  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, [activeYear]);

  const teamData = {
    '2025-26': {
      facultyAdvisors: [
        { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
        { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
      ],
      coreTeam: [
        {
          name: "Tanish Shetty",
          role: "Chairperson",
          image: "Images/Team 2025-26/Tanish_CP.png",
          instagram: "https://www.instagram.com/tanish_shetty33",
          linkedin: "http://www.linkedin.com/in/tanish-shetty-92b2832a9"
        },
        {
          name: "Aditi Kanagala",
          role: "Vice-Chairperson",
          image: "Images/Team 2025-26/Aditi_VCP.png",
          instagram: "https://www.instagram.com/aditikanagala_",
          linkedin: "https://www.linkedin.com/in/aditi-kanagala-262b772a1"
        },
        {
          name: "Manav Parekh",
          role: "Treasurer",
          image: "Images/Team 2025-26/Manav_Treasurer.png",
          instagram: "https://www.instagram.com/manav_0613",
          linkedin: "https://www.linkedin.com/in/manav-parekh-7700b8273"
        }
      ],
      operations: {
        head: {
          name: "Aditey Kshirsagar",
          role: "Operations Head",
          image: "Images/Team 2025-26/Aditey_OPS_head.png",
          instagram: "https://www.instagram.com/imaditey_19",
          linkedin: "https://www.linkedin.com/in/aditey-kshirsagar-0b7962307/"
        },
        team: [
          { name: "Param Sangani", role: "Operations team member", image: "Images/Team 2025-26/Param_OPS.png", instagram: "https://www.instagram.com/param.js", linkedin: "https://www.linkedin.com/in/param-sangani-974b391a5" },
          { name: "Shounak Datta", role: "Operations team member", image: "Images/Team 2025-26/Shaunak_OPS.png", instagram: "#", linkedin: "#" },
          { name: "Manaal Shah", role: "Operations team member", image: "Images/Team 2025-26/Manaal_OPS.png", instagram: "#", linkedin: "#" },
          { name: "Aarohi Paranjape", role: "Operations team member", image: "Images/Team 2025-26/Aarohi_OPS.jpg", instagram: "#", linkedin: "#" }
        ]
      },
      webTech: {
        head: {
          name: "Anamay Narkar",
          role: "Web & Tech Head",
          image: "Images/Team 2025-26/Anamay_Tech_head.png",
          instagram: "https://instagram.com/anamay.narkar",
          linkedin: "https://www.linkedin.com/in/anamay-narkar-23754b297"
        },
        team: [
          { name: "Harsh Manojkumar", role: "Web and tech team member", image: "Images/Team 2025-26/Harsh_tech.png", instagram: "https://www.instagram.com/harshmanoj_0604", linkedin: "https://www.linkedin.com/in/harsh-manojkumar-969452317" },
          { name: "Atharva Pandey", role: "Web and tech team member", image: "Images/Team 2025-26/Atharva_tech.png", instagram: "https://www.instagram.com/atharvapandey0706", linkedin: "https://www.linkedin.com/in/atharva-pandey-973528312" },
          { name: "Varun Nair", role: "Web and tech team member", image: "Images/Team 2025-26/Varun_tech.png", instagram: "https://www.instagram.com/varunnair29/", linkedin: "https://www.linkedin.com/in/varun-nair-39055b332/" },
          { name: "Bhavya Shah", role: "Web and tech team member", image: "Images/Team 2025-26/Bhavya_tech.png", instagram: "https://www.instagram.com/bhavyashah06", linkedin: "https://www.linkedin.com/in/bhavya-shah-8757b5320" }
        ]
      },
      prMarketing: {
        head: {
          name: "Dhruv Sokiya",
          role: "PR and Marketing Head",
          image: "Images/Team 2025-26/Dhruv_PR_head.png",
          instagram: "https://www.instagram.com/dhruv.sokiya",
          linkedin: "#"
        },
        team: [
          { name: "Rishabh Bohra", role: "PR and marketing team member", image: "Images/Team 2025-26/Rishabh_PR.png", instagram: "https://www.instagram.com/rishabh.bohra_", linkedin: "https://www.linkedin.com/in/rishabh-bohra15" },
          { name: "Nidhi Rasalkar", role: "PR and marketing team member", image: "Images/Team 2025-26/Nidhi_PR.png", instagram: "https://www.instagram.com/nidhi_rasalkar", linkedin: "https://www.linkedin.com/in/nidhi-rasalkar-229400333" },
          { name: "Navya Mathur", role: "PR and marketing team member", image: "Images/Team 2025-26/Navya_PR.png", instagram: "https://www.instagram.com/mathurnavya._", linkedin: "https://www.linkedin.com/in/navyamathur21" },
          { name: "Prasen Ghadyalpatil", role: "PR and marketing team member", image: "Images/Team 2025-26/Prasen_PR.png", instagram: "#", linkedin: "#" }
        ]
      },
      creative: {
        head: {
          name: "Aaryan Sharma",
          role: "Creative Team Head",
          image: "Images/Team 2025-26/Aaryan_Creative_head.png",
          instagram: "https://www.instagram.com/aaryansharma2512",
          linkedin: "https://www.linkedin.com/in/aaryan-sharma-25a12t"
        },
        team: [
          { name: "Jay Vispute", role: "Creative team member", image: "Images/Team 2025-26/Jay_creative.png", instagram: "#", linkedin: "#" },
          { name: "Siddhi Sawant", role: "Creative team member", image: "Images/Team 2025-26/Siddhi_creative.png", instagram: "https://www.instagram.com/siddddhhii", linkedin: "https://www.linkedin.com/in/siddhi-sawant-ab9404314" },
          { name: "Bhumika Guha", role: "Creative team member", image: "Images/Team 2025-26/Bhumika_creative.png", instagram: "https://www.instagram.com/bhumikx", linkedin: "http://www.linkedin.com/in/bhumika-g-501a86321" },
          { name: "Aadit Kokas", role: "Creative team member", image: "Images/Team 2025-26/Aadit_creative.png", instagram: "https://www.instagram.com/aaditkokas", linkedin: "https://www.linkedin.com/in/aadit-kokas-98a168322" }
        ]
      },
      studentAdvisors: [
        { name: "Krisha Kapadia", role: "Former Chairperson", image: "Images/Team 2025-26/Krisha_SA.jpg", instagram: "https://www.instagram.com/krisha_2204_/", linkedin: "https://www.linkedin.com/in/krishakapadia/" },
        { name: "Garv Vyas", role: "Former Vice-Chairperson", image: "Images/Team 2025-26/Garv_SA.jpg", instagram: "https://www.instagram.com/garvv_07", linkedin: "http://www.linkedin.com/in/garv-vyas-749895258" },
        { name: "Sanskar Lodha", role: "Former Treasurer", image: "Images/Team 2024-25/Sanskar_new.jpg", instagram: "https://www.instagram.com/sanskar_2508", linkedin: "http://www.linkedin.com/in/sanskar-lodha" }
      ]
    },
    '2024-25': {
      facultyAdvisors: [
        { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
        { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
      ],
      coreTeam: [
        {
          name: "Krisha Kapadia",
          role: "Chairperson",
          image: "Images/Team 2024-25/Krisha_CP.jpg",
          instagram: "https://www.instagram.com/krisha_2204_/",
          linkedin: "https://www.linkedin.com/in/krishakapadia/"
        },
        {
          name: "Garv Vyas",
          role: "Vice-Chairperson",
          image: "Images/Team 2024-25/Garv_VCP.jpg",
          instagram: "https://www.instagram.com/garvv_07?igsh=MWtucmJnN3I3ZXM5Yw==",
          linkedin: "http://www.linkedin.com/in/garv-vyas-749895258"
        },
        {
          name: "Sanskar Lodha",
          role: "Treasurer",
          image: "Images/Team 2024-25/Sanskar_new.jpg",
          instagram: "https://www.instagram.com/sanskar_2508?igsh=MXZxNHA4OTg5bHQ1Ng%3D%3D&utm_source=qr",
          linkedin: "http://www.linkedin.com/in/sanskar-lodha"
        }
      ],
      operations: {
        head: {
          name: "Gaurang Patil",
          role: "Operations Head",
          image: "Images/Team 2024-25/Gaurang_ops_head.jpg",
          instagram: "https://www.instagram.com/patilgaurang9?igsh=bm1zY2ZyMmhsMnRu",
          linkedin: "https://www.linkedin.com/in/gaurangpatil9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app*"
        },
        team: [
          { name: "Aditi Kanagala", role: "Operations team member", image: "Images/Team 2024-25/Aditi_ops.jpg", instagram: "https://www.instagram.com/aditikanagala_?igsh=MWRyejZ1bTAxNGw3aA%3D%3D&utm_source=qr", linkedin: "http://www.linkedin.com/in/aditi-kanagala-262b772a1" },
          { name: "Aditey Kshirsagar", role: "Operations team member", image: "Images/Team 2024-25/Aditey_ops.jpg", instagram: "https://www.instagram.com/imaditey_19?igsh=bnYzdzhoamNmaWdr&utm_source=qr", linkedin: "https://www.linkedin.com/in/aditey-kshirsagar-0b7962307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
          { name: "Vipul Garg", role: "Operations team member", image: "Images/Team 2024-25/Vipul_ops.jpg", instagram: "https://www.instagram.com/vipul_garg16?igsh=MWo3YnczOHh1ejl5aQ%3D%3D&utm_source=qr", linkedin: "http://linkedin.com/in/vipul-garg-16p" },
          { name: "Archit Singh", role: "Operations team member", image: "Images/Team 2024-25/Archit_ops.jpg", instagram: "https://www.instagram.com/archits_04?igsh=aDViYTZodGhyYWs2", linkedin: "http://www.linkedin.com/in/architsingh04" }
        ]
      },
      webTech: {
        head: {
          name: "Mahek Thakkar",
          role: "Web & Tech Head",
          image: "Images/Team 2024-25/Mahek_tech_head.jpg",
          instagram: "https://www.instagram.com/mahek_thakkar06?igsh=Z3BxeWthbHB4bGJ5",
          linkedin: "https://www.linkedin.com/in/mahek-thakkar-729b91287"
        },
        team: [
          { name: "Dev Baliga", role: "Web and tech team member", image: "Images/Team 2024-25/Dev_tech.jpg", instagram: "https://www.instagram.com/devleo_drums_?igsh=MTc4d3M1ZGp4bW0wMw==", linkedin: "https://www.linkedin.com/in/dev-baliga-437970283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
          { name: "Anamay Narkar", role: "Web and tech team member", image: "Images/Team 2024-25/Anamay_tech.jpg", instagram: "https://instagram.com/anamay.narka", linkedin: "https://www.linkedin.com/in/anamay-narkar-23754b297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
          { name: "Nitisha Goyal", role: "Web and tech team member", image: "Images/Team 2024-25/Nitisha_tech.jpg", instagram: "https://www.instagram.com/nitisha_goyal_7890?igsh=NXJzMmRpYnMxam5s", linkedin: "https://www.linkedin.com/in/nitisha-goyal-40905a285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
          { name: "Swarni Chouhan", role: "Web and tech team member", image: "Images/Team 2024-25/Swarni_tech.jpg", instagram: "https://www.instagram.com/swarni_chouhan20?igsh=eHhlMDg4Z2h1bDl4&utm_source=qr", linkedin: "https://www.linkedin.com/in/swarni-chouhan-40aa0a31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" }
        ]
      },
      prMarketing: {
        head: {
          name: "Kudrat Verma",
          role: "PR and Marketing Head",
          image: "Images/Team 2024-25/Kudrat_pr_head.jpg",
          instagram: "https://instagram.com/kudrat_verma_?igshid=MjEwN2IyYWYwYw==",
          linkedin: "https://www.linkedin.com/in/kudratverma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
        },
        team: [
          { name: "Nishi Jain", role: "PR and marketing team member", image: "Images/Team 2024-25/Nishi_pr.jpg", instagram: "http://instagram.com/nishiijain._", linkedin: "http://www.linkedin.com/in/nishi-jain-b29124288" },
          { name: "Aryan Sanganti", role: "PR and marketing team member", image: "Images/Team 2024-25/Aryan_pr.jpg", instagram: "https://www.instagram.com/aryan.s_15?igsh=MTRidG40bjZwd3QzNQ==", linkedin: "https://www.linkedin.com/in/aryansanganti?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
          { name: "Govind Mishra", role: "PR and marketing team member", image: "Images/Team 2024-25/Govind_pr.jpg", instagram: "https://www.instagram.com/govindmishra.2083?igsh=eDJsam45dHU3OW83&utm_source=qr", linkedin: "#" }
        ]
      },
      socialMedia: {
        head: {
          name: "Tanish Shetty",
          role: "Social Media Head",
          image: "Images/Team 2024-25/Tanish_sm_head.jpg",
          instagram: "https://www.instagram.com/tanish_shetty33?igsh=MTBvZjFhejR4czNmOQ==",
          linkedin: "http://www.linkedin.com/in/tanish-shetty-92b2832a9"
        },
        team: [
          { name: "Anushri Bhaskarwar", role: "Social media team member", image: "Images/Team 2024-25/Anushri_sm.jpg", instagram: "https://www.instagram.com/anushriii.b?igsh=MW5zaG92a2d3bHo2cg%3D%3D&utm_source=qr", linkedin: "http://linkedin.com/in/anushri-bhaskarwar-b3780a312" },
          { name: "Ayush More", role: "Social media team member", image: "Images/Team 2024-25/Ayush_sm.jpg", instagram: "https://www.instagram.com/_ayushhmore_/", linkedin: "https://www.linkedin.com/in/ayush-more-875172294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
        ]
      },
      studentAdvisors: [
        { name: "Varad Brid", role: "Former Chairperson", image: "Images/Team 2022-23/Varad Brid_Event head.jpg", instagram: "https://instagram.com/varad.brid?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==", linkedin: "https://www.linkedin.com/in/varad-brid" },
        { name: "Presha Monga", role: "Former Vice-Chairperson", image: "Images/Team 2024-25/Presha_former_vcp.jpg", instagram: "https://www.instagram.com/its_preshaaaa/", linkedin: "https://www.linkedin.com/in/presha-monga-8415a5250/" }
      ]
    },
    '2023-24': {
     
  facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    {name: "Varad Brid",role: "Chairperson",image: "Images/Team 2022-23/Varad Brid_Event head.jpg",instagram: "https://instagram.com/varad.brid?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",linkedin: "https://www.linkedin.com/in/varad-brid"},
    {name: "Presha Monga",role: "Vice-Chairperson",image: "Images/Team 2022-23/Presha Monga_PR Team.PNG",instagram: "https://www.instagram.com/its_preshaaaa/",linkedin: "https://www.linkedin.com/in/presha-monga-8415a5250/"},
    {name: "Rahul Luthra",role: "Treasurer",image: "Images/Team 2023-24/rahul.jpeg",instagram: "https://instagram.com/rahul__luthra?igshid=OGQ5ZDc2ODk2ZA==",linkedin: "https://www.linkedin.com/in/rahulsinghluthra"
    }
  ],
  operations: {
    head: {
      name: "Anshul Singh",
      role: "Operations Head",
      image: "Images/Team 2023-24/anshul singh op head.jpg",
      instagram: "https://instagram.com/_.anshul._03?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",
      linkedin: "#"
    },
    team: [
      {name: "Aryan Shenoy",role: "Operations Team Member",image: "Images/Team 2023-24/aryan shenoy operation team.jpg",instagram: "https://instagram.com/shenoyaryann?igshid=MzRlODBiNWFlZA==",linkedin: "#"},
      {name: "Kshitij Dumbre",role: "Operations Team Member",image: "Images/Team 2023-24/kshitij dambre web and tech team.jpeg",instagram: "https://instagram.com/k.x.itij?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D",linkedin: "https://www.linkedin.com/in/kshitij-dumbre-329367288"},
      {name: "Akshat Yadav",role: "Operations Team Member",image: "Images/Team 2023-24/Akshat yadav operation team.jpg",instagram: "https://instagram.com/akkkshat07?igshid=MzRlODBiNWFlZA==",linkedin: "https://www.linkedin.com/in/akkkshat07/"
      }
    ]
  },
  webTech: {
    head: {
      name: "Shashank Bhanushali",
      role: "Web & Tech Head",
      image: "Images/Team 2023-24/shashank bhanushali web and tech head .jpg",
      instagram: "#",
      linkedin: "https://www.linkedin.com/in/shashankbhanushali/"
    },
    team: [
      {name: "Bhavana Sharma",role: "Web & Tech Team Member",image: "Images/Team 2023-24/Bhavna.jpeg",instagram: "https://instagram.com/_bhavana._.sharma_?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D",linkedin: "https://www.linkedin.com/in/engg-bhavana-sharma"},
      {name: "Kaushal Bhadra",role: "Web & Tech Team Member",image: "Images/Team 2023-24/kaushal bhadra web and tech team .jpeg",instagram: "https://www.instagram.com/kaushal.bhadra/",linkedin: "https://www.linkedin.com/in/kaushal-b-5a8890254/"},
      {name: "Mahek Thakkar",role: "Web & Tech Team Member",image: "Images/Team 2023-24/Mahek Thakkar web and tech team.jpg",instagram: "https://instagram.com/mahek_thakkar06?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D",linkedin: "https://www.linkedin.com/in/mahek-thakkar-729b91287"}
    ]
  },
  prMarketing: {
    head: {
      name: "Umang Panchal",
      role: "PR & Marketing Head",
      image: "Images/Team 2023-24/Umang Panchal PR head.jpeg",
      instagram: "https://instagram.com/umang___panchal___?utm_source=qr&igshid=ZDc4ODBmNjlmNQ==",
      linkedin: "https://www.linkedin.com/in/umang-panchal-586882276"
    },
    team: [
      {name: "Krisha Kapadia",role: "PR & Marketing Team Member",image: "Images/Team 2023-24/krisha kapadia pr team.jpeg",instagram: "https://instagram.com/krisha_2204_?igshid=ZmZhODViOGI=",linkedin: "https://www.linkedin.com/in/krishakapadia/"},
      {name: "Piyush Lalwani",role: "PR & Marketing Team Member",image: "Images/Team 2023-24/piyush lalwani pr team.jpeg",instagram: "https://www.instagram.com/piyussshh_09/?next=%2F",linkedin: "https://www.linkedin.com/in/piyush-lalwani-42a86625a/"},
      {name: "Vaishnavi Jadhav",role: "PR & Marketing Team Member",image: "Images/Team 2023-24/vaishnavi jadhav pr team.jpeg",instagram: "https://instagram.com/vaishnavijdv?igshid=MmIzYWVlNDQ5Yg==",linkedin: "https://www.linkedin.com/in/vaishnavi-jadhav-ab6991258"}
    ]
  },
  socialMedia: {
    head: {
      name: "Siddharth Patel",
      role: "Social Media Head",
      image: "Images/Team 2023-24/siddharth.jpeg",
      instagram: "https://instagram.com/_siddharth_2504?igshid=OGQ5ZDc2ODk2ZA==",
      linkedin: "https://www.linkedin.com/in/siddharth-patel-51579327a"
    },
    team: [
      {name: "Ritul Kulkarni",role: "Social Media Team Member",image: "Images/Team 2023-24/ritul kulkarni social media head.jpeg",instagram: "https://www.instagram.com/ritul_2603_/",linkedin: "https://www.linkedin.com/in/ritul-kulkarni-15123a256/"},
      {name: "Varun Harikrishnan",role: "Social Media Team Member",image: "Images/Team 2023-24/varun harikrishnan social media team.jpeg",instagram: "https://www.instagram.com/hari_varun__2003/",linkedin: "https://www.linkedin.com/in/varun-harikrishnan-a3445a27b/"},
      {name: "Anubhav Kharkar",role: "Social Media Team Member",image: "Images/Team 2023-24/anubhav kharkar social media head.jpg",instagram: "https://www.instagram.com/anubhavkharkar.30/?hl=en",linkedin: "https://www.linkedin.com/in/anubhav-kharkar-49664b1a9/"}
    ]
  },
  studentAdvisors: [
    {name: "Rajvardhan Patil",role: "Former Chairperson",image: "Images/Team 2022-23/Rajvardhan_ViceChairperson.jpeg",instagram: "https://www.instagram.com/rajvardhan.19/",linkedin: "https://www.linkedin.com/in/rajvardhan-patil-23a331231/"},
    {name: "Khushi Choudhary",role: "Former Vice-Chairperson",image: "Images/Team 2022-23/KhushiChoudhary_Treasurer.jpg",instagram: "https://www.instagram.com/_khushi27_/",linkedin: "https://www.linkedin.com/in/khushi-choudhary-735088217/"}
  ]
    },
    '2022-23': {
  facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Rajvardhan Patil", role: "Chairperson", image: "Images/Team 2022-23/Rajvardhan_ViceChairperson.jpeg", instagram: "https://www.instagram.com/rajvardhan.19/", linkedin: "https://www.linkedin.com/in/rajvardhan-patil-23a331231/" },
    { name: "Khushi Choudhary", role: "Vice-Chairperson", image: "Images/Team 2022-23/KhushiChoudhary_Treasurer.jpg", instagram: "https://www.instagram.com/_khushi27_/", linkedin: "https://www.linkedin.com/in/khushi-choudhary-735088217/" }
  ],

  webTech: {
    head: { name: "Raj Agarwal", role: "Web Admin", image: "Images/Team 2022-23/Raj Agrawal_Web Admin.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/raj-agrawal02/" },
    team: [
      { name: "M. Danish Ansari", role: "Tech Team Member", image: "Images/Team 2022-23/Mohammed Danish Ansari_TechTeam.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/mohammed-danish-ansari-4076311a4/" },
      { name: "Siddhesh Sanghavi", role: "Tech Team Member", image: "Images/Team 2022-23/Siddhesh Sanghavi_tech team.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/siddhesh-sanghavi-a44a47222/" },
      { name: "Kaustubh Karkhanis", role: "Web Team Member", image: "Images/Team 2022-23/Kaustubh_Karkhanis_Web team.jpg", instagram: "https://www.instagram.com/_kaustubh.karkhanis_/", linkedin: "https://www.linkedin.com/in/kaustubh-karkhanis/" }
    ]
  },
  prMarketing: {
    team: [
      { name: "Presha Monga", role: "PR Team Member", image: "Images/Team 2022-23/Presha Monga_PR Team.PNG", instagram: "https://www.instagram.com/its_preshaaaa/", linkedin: "https://www.linkedin.com/in/presha-monga-8415a5250/" },
      { name: "Mrudula Sawant", role: "PR Team Member", image: "Images/Team 2022-23/Mrudula_sawant_PR_team.jpg", instagram: "https://www.instagram.com/mrudula_x/", linkedin: "https://www.linkedin.com/in/mrudula-sawant-7b560a224/" }
    ]
  },
  creative: {
    head: { name: "Manasi Kothawade", role: "Creative Head", image: "Images/Team 2022-23/ManasiKothawade_CreativeHead.jpg", instagram: "https://www.instagram.com/manasi24_/", linkedin: "https://www.linkedin.com/in/manasi-kothawade-80a33b22b/" },
    team: [
      { name: "Lalithameena", role: "Creative Team Member", image: "Images/Team 2022-23/Lalithameena _creativeteam.jpg", instagram: "https://www.instagram.com/lalitha.s.lalitha/", linkedin: "https://www.linkedin.com/in/lalithameena-sekar-a76612239/" },
      { name: "Hetvi Shah", role: "Creative Team Member", image: "Images/Team 2022-23/IMG_3390.PNG", instagram: "#", linkedin: "https://www.linkedin.com/in/hetvi-shah-130264211/" }
    ]
  },
  events: {
    head: { name: "Varad Brid", role: "Event Head", image: "Images/Team 2022-23/Varad Brid_Event head.jpg", instagram: "https://www.instagram.com/varad.brid/", linkedin: "https://www.linkedin.com/in/varad-brid/" },
    team: [
      { name: "Aditya Sahu", role: "Event Team Member", image: "Images/Team 2022-23/Aditya Sahu_ Event Team_.jpg", instagram: "https://www.instagram.com/adityasahu925/", linkedin: "#" },
      { name: "Kaivalya Lotankar", role: "Event Team Member", image: "Images/Team 2022-23/Kaivalya Lotankar_EventTeam.jpg", instagram: "https://www.instagram.com/kaivalya_lotankar_/", linkedin: "https://www.linkedin.com/in/kaivalya-lotankar-4640aa1ab/" },
      { name: "Shashank Bhanushali", role: "Event Team Member", image: "Images/Team 2022-23/Shashank_Event Team.JPG", instagram: "#", linkedin: "https://www.linkedin.com/in/shashankbhanushali/" }
    ]
  },
  literary: {
    head: { name: "Kritika Singh", role: "Literary Head", image: "Images/Team 2022-23/KirtikaSingh_LiteraryHead.jpg", instagram: "#", linkedin: "#" },
    team: [
      { name: "Animesh Ghosh", role: "Literary Team Member", image: "Images/Team 2022-23/Animesh_Lit_team.jpg", instagram: "https://www.instagram.com/animeshg09/", linkedin: "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADNRYRYBfdij8g2mPClN-8x9Ll-ic6elfTw&keywords=animesh%20ghosh&origin=RICH_QUERY_SUGGESTION&position=0&searchId=8721ef88-9067-4603-909a-21222ca1c82e&sid=YIh" }
    ]
  },
  studentAdvisors: [
    { name: "Rishabh Shah", role: "Former Chairperson", image: "Images/Team 2022-23/RishabhShah_Chairperson.jpeg", instagram: "https://www.instagram.com/_.rish.abh_/", linkedin: "https://www.linkedin.com/in/rishabhvshah/" },
    { name: "Sharan N", role: "Former Vice-Chairperson", image: "Images/Team 2022-23/Sharan_Vice-Chairperson.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/sharan-nair-943b311b3/" },
    { name: "Neha Rane", role: "Former Treasurer", image: "Images/Team 2022-23/Neha Rane _ Treasurer _ Secretary.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/neha-rane-397591218/" }
  ]

    },
    '2021-22': {
  facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Rishabh Shah", role: "Chairperson", image: "Images/Team 2021-22/RishabhShah_Chairperson.jpeg", instagram: "https://www.instagram.com/_.rish.abh_", linkedin: "https://www.linkedin.com/in/rishabhvshah/" },
    { name: "Sharan Nair", role: "Vice-Chairperson", image: "Images/Team 2021-22/Sharan_Vice-Chairperson.jpg", instagram: "https://www.instagram.com/sharan7154/", linkedin: "https://www.linkedin.com/in/sharan-nair-943b311b3/" },
    { name: "Neha Rane", role: "Treasurer & Secretary", image: "Images/Team 2021-22/Neha Rane _ Treasurer _ Secretary.jpg", instagram: "https://www.instagram.com/nehharane", linkedin: "https://www.linkedin.com/in/neha-rane-397591218" }
  ],
  events: {
    head: {
      name: "Avyay Tandon",
      role: "Event Head",
      image: "Images/Team 2021-22/Avyay Tandon_Event Head.jpeg",
      instagram: "https://www.instagram.com/avii.t",
      linkedin: "http://linkedin.com/in/avyay-tandon-a6a487219"
    },
    team: [
      { name: "Anant Shah", role: "Event Team member", image: "Images/Team 2021-22/Anant Shah_Event Team.jpeg", instagram: "https://www.instagram.com/_shah.anant_", linkedin: "http://www.linkedin.com/in/aushah02" },
      { name: "Vedant Kelkar", role: "Event Team member", image: "Images/Team 2021-22/Vedant Kelkar_Event Team.jpg", instagram: "https://www.instagram.com/vedant.k_19/", linkedin: "https://www.linkedin.com/in/vedant-kelkar-a78219192/" },
      { name: "Suhani Agarwal", role: "Event Team member", image: "Images/Team 2021-22/Suhani Agarwal_EventTeam.jpeg", instagram: "https://www.instagram.com/suhani_0330", linkedin: "https://www.linkedin.cn/in/suhani-agarwal-850599218" }
    ]
  },
  tech: {
    head: {
      name: "Arpita Saxena",
      role: "Tech Head",
      image: "Images/Team 2021-22/ArpitaSaxena_TechnicalHead.jpeg",
      instagram: "https://www.instagram.com/as.arpitasaxena",
      linkedin: "https://www.linkedin.com/in/arpita-saxena-1a0710212/"
    },
    team: [
      { name: "R. Vishal", role: "Tech Team member", image: "Images/Team 2021-22/R.Vishal_Tech Team.jpeg", instagram: "https://www.instagram.com/vishalr_22/", linkedin: "https://www.linkedin.com/in/vishal-ramanathan-683332192/" },
      { name: "Trisha Ghosh", role: "Tech Team member", image: "Images/Team 2021-22/Trisha Ghosh_Tech Team.jpg", instagram: "https://www.instagram.com/_trisha_ghosh/", linkedin: "https://www.linkedin.com/in/trisha-ghosh-347ab8205/" },
      { name: "Ashmita Kaloo", role: "Tech Team member", image: "Images/Team 2021-22/Ashmitakaloo_techteam.jpg", instagram: "https://www.instagram.com/ashmita_kaloo", linkedin: "https://www.linkedin.com/in/ashmita-kaloo-3bb98920b" }
    ]
  },
  prMarketing: {
    head: {
      name: "Parth Sangoi",
      role: "PR Head",
      image: "Images/Team 2021-22/Parth Sangoi_PR Head.jpg",
      instagram: "https://www.instagram.com/parth.sangoi/",
      linkedin: "https://www.linkedin.com/in/parth-sangoi-44bbb21b1/"
    },
    team: [
      { name: "Khushi Choudhary", role: "PR Team member", image: "Images/Team 2021-22/Khushi Choudhary_PR Team.jpg", instagram: "https://www.instagram.com/_khushi27_", linkedin: "https://www.linkedin.com/in/khushi-choudhary-735088217" },
      { name: "Neha Easwaran", role: "PR Team member", image: "Images/Team 2021-22/Neha Easwaran_PR Team.jpg", instagram: "https://www.instagram.com/nehaaa.e/", linkedin: "http://www.linkedin.com/in/neha-easwaran" }
    ]
  },
  creative: {
    head: {
      name: "Hetvi Shah",
      role: "Creative Head",
      image: "Images/Team 2021-22/Hetvi Shah_Creative Head.jpg",
      instagram: "https://www.instagram.com/hetviii___",
      linkedin: "https://www.linkedin.com/in/hetvi-shah-130264211/"
    },
    team: [
      { name: "Pranav Kalambe", role: "Creative Team member", image: "Images/Team 2021-22/Pranav Kalambe_CreativeTeam.png", instagram: "https://www.instagram.com/pranavv.pk", linkedin: "https://www.linkedin.com/in/pranavkalambe/" },
      { name: "Ishika Bhatt", role: "Creative Team member", image: "Images/Team 2021-22/Ishika Bhatt_Creative team.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/ishika-bhatt-0954561b3/" }
    ]
  },
  literary: {
    head: {
      name: "Smit Agwankar",
      role: "Literary Head",
      image: "Images/Team 2021-22/Smit Agwankar_Literary Head.jpg",
      instagram: "#",
      linkedin: "https://www.linkedin.com/in/smit-agwankar-a801341b3"
    },
    team: [
      { name: "Dhanshree Chavan", role: "Literary Team member", image: "Images/Team 2021-22/Dhanshree Chavan_Literary team.jpg", instagram: "https://www.instagram.com/dhanshree276", linkedin: "https://www.linkedin.com/in/dhanshree-chavan-302804193/" }
    ]
  },
  web: {
    head: {
      name: "Hersh Vitekar",
      role: "Web Admin",
      image: "Images/Team 2021-22/Hersh Vitekar_Web Admin.jpg",
      instagram: "https://www.instagram.com/hershvitekar",
      linkedin: "https://www.linkedin.com/in/hersh-vitekar-aa9479a3"
    },
    team: [
      { name: "Khushbu Parmar", role: "Web Team member", image: "Images/Team 2021-22/Khushbu Parmar_Web Team.jpg", instagram: "https://instagram.com/khushbu._25?utm_medium=copy_link", linkedin: "https://www.linkedin.com/in/khushbu-parmar-aa76281b3/" }
    ]
  },
  studentAdvisors: [
    { name: "Shibani Pradhan", role: "Former Chairperson", image: "Images/Team 2020-21/Shibani Pradhan_ Chairperson.jpeg", instagram: "https://www.instagram.com/shibanipradhan_/?hl=en", linkedin: "https://www.linkedin.com/in/shibani-pradhan-222932193?originalSubdomain=in" },
    { name: "Ishan Shinde", role: "Former Vice-Chairperson", image: "Images/Team 2020-21/Ishan_VCP.jpg", instagram: "http://instagram.com/ishaaaan01", linkedin: "http://www.linkedin.com/in/ishanshinde-0101" },
    { name: "Viral Kanada", role: "Former Treasurer", image: "Images/Team 2020-21/viral_treasurer.jpg", instagram: "https://www.instagram.com/the_victoriouss", linkedin: "https://www.linkedin.com/in/viral-kanada-3a1169171" }
  ]
    },
    '2020-21': {
     facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Shibani Pradhan", role: "Chairperson", image: "Images/Team 2020-21/Shibani Pradhan_ Chairperson.jpeg", instagram: "https://www.instagram.com/shibanipradhan_/?hl=en", linkedin: "https://www.linkedin.com/in/shibani-pradhan-222932193?originalSubdomain=in" },
    { name: "Ishan Shinde", role: "Vice-Chairperson", image: "Images/Team 2020-21/Ishan_VCP.jpg", instagram: "https://www.instagram.com/ishaaaan_01/", linkedin: "http://www.linkedin.com/in/ishanshinde-0101" },
    { name: "Viral Kanada", role: "Treasurer", image: "Images/Team 2020-21/viral_treasurer.jpg", instagram: "https://www.instagram.com/the_victoriouss", linkedin: "https://www.linkedin.com/in/viral-kanada-3a1169171" }
  ],
  events: {
    head: {
      name: "Atharva Mehta",
      role: "Event Head",
      image: "Images/Team 2020-21/Atharva_Mehta - Event Head.jpg",
      instagram: "https://www.instagram.com/invites/contact/?i=x4p658p6u4v9&utm_content=1evuh3x",
      linkedin: "http://linkedin.com/in/atharva-mehta-1a14371b3"
    },
    team: [
      { name: "Keyur Kulkarni", role: "Event Team member", image: "Images/Team 2020-21/Keyur_EventTeam.jpg", instagram: "https://www.instagram.com/grimnir_of_midgard?r=nametag", linkedin: "https://www.linkedin.com/in/keyur-kulkarni-b975b61a3" },
      { name: "Himani Dave", role: "Event Team member", image: "Images/Team 2020-21/Himani_Dave_Event_Team.png", instagram: "#", linkedin: "https://www.linkedin.com/in/himani-dave-06a994199" },
      { name: "Swadit Chandan", role: "Event Team member", image: "Images/Team 2020-21/Swadit Chandan_Event Team.jpg", instagram: "https://www.instagram.com/shinchan_nohara2610/", linkedin: "https://www.linkedin.com/in/swadit-chandan-384247111?originalSubdomain=in" }
    ]
  },
  tech: {
    head: {
      name: "Dhrumil Patel",
      role: "Tech Head",
      image: "Images/Team 2020-21/Dhrumil Patel_Technical head.jpg",
      instagram: "https://www.instagram.com/dhrumilpatel1989/",
      linkedin: "https://www.linkedin.com/in/dhrumil-patel-02b92a1b2/"
    },
    team: [
      { name: "Jangala Keerthana", role: "Tech Team member", image: "Images/Team 2020-21/jangala sai keerthana_tech team.png", instagram: "https://www.instagram.com/keetuu29/", linkedin: "https://www.linkedin.com/in/jangala-sai-keerthana-2110311b3" },
      { name: "Rishabh Shah", role: "Tech Team member", image: "Images/Team 2020-21/RishabhShah_TechTeam.jpeg", instagram: "https://www.instagram.com/_.rish.abh_/", linkedin: "https://www.linkedin.com/in/rishabh-shah-2a77451b3" },
      { name: "Jyoti Patel", role: "Tech Team member", image: "Images/Team 2020-21/Jyoti Patel_Tech Team.jpg", instagram: "https://www.instagram.com/_jyopatel", linkedin: "https://www.linkedin.com/in/jyoti-patel-52943b1b3" }
    ]
  },
  prMarketing: {
    head: {
      name: "Asra Masrat",
      role: "PR Head",
      image: "Images/Team 2020-21/Asra_PRHead.jpg",
      instagram: "https://www.instagram.com/manshaaaaaa_/",
      linkedin: "http://www.linkedin.com/in/asramasrat"
    },
    team: [
      { name: "Nikshita Shetty", role: "PR Team member", image: "Images/Team 2020-21/Nikshita_Public Relation Team.jpg", instagram: "https://www.instagram.com/nikshita.s/", linkedin: "https://www.linkedin.com/in/nikshita-shetty-241320192" },
      { name: "Jas Mehta", role: "PR Team member", image: "Images/Team 2020-21/Jas mehta_PR team.jpg", instagram: "https://instagram.com/jasss_mehta?r=nametag", linkedin: "http://linkedin.com/in/jas-mehta-b530291b3" },
      { name: "Hiral Lineshwala", role: "PR Team member", image: "Images/Team 2020-21/Hiral Lineswala_PR team.jpg", instagram: "https://instagram.com/hiral_lineswala?igshid=igpxpak7h939", linkedin: "https://www.linkedin.com/in/hiral-lineswala-9797821a4" }
    ]
  },
  creative: {
    head: {
      name: "Pranav Kalambe",
      role: "Creative Head",
      image: "Images/Team 2020-21/Pranav_CreativeHead.png",
      instagram: "http://instagram.com",
      linkedin: "http://linkedin.com"
    },
    team: [
      { name: "Vedatma K", role: "Creative Team member", image: "Images/Team 2020-21/Vedatma_CreativeTeam.jpg", instagram: "https://www.instagram.com/vedatma_k/", linkedin: "https://www.linkedin.com/in/vedatma-kriti-b8547616b/" },
      { name: "Ishika Bhatt", role: "Creative Team member", image: "Images/Team 2020-21/Ishika Bhatt_Creative team.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/ishika-bhatt-0954561b3/" },
      { name: "Ashish Khare", role: "Creative Team member", image: "Images/Team 2020-21/ashish_khare_creative_team.jpg", instagram: "https://www.instagram.com/_.ashish._7/", linkedin: "https://www.linkedin.com/in/ashish-khare-2412ak2000/" }
    ]
  },
  literary: {
    head: {
      name: "Shinjini Bhattacharya",
      role: "Literary Head",
      image: "Images/Team 2020-21/Shinjini_Literary Head.jpg",
      instagram: "#",
      linkedin: "https://www.linkedin.com/in/shinjini-bhattacharya-7424381b3"
    },
    team: [
      { name: "Sharan Nair", role: "Literary Team member", image: "Images/Team 2020-21/Sharan_Literary team.jpg", instagram: "https://www.instagram.com/sharan7154?r=nametag", linkedin: "https://www.linkedin.com/in/sharan-nair-943b311b3" }
    ]
  },
  web: {
    head: {
      name: "Vidhi Sejpal",
      role: "Web Admin",
      image: "Images/Team 2020-21/Vidhi_Web-Admin.jpg",
      instagram: "https://www.instagram.com/vidhi_sejpal/",
      linkedin: "https://www.linkedin.com/in/vidhi-sejpal-ba0b11186/"
    },
    team: [
      { name: "Arya Karambelkar", role: "Web Team member", image: "Images/Team 2020-21/Arya_WebTeam.jpg", instagram: "https://www.instagram.com/arya___1909/", linkedin: "http://www.linkedin.com/in/arya-karambelkar" }
    ]
  },
  studentAdvisors: [
    { name: "Virjaa Gada", role: "Former Chairperson", image: "Images/Team 2019-20/Virjaa_Gada_CP.jpeg", instagram: "https://www.instagram.com/virjaa_gada/?hl=en", linkedin: "https://www.linkedin.com/in/virjaa-gada-06816b171" },
    { name: "Vishal Panchal", role: "Former Vice-Chairperson", image: "Images/Team 2020-21/Vishal_studentAdvisor.jpg", instagram: "https://www.instagram.com/vishal__panchal_/", linkedin: "https://www.linkedin.com/in/vishal-panchal-1a5401148/" },
    { name: "Fenil Chheda", role: "Former Treasurer", image: "Images/Team 2020-21/Fenil_Chheda_studentAdvisor .png", instagram: "https://instagram.com/f_nilchheda?igshid=843xvvqkx3uu", linkedin: "https://www.linkedin.com/in/fenil-chheda-b36068172" }
  ]
},
    '2019-20': {
     
  facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Virjaa Gada", role: "Chairperson", image: "Images/Team 2019-20/Virjaa_Gada_CP.jpeg", instagram: "https://www.instagram.com/virjaa_gada/?hl=en", linkedin: "https://www.linkedin.com/in/virjaa-gada-06816b171" },
    { name: "Vishal Panchal", role: "Vice-Chairperson", image: "Images/Team 2019-20/Vishal_Panchal_vcp.jpg", instagram: "https://www.instagram.com/vishal__panchal_/", linkedin: "https://www.linkedin.com/in/vishal-panchal-1a5401148/" },
    { name: "Fenil Chedda", role: "Treasurer and Secretary", image: "Images/Team 2019-20/Fenil_chheda_TandS.png", instagram: "https://instagram.com/f_nilchheda?igshid=843xvvqkx3uu", linkedin: "https://www.linkedin.com/in/fenil-chheda-b36068172" },
    { name: "Jinal Notaria", role: "Logistic Head", image: "Images/Team 2019-20/Jinal_Notaria_LH.jpg", instagram: "https://www.instagram.com/jinalnotaria08/", linkedin: "https://www.linkedin.com/in/jinal-notaria-8a362516a" }
  ],
  events: {
    head: { name: "Maitri Desai", role: "Event Head", image: "Images/Team 2019-20/Maitri_Desai_EH.jpg", instagram: "#", linkedin: "#" },
    team: [
      { name: "Bhaskar Ajmera", role: "Event Team Member", image: "Images/Team 2019-20/Bhaskar_ajmera_jeh.jpg", instagram: "https://www.instagram.com/_stayhungry__/", linkedin: "https://www.linkedin.com/in/bhaskar-ajmera-60835815b/" },
      { name: "Divya Raul", role: "Event Team Member", image: "Images/Team 2019-20/Divya_Raul_jeh.jpg", instagram: "https://www.instagram.com/raul_divya/", linkedin: "#" }
    ]
  },
  tech: {
    head: { name: "Neha Shethia", role: "Tech Head", image: "Images/Team 2019-20/Neha_Shethia_TH.jpg", instagram: "https://www.instagram.com/invites/contact/?i=1sqccanzfnxar&utm_content=2nxara2", linkedin: "https://www.linkedin.com/in/neha-shethia-72987a18b" },
    team: [
      { name: "Karan Shah", role: "Tech Team Member", image: "Images/Team 2019-20/Karan_Shah_JTH.jpg", instagram: "https://www.instagram.com/karanshah1910/", linkedin: "https://www.linkedin.com/in/karan-shah-a8ab6016b/" },
      { name: "Sankalp Jain", role: "Tech Team Member", image: "Images/Team 2019-20/Sankalp_jain_jth.jpg", instagram: "https://instagram.com/sankalp.jain.39982?igshid=90yhegx3e6na", linkedin: "https://www.linkedin.com/in/sankalp-jain-610803193" },
    ]
  },
  prMarketing: {
    head: { name: "Labdhi Jain", role: "PR Head", image: "Images/Team 2019-20/Labdhi_Jain_PRH.jpg", instagram: "https://www.instagram.com/labdhijain_25", linkedin: "https://www.linkedin.com/in/labdhi-jain-375792168" },
    team: [
      { name: "Darshit Thakkar", role: "PR Team Member", image: "Images/Team 2019-20/Darshit_Thakkar_pr.jpg", instagram: "https://instagram.com/darshitt_38?igshid=ogu2492c0ern", linkedin: "https://www.linkedin.com/in/darshit-thakkar-59a660193" },
      { name: "Viral Kanada", role: "PR Team Member", image: "Images/Team 2019-20/Viral_Kanada_Jt_PRH.jpg", instagram: "https://www.instagram.com/the_victoriouss", linkedin: "https://www.linkedin.com/in/viral-kanada-3a1169171" }
    ]
  },
  creative: {
    head: { name: "Kunj Gala", role: "Creative Head", image: "Images/Team 2019-20/Kunj_gala_CH.jpg", instagram: "https://www.instagram.com/galakunj/", linkedin: "https://www.linkedin.com/in/kunj-gala-7368aa193" },
    team: [
      { name: "Mitali Potnis", role: "Creative Team Member", image: "Images/Team 2019-20/Mitali_Potnis_JtC.jpg", instagram: "https://www.instagram.com/mitali__p", linkedin: "https://www.linkedin.com/in/mitali-potnis-b34821193" },
      { name: "Shahid Shah", role: "Creative Team Member", image: "Images/Team 2019-20/Shahid_shah_jtc.jpg", instagram: "https://www.instagram.com/shahidshah775/", linkedin: "http://linkedin.com/in/shahid-shah-b63bb6168" }
    ]
  },

  web: {
    head: {  name: "Niraj Panchal", role: "Web Admin", image: "Images/Team 2019-20/Niraj_panchal_WA.jpg", instagram: "#", linkedin: "#" },
  },
  studentAdvisors: [
    { name: "Sachin Gala", role: "Student Advisor", image: "Images/Team 2019-20/Sachin.png", instagram: "https://www.instagram.com/galasachin97/?hl=en", linkedin: "https://www.linkedin.com/in/sachin-gala-77224b26/" },
    { name: "Nitin Panchal", role: "Student Advisor", image: "Images/Team 2019-20/Nitin.png", instagram: "#", linkedin: "#" },
    { name: "Sai Karthik", role: "Student Advisor", image: "Images/Team 2019-20/Sai.png", instagram: "https://www.instagram.com/sai.karthik/?hl=en", linkedin: "https://www.linkedin.com/in/sai-karthik-nandigama-37890b16a" }
  ]
    },
    '2018-19': {
     facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Sachin Gala", role: "Chairperson", image: "Images/Team 2019-20/Sachin.png", instagram: "https://www.instagram.com/galasachin97/?hl=en", linkedin: "https://www.linkedin.com/in/sachin-gala-77224b26/" },
    { name: "Priti Pandey", role: "Vice-Chairperson", image: "Images/Team 2018-19/Priti.png", instagram: "https://www.instagram.com/_ii.unicorn.ii_/?hl=en", linkedin: "https://www.linkedin.com/in/priti-p-0a6a59127/" },
    { name: "N Sai Kartik", role: "Treasurer and Secretary", image: "Images/Team 2019-20/Sai.png", instagram: "https://www.instagram.com/sai.karthik/?hl=en", linkedin: "https://www.linkedin.com/in/sai-karthik-nandigama-37890b16a" },
    { name: "Amruta Palan", role: "Logistic Head", image: "Images/Team 2018-19/Amruta.png", instagram: "https://www.instagram.com/amruta_palan/?hl=en", linkedin: "https://www.linkedin.com/in/amruta-palan-3b4a7115b/" }
  ],
  events: {
    head: {
      name: "Mansi Walke",
      role: "Event Head",
      image: "Images/Team 2018-19/Mansi.png",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Nitin Panchal", role: "Event Team member", image: "Images/Team 2019-20/Nitin.png", instagram: "#", linkedin: "#" }
    ]
  },
  tech: {
    head: {
      name: "Shrey Shah",
      role: "Tech Head",
      image: "Images/Team 2018-19/Shrey.png",
      instagram: "#",
      linkedin: "https://www.linkedin.com/in/shrey-shah-9392a816b"
    },
    team: [
      { name: "Sagar Patel", role: "Tech Team member", image: "Images/Team 2018-19/Sagar.png", instagram: "https://www.instagram.com/sagar00021/?hl=en", linkedin: "https://www.linkedin.com/in/sagar-patel-982737159/" },
      { name: "Tushar Gangera", role: "Tech Team member", image: "Images/Team 2018-19/Tushar.png", instagram: "https://www.instagram.com/tushar_gangera/?hl=en", linkedin: "https://www.linkedin.com/in/tushar-gangera-9b4169147/" }
    ]
  },
  prMarketing: {
    head: {
      name: "Gayatri Dixit",
      role: "PR Head",
      image: "Images/Team 2018-19/Gayatri.png",
      instagram: "https://www.instagram.com/gayatri_dixit__/?hl=en",
      linkedin: "#"
    },
    team: [
      { name: "Anchit Singh", role: "PR Team member", image: "Images/Team 2018-19/Anchit.png", instagram: "#", linkedin: "#" },
      { name: "Jinal Notaria", role: "PR Team member", image: "Images/Team 2018-19/Jinal.png", instagram: "#", linkedin: "http://linkedin.com" },
      { name: "Pallavi Khabale", role: "PR Team member", image: "Images/Team 2018-19/Pallavi.png", instagram: "http://instagram.com", linkedin: "http://linkedin.com" },
      { name: "Ruchika Lande", role: "PR Team member", image: "Images/Team 2018-19/Ruchika.png", instagram: "http://instagram.com", linkedin: "http://linkedin.com" }
    ]
  },
  creative: {
    head: {
      name: "Arjun Patel",
      role: "Creative Head",
      image: "Images/Team 2018-19/Arjun.png",
      instagram: "https://www.instagram.com/arjun41298/?hl=en",
      linkedin: "https://www.linkedin.com/in/arjun-patel-b3a2b8148/"
    },
    team: [
      { name: "Prasad Arolkar", role: "Creative Team member", image: "Images/Team 2018-19/Prasad.png", instagram: "#", linkedin: "#" },
      { name: "Vrinda Padrai", role: "Creative Team member", image: "Images/Team 2018-19/Vrinda.png", instagram: "#", linkedin: "#" }
    ]
  },
  web: {
    head: {
      name: "Jeet Gujarathi",
      role: "Web Admin",
      image: "Images/Team 2018-19/Jeet.png",
      instagram: "https://www.instagram.com/?hl=en",
      linkedin: "https://www.linkedin.com/in/jeet-gujarathi-80724b151/"
    },
    team: [
      { name: "Moinuddin Batliwala", role: "Web Team member", image: "Images/Team 2018-19/Moinuddin.png", instagram: "#", linkedin: "#" }
    ]
  },
  studentAdvisors: [
    { name: "Nikhil Shah", role: "Student Advisor", image: "Images/Team 2018-19/Nikhil_SA.png", instagram: "#", linkedin: "https://www.linkedin.com/in/nikhil-shah-10478b86/" },
    { name: "Wasif Shaik", role: "Student Advisor", image: "Images/Team 2018-19/Wasif_SA.png", instagram: "#", linkedin: "https://www.linkedin.com/in/shaikh-mohd-wasif-8120a0125" },
    { name: "Pratyaksh Inani", role: "Student Advisor", image: "Images/Team 2018-19/Pratyaksh_SA.png", instagram: "#", linkedin: "#" }
  ]
    },
    '2017-18': {
     facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Nikhil Shah", role: "Chairperson", image: "Images/Team 2017-18/nikhil.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/nikhil-shah-10478b86/" },
    { name: "Wasif Shaik", role: "Vice-Chairperson", image: "Images/Team 2017-18/wasif.jpg", instagram: "#", linkedin: "https://www.linkedin.com/in/shaikh-mohd-wasif-8120a0125" },
    { name: "Pratyaksh Inani", role: "Treasurer", image: "Images/Team 2017-18/pratyaksh.jpg", instagram: "#", linkedin: "#" }
  ],
  events: {
    head: {
      name: "Shraddha Joshi",
      role: "Event Head",
      image: "Images/Team 2017-18/shraddha.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Sagarika Barde", role: "Joint Event Head", image: "Images/Team 2017-18/sagarika.jpg", instagram: "#", linkedin: "#" },
      { name: "Dhaval Shah", role: "Event Team member", image: "Images/Team 2017-18/dhaval.jpg", instagram: "#", linkedin: "#" },
      { name: "Roshan Jain", role: "Event Team member", image: "Images/Team 2017-18/roshan.jpg", instagram: "#", linkedin: "#" },
      { name: "Vikas Kabadi", role: "Event Team member", image: "Images/Team 2017-18/vikas.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  tech: {
    head: {
      name: "Mayuresh Auti",
      role: "Tech Head",
      image: "Images/Team 2017-18/mayuresh.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Sachin Gala", role: "Joint Tech Head", image: "Images/Team 2017-18/sachin.jpg", instagram: "#", linkedin: "#" },
      { name: "Swapnil More", role: "Tech Team member", image: "Images/Team 2017-18/swapnil.jpeg", instagram: "#", linkedin: "#" }
    ]
  },
  prMarketing: {
    head: {
      name: "Karan Chhadwa",
      role: "PR Head",
      image: "Images/Team 2017-18/karan.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Amruta Palan", role: "PR Team member", image: "Images/Team 2017-18/amruta.jpg", instagram: "#", linkedin: "#" },
      { name: "Riya Saraf", role: "PR Team member", image: "Images/Team 2017-18/riya.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  creative: {
    head: {
      name: "Umed Jadhav",
      role: "Creative Head",
      image: "Images/Team 2017-18/umed.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Bhumika Kalav", role: "Joint Creative Head", image: "Images/Team 2017-18/bhumika.jpg", instagram: "#", linkedin: "#" },
      { name: "Kevin Dharod", role: "Creative Team member", image: "Images/Team 2017-18/kevin.jpg", instagram: "#", linkedin: "#" },
      { name: "Pratiksha Sakpal", role: "Creative Team member", image: "Images/Team 2017-18/pratiksha.jpg", instagram: "#", linkedin: "#" },
      { name: "Rasika Sarang", role: "Creative Team member", image: "Images/Team 2017-18/rasika.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  web: {
    head: {
      name: "Niraj Gujarathi",
      role: "Web Admin",
      image: "Images/Team 2017-18/niraj.jpg",
      instagram: "#",
      linkedin: "https://www.linkedin.com/in/niraj-gujarathi-605a41151"
    },
    team: []
  },
  studentAdvisors: [
    { name: "Nisha Mishra", role: "Student Advisor", image: "Images/Team 2017-18/nisha.JPG", instagram: "#", linkedin: "#" },
    { name: "Rutuja Malani", role: "Student Advisor", image: "Images/Team 2017-18/rutuja.JPG", instagram: "#", linkedin: "#" },
    { name: "Ruchit Makwana", role: "Student Advisor", image: "Images/Team 2017-18/ruchit.JPG", instagram: "#", linkedin: "#" },
    { name: "Trishala Pawar", role: "Student Advisor", image: "Images/Team 2017-18/trishala.JPG", instagram: "#", linkedin: "#" }
  ]
    },
    '2016-17': {
      facultyAdvisors: [
    { name: "Dr. Sushma Kadge", image: "Images/Team 2022-23/Prof.Sushma Kadge.png" },
    { name: "Prof. Abhishek Bhadauria", image: "Images/Team 2019-20/Abhishek_FA.png" }
  ],
  coreTeam: [
    { name: "Nisha Mishra", role: "Chairperson", image: "Images/Team 2016-17/chp.jpg", instagram: "#", linkedin: "#" },
    { name: "Ruchit Makwana", role: "Vice-Chairperson", image: "Images/Team 2016-17/vcp1.jpg", instagram: "#", linkedin: "#" },
    { name: "Rutuja Malani", role: "Vice-Chairperson", image: "Images/Team 2016-17/vcp2.jpg", instagram: "#", linkedin: "#" },
    { name: "Trishala Pawar", role: "Treasurer", image: "Images/Team 2016-17/trr.png", instagram: "#", linkedin: "#" }
  ],
  events: {
    head: {
      name: "Anurag Pandya",
      role: "Event Head",
      image: "Images/Team 2016-17/eh.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Daivat Bhagat", role: "Joint Team Head", image: "Images/Team 2016-17/jeh.jpg", instagram: "#", linkedin: "#" },
      { name: "Viral Parekh", role: "Event Team member", image: "Images/Team 2016-17/et1.jpg", instagram: "#", linkedin: "#" },
      { name: "Nikhil Shah", role: "Event Team member", image: "Images/Team 2016-17/et2.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  tech: {
    head: {
      name: "Abhishek Ghadve",
      role: "Tech Head",
      image: "Images/Team 2016-17/th.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Aarti Nagdev", role: "Joint Tech Team", image: "Images/Team 2016-17/jth1.jpg", instagram: "#", linkedin: "#" },
      { name: "Viral Parekh", role: "Tech Team member", image: "Images/Team 2016-17/tt1.jpg", instagram: "#", linkedin: "#" },
      { name: "Kiran Rone", role: "Tech Team member", image: "Images/Team 2016-17/tt2.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  prMarketing: {
    head: {
      name: "Kiran Jawahirani",
      role: "PR Head",
      image: "Images/Team 2016-17/prh.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Mehul Sanyashiv", role: "Joint PR Head", image: "Images/Team 2016-17/jph.jpg", instagram: "#", linkedin: "#" },
      { name: "Wasif Sheikh", role: "PR Team member", image: "Images/Team 2016-17/pt1.jpg", instagram: "#", linkedin: "#" },
      { name: "Pritesh Surana", role: "PR Team member", image: "Images/Team 2016-17/pt2.jpg", instagram: "#", linkedin: "#" },
      { name: "Niraj Panchal", role: "PR Team member", image: "Images/Team 2016-17/pt3.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  creative: {
    head: {
      name: "Jigar Panchal",
      role: "Creative Head",
      image: "Images/Team 2016-17/cth.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: [
      { name: "Madhumita Ramaswamy", role: "Joint Creative Head", image: "Images/Team 2016-17/jch.jpg", instagram: "#", linkedin: "#" },
      { name: "Harshal Bhole", role: "Creative Team member", image: "Images/Team 2016-17/ct1.jpg", instagram: "#", linkedin: "#" }
    ]
  },
  web: {
    head: {
      name: "Keshin Jani",
      role: "Web Admin",
      image: "Images/Team 2016-17/wb.jpg",
      instagram: "#",
      linkedin: "#"
    },
    team: []
  },
  studentAdvisors: [
    { name: "Pooja Mada", role: "Student Advisor", image: "Images/Team 2016-17/sa1.jpg", instagram: "#", linkedin: "#" },
    { name: "Pratik Malkan", role: "Student Advisor", image: "Images/Team 2016-17/sa2.jpg", instagram: "#", linkedin: "#" },
    { name: "Aditya Pawar", role: "Student Advisor", image: "Images/Team 2016-17/sa3.jpg", instagram: "#", linkedin: "#" }
  ]
    }
  };

 

const years = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17'];
const currentYearData = teamData[activeYear] || teamData['2025-26'];

const renderMemberCard = (member, index = 0) => {
  const cardId = `${member.name}-${index}`;
  const isVisible = visibleCards.has(cardId);
  const animationClass = '-translate-x-[100px] opacity-0';
  const delay = `${index * 100}ms`;
  
  return (
  <div
    key={member.name}
    data-card-id={cardId}
    style={{ transitionDelay: isVisible ? delay : '0ms' }}
    className={`bg-slate-900/50 backdrop-blur-sm border border-cyan-800/30 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 hover:-translate-y-2 transition-all duration-700 w-full md:w-80 ${
      isVisible ? 'translate-x-0 opacity-100' : animationClass
    }`}
  >
      
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
       <div className="w-50 h-50 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center border-4 border-cyan-700 overflow-hidden">
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-white">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        {member.role && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyan-800/80 backdrop-blur-sm px-4 py-1 rounded-full border border-cyan-600 whitespace-nowrap">
            <span className="text-cyan-200 text-sm font-medium">{member.role}</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 text-center">{member.name}</h3>
<div className="flex justify-center gap-3 mt-2">
        {member.instagram && member.instagram !== '#' && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon(`${member.name}-instagram`)}
            onMouseLeave={() => setHoveredIcon(null)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              hoveredIcon === `${member.name}-instagram`
                ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white scale-110'
                : 'bg-slate-700/50 text-slate-300'
            }`}
          >
            <Instagram size={18} />
          </a>
        )}
        {member.linkedin && member.linkedin !== '#' && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon(`${member.name}-linkedin`)}
            onMouseLeave={() => setHoveredIcon(null)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              hoveredIcon === `${member.name}-linkedin`
                ? 'bg-blue-600 text-white scale-110'
                : 'bg-slate-700/50 text-slate-300'
            }`}
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
  );
}


return (
  <>
    <style>{styles}</style>
    
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Water effect overlay */}
      <div className="water-overlay">
        <div className="wave-layer" style={{ animationDelay: '0s' }}></div>
        <div className="wave-layer" style={{ animationDelay: '-7s', opacity: 0.5 }}></div>
        <div className="wave-layer" style={{ animationDelay: '-14s', opacity: 0.3 }}></div>
        
        {/* Floating bubbles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* All content wrapper with z-index */}
      <div className="relative z-10">
        {/* <Header /> */}
        
       <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">Our Team</h1>
        <p className="text-slate-300 text-lg italic">
          "Alone we can do so little, together we can do so much."
        </p>
      </div>

      <div className="mb-12 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeYear === year
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-cyan-800/30'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {currentYearData && (currentYearData.coreTeam?.length > 0 || currentYearData.facultyAdvisors?.length > 0) ? (
        <>
          {/* Faculty Advisors */}
          {currentYearData.facultyAdvisors && currentYearData.facultyAdvisors.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Faculty Advisors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {currentYearData.facultyAdvisors.map((advisor) => (
                  <div key={advisor.name} className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-lg bg-slate-800/50 border-2 border-cyan-700 overflow-hidden mb-4">
                      {advisor.image && <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />}
                    </div>
                    <h3 className="text-xl font-bold text-white">{advisor.name}</h3>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Core Team */}
          {currentYearData.coreTeam && currentYearData.coreTeam.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Core Team</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                {currentYearData.coreTeam.map((member, index) => (
                  <div key={member.name} className={`${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                    {renderMemberCard(member)}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Events Team */}
          {currentYearData.events && currentYearData.events.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Events Team</h2>
              {currentYearData.events.team && currentYearData.events.team.length > 0 ? (
                <>
                  <div className="flex justify-center gap-8 mb-8">
                    {renderMemberCard(currentYearData.events.head)}
                  </div>
                  <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                    currentYearData.events.team.length === 1 ? 'max-w-md mx-auto' :
                    currentYearData.events.team.length === 2 ? 'max-w-3xl mx-auto' :
                    currentYearData.events.team.length === 3 ? 'max-w-5xl mx-auto' :
                    currentYearData.events.team.length >= 4 ? 'max-w-full' : ''
                  }`}>
                    {currentYearData.events.team.map((member) => renderMemberCard(member))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.events.head)}
                </div>
              )}
            </>
          )}

          {/* Operations Team */}
          {currentYearData.operations && currentYearData.operations.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Operations Team</h2>
              {currentYearData.operations.team && currentYearData.operations.team.length > 0 ? (
                <>
                  <div className="flex justify-center gap-8 mb-8">
                    {renderMemberCard(currentYearData.operations.head)}
                  </div>
                  {currentYearData.operations.team.length === 4 ? (
                    <>
                      <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                        {currentYearData.operations.team.slice(0, 2).map((member) => renderMemberCard(member))}
                      </div>
                      <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                        {currentYearData.operations.team.slice(2, 4).map((member) => renderMemberCard(member))}
                      </div>
                    </>
                  ) : (
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.operations.team.length === 1 ? 'max-w-md mx-auto' :
                      currentYearData.operations.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.operations.team.length === 3 ? 'max-w-5xl mx-auto' : ''
                    }`}>
                      {currentYearData.operations.team.map((member) => renderMemberCard(member))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.operations.head)}
                </div>
              )}
            </>
          )}

          {/* Web & Tech Team */}
          {currentYearData.webTech && currentYearData.webTech.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Web & Tech Team</h2>
              {currentYearData.webTech.team && currentYearData.webTech.team.length > 0 ? (
                <>
                  <div className="flex justify-center gap-8 mb-8">
                    {renderMemberCard(currentYearData.webTech.head)}
                  </div>
                  {currentYearData.webTech.team.length === 4 ? (
                    <>
                      <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                        {currentYearData.webTech.team.slice(0, 2).map((member) => renderMemberCard(member))}
                      </div>
                      <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                        {currentYearData.webTech.team.slice(2, 4).map((member) => renderMemberCard(member))}
                      </div>
                    </>
                  ) : (
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.webTech.team.length === 1 ? 'max-w-md mx-auto' :
                      currentYearData.webTech.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.webTech.team.length === 3 ? 'max-w-5xl mx-auto' : ''
                    }`}>
                      {currentYearData.webTech.team.map((member) => renderMemberCard(member))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.webTech.head)}
                </div>
              )}
            </>
          )}

          {/* Tech Team */}
          {currentYearData.tech && currentYearData.tech.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Tech Team</h2>
              {currentYearData.tech.team && currentYearData.tech.team.length > 0 ? (
                currentYearData.tech.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.tech.head)}
                    {renderMemberCard(currentYearData.tech.team[0])}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.tech.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.tech.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.tech.team.length === 3 ? 'max-w-5xl mx-auto' :
                      currentYearData.tech.team.length >= 4 ? 'max-w-full' : ''
                    }`}>
                      {currentYearData.tech.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.tech.head)}
                </div>
              )}
            </>
          )}

          {/* PR & Marketing Team */}
          {currentYearData.prMarketing && currentYearData.prMarketing.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">PR & Marketing Team</h2>
              {currentYearData.prMarketing.team && currentYearData.prMarketing.team.length > 0 ? (
                currentYearData.prMarketing.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.prMarketing.head)}
                    {renderMemberCard(currentYearData.prMarketing.team[0])}
                  </div>
                ) : currentYearData.prMarketing.team.length === 4 ? (
                  <>
                    <div className="flex justify-center gap-20 mb-14">
                      {renderMemberCard(currentYearData.prMarketing.head)}
                    </div>
                    <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                      {currentYearData.prMarketing.team.slice(0, 2).map((member) => renderMemberCard(member))}
                    </div>
                    <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                      {currentYearData.prMarketing.team.slice(2, 4).map((member) => renderMemberCard(member))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.prMarketing.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.prMarketing.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.prMarketing.team.length === 3 ? 'max-w-5xl mx-auto' : ''
                    }`}>
                      {currentYearData.prMarketing.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.prMarketing.head)}
                </div>
              )}
            </>
          )}

          {/* Creative Team */}
          {currentYearData.creative && currentYearData.creative.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Creative Team</h2>
              {currentYearData.creative.team && currentYearData.creative.team.length > 0 ? (
                currentYearData.creative.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.creative.head)}
                    {renderMemberCard(currentYearData.creative.team[0])}
                  </div>
                ) : currentYearData.creative.team.length === 4 ? (
                  <>
                    <div className="flex justify-center gap-20 mb-14">
                      {renderMemberCard(currentYearData.creative.head)}
                    </div>
                    <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                      {currentYearData.creative.team.slice(0, 2).map((member) => renderMemberCard(member))}
                    </div>
                    <div className="flex justify-center gap-20 mb-14 max-w-3xl mx-auto">
                      {currentYearData.creative.team.slice(2, 4).map((member) => renderMemberCard(member))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.creative.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.creative.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.creative.team.length === 3 ? 'max-w-5xl mx-auto' : ''
                    }`}>
                      {currentYearData.creative.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.creative.head)}
                </div>
              )}
            </>
          )}

          {/* Literary Team */}
          {currentYearData.literary && currentYearData.literary.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Literary Team</h2>
              {currentYearData.literary.team && currentYearData.literary.team.length > 0 ? (
                currentYearData.literary.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.literary.head)}
                    {renderMemberCard(currentYearData.literary.team[0])}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.literary.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.literary.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.literary.team.length === 3 ? 'max-w-5xl mx-auto' :
                      currentYearData.literary.team.length >= 4 ? 'max-w-full' : ''
                    }`}>
                      {currentYearData.literary.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.literary.head)}
                </div>
              )}
            </>
          )}

          {/* Web Team */}
          {currentYearData.web && currentYearData.web.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Web Team</h2>
              {currentYearData.web.team && currentYearData.web.team.length > 0 ? (
                currentYearData.web.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.web.head)}
                    {renderMemberCard(currentYearData.web.team[0])}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.web.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.web.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.web.team.length === 3 ? 'max-w-5xl mx-auto' :
                      currentYearData.web.team.length >= 4 ? 'max-w-full' : ''
                    }`}>
                      {currentYearData.web.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.web.head)}
                </div>
              )}
            </>
          )}

          {/* Logistics Head */}
          {currentYearData.logistics && currentYearData.logistics.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Logistics</h2>
              <div className="flex justify-center mb-16">
                {renderMemberCard(currentYearData.logistics.head)}
              </div>
            </>
          )}

          {/* Social Media Team */}
          {currentYearData.socialMedia && currentYearData.socialMedia.head && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Social Media Team</h2>
              {currentYearData.socialMedia.team && currentYearData.socialMedia.team.length > 0 ? (
                currentYearData.socialMedia.team.length === 1 ? (
                  <div className="flex justify-center gap-8 mb-16 max-w-3xl mx-auto">
                    {renderMemberCard(currentYearData.socialMedia.head)}
                    {renderMemberCard(currentYearData.socialMedia.team[0])}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-8 mb-8">
                      {renderMemberCard(currentYearData.socialMedia.head)}
                    </div>
                    <div className={`flex flex-wrap justify-center gap-8 mb-16 ${
                      currentYearData.socialMedia.team.length === 2 ? 'max-w-3xl mx-auto' :
                      currentYearData.socialMedia.team.length === 3 ? 'max-w-5xl mx-auto' :
                      currentYearData.socialMedia.team.length === 4 ? 'max-w-7xl mx-auto' : ''
                    }`}>
                      {currentYearData.socialMedia.team.map((member) => renderMemberCard(member))}
                    </div>
                  </>
                )
              ) : (
                <div className="flex justify-center gap-8 mb-16">
                  {renderMemberCard(currentYearData.socialMedia.head)}
                </div>
              )}
            </>
          )}

          {/* Student Advisors */}
          {currentYearData.studentAdvisors && currentYearData.studentAdvisors.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Student Advisors</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                {currentYearData.studentAdvisors.map((advisor, index) => (
                  <div key={advisor.name} className={`${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                    {renderMemberCard(advisor)}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-400 text-xl">
            Data for {activeYear} is not available yet. Please check back later.
          </p>
        </div>
      )}
    </div>

     <Footer />
      </div>
      {/* Close relative z-10 wrapper */}
    </div>
    {/* Close min-h-screen div */}
  </>
  
    );

// function Header() {
//   return (
//     <header className="bg-slate-950/50 backdrop-blur-md py-4 border-b border-cyan-800/30 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 flex items-center">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
//             <span>ISTE</span>
//           </div>
//           <h1 className="text-lg font-semibold text-cyan-400">ISTE</h1>
//         </div>
//       </div>
//     </header>
//   );
// }

function Footer() {

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const createBubble = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setBubbles(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 1000);
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: '#60A5FA',url:'https://www.facebook.com/counciliste/?ref=br_rs' },
    { icon: Instagram, name: 'Instagram', color: '#F472B6',url:'https://www.instagram.com/istekjsse/?hl=en' },
    { icon: Mail, name: 'Email', color: '#22D3EE',url:'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=iste.engg@somaiya.edu' }
  ];

  return (
    <footer className="relative text-gray-300 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a1929, #020817)' }}>
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-300 rounded-full top-1/3 right-1/3 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full bottom-1/3 left-1/2 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-2/3 right-1/4 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
      </div>

    
      

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-60 pointer-events-none"
          style={{
            left: bubble.x,
            top: bubble.y,
            animation: 'rise 1s ease-out forwards'
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
         {/* Left Section - Logo Only */}
<div className="space-y-6">
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
      <img 
        src="https://istekjsce.com/New-Website/Images/logo.png" 
        alt="Logo" 
        className="w-full h-full rounded-full"
      />
    </div>
    <h3 className="text-2xl font-bold text-white">ISTE KJSSE</h3>
  </div>
</div>


          {/* Middle Section - Contact Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-sm">K. J. Somaiya School of Engineering, VidyaVihar</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Tanish Shetty : +91 77000 48974</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Aditi Kanagala: +91 98204 93896</span>
            </div>
             <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Manav Parekh : +91 99876 46965</span>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex flex-col items-center space-y-4 text-center md:items-center">
            <h4 className="text-xl font-bold text-white">Follow Us</h4>
            <div className="flex justify-center space-x-4">
             {socialLinks.map(({ icon: Icon, name, color, url }) => (
  <a
    key={name}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => setHoveredIcon(name)}
    onMouseLeave={() => setHoveredIcon(null)}
    onClick={createBubble}
    className="relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
    style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      boxShadow: hoveredIcon === name ? `0 0 25px ${color}, 0 0 50px ${color}40` : '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}
  >
    {/* Water fill effect with gradient */}
    <div 
      className="absolute inset-0 rounded-full transition-all ease-out"
      style={{
        background: `linear-gradient(to top, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`,
        transform: hoveredIcon === name ? 'translateY(0%)' : 'translateY(100%)',
        transitionDuration: '800ms'
      }}
    />

    {hoveredIcon === name && (
      <>
        <div 
          className="absolute inset-x-0 rounded-full"
          style={{
            bottom: '45%',
            height: '30px',
            background: 'rgba(255, 255, 255, 0.15)',
            animation: 'wave 1.2s ease-in-out infinite',
            borderRadius: '50%'
          }}
        />
        <div 
          className="absolute inset-x-0 rounded-full"
          style={{
            bottom: '50%',
            height: '25px',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'wave 1.5s ease-in-out infinite',
            animationDelay: '0.3s',
            borderRadius: '50%'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: '30%',
            bottom: '20%',
            animation: 'bubbleRise 2s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-50"
          style={{
            left: '60%',
            bottom: '15%',
            animation: 'bubbleRise 2.5s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        />
      </>
    )}

    <Icon 
      size={22} 
      className="relative z-10 transition-all duration-300"
      style={{
        color: hoveredIcon === name ? 'white' : '#9CA3AF',
        filter: hoveredIcon === name ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
      }}
    />
    {hoveredIcon === name && (
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 px-3 py-1 rounded whitespace-nowrap z-20 border border-cyan-500">
        {name}
      </span>
    )}
  </a>
))}

            </div>
          </div>
        </div>

        {/* Bottom Section - Designer Credit */}
        <div className="relative pt-6 border-t border-gray-800">
          <div className="text-center text-sm">
            Designed by <span className="text-blue-500 font-semibold hover:text-cyan-400 transition-colors duration-300">ISTE KJSSE</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          25% {
            transform: translateY(-4px) scaleX(1.05);
          }
          50% {
            transform: translateY(-2px) scaleX(0.95);
          }
          75% {
            transform: translateY(-5px) scaleX(1.02);
          }
        }
        
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-30px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation, 0deg));
          }
        }
      `}</style>
    </footer>
  );
}}