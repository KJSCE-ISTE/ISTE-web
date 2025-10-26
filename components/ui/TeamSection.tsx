'use client'

import React, { useState } from 'react';
import { Linkedin, Instagram, X } from 'lucide-react';

const TeamSection = () => {
  const [activeYear, setActiveYear] = useState('2025-26');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);


    const teamData: Record<string, any> = {
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
          { name: "Aarohi Paranjape", role: "Operations team member", image: "Images/Team 2025-26/Aarohi_OPS.jpg", instagram: "https://www.instagram.com/aarohhhii_?igsh=MXNqd3N5MDNhbjVqbw%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/in/aarohi-paranjape-a41529330/" }
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

  const renderHexagon = (member: any, size: 'small' | 'medium' | 'large' = 'medium') => {
   const sizes = {
  // Much smaller on mobile, normal on desktop
  small: 'w-28 h-32 sm:w-36 sm:h-40 md:w-52 md:h-56',
  medium: 'w-32 h-36 sm:w-40 sm:h-44 md:w-60 md:h-64',
  large: 'w-36 h-40 sm:w-44 sm:h-48 md:w-72 md:h-76'
};

    return (
      <div 
        className="hexagon-container group cursor-pointer" 
        style={{ perspective: '1000px' }}
        onClick={() => setSelectedMember(member)}
      >
        <div className={`hexagon ${sizes[size]} relative transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2`}>
          {/* Hexagon shape with clip-path */}
         <div 
  className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 border-2 md:border-4 border-blue-400 group-hover:border-blue-600 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
  style={{
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  }}
>
            {/* Image */}
            <div className="absolute inset-2 overflow-hidden" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}>
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>

           {/* Name label - always visible, wraps to 2 lines for long names */}
<div 
  className={`absolute inset-x-0 bg-gradient-to-t from-blue-900/95 to-transparent flex items-end justify-center ${
    member.name.length > 18 ? 'bottom-0 pb-2 pt-12 md:pt-14' : 'bottom-3 md:bottom-4 pb-2 md:pb-3 pt-6 md:pt-8'
  }`}
  style={{
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  }}
>
  <p 
    className={`text-white font-bold text-center drop-shadow-lg px-1 md:px-2 ${
      member.name.length > 18 ? 'text-[9px] sm:text-[10px] md:text-xs' : 'text-[9px] sm:text-[10px] md:text-sm'
    }`}
    style={{
      width: member.name.length > 18 
        ? (size === 'large' ? '100px' : size === 'medium' ? '90px' : '75px')
        : 'auto',
      lineHeight: member.name.length > 18 ? '1.2' : '1.1'
    }}
  >
    {member.name}
  </p>
</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamSection = (title: string, teamData: any) => {
    if (!teamData || !teamData.head) return null;

    return (
      <div className="mb-16 md:mb-24 relative">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-8 md:mb-12">{title}</h3>
        <div className="flex flex-col items-center">
          {/* Container for head and team */}
          <div className="relative flex flex-col items-center">
            {/* Head at top */}
            <div className="relative z-10 mb-6 md:mb-8">
              {renderHexagon(teamData.head, 'medium')}
            </div>
            
      {teamData.team && teamData.team.length > 0 && (
  <div className="relative mt-4 w-full">
    {/* Desktop SVG ONLY - Lines visible only on md and above */}
    <svg 
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none animated-lines hidden md:block"
      style={{ 
        width: teamData.team.length === 4 ? '800px' : teamData.team.length >= 5 ? '1000px' : '700px',
        height: teamData.team.length === 4 ? '450px' : teamData.team.length >= 5 ? '500px' : '180px',
        top: '-100px',
        zIndex: 5
      }}
    >
      {teamData.team.map((member: any, idx: number) => {
        let x2 = 0, y2 = 0;
        const centerX = teamData.team.length === 4 ? 400 : teamData.team.length >= 5 ? 500 : 350;
        
        if (teamData.team.length === 1) {
          x2 = centerX;
          y2 = 180;
        } else if (teamData.team.length === 2) {
          x2 = idx === 0 ? centerX - 180 : centerX + 180;
          y2 = 180;
        } else if (teamData.team.length === 3) {
          x2 = idx === 0 ? centerX - 300 : idx === 1 ? centerX : centerX + 300;
          y2 = 180;
        } else if (teamData.team.length === 4) {
          if (idx < 2) {
            x2 = idx === 0 ? centerX - 280 : centerX + 280;
            y2 = 180;
          } else {
            x2 = idx === 2 ? centerX - 280 : centerX + 280;
            y2 = 440;
          }
        } else {
          if (idx < 3) {
            x2 = idx === 0 ? centerX - 300 : idx === 1 ? centerX : centerX + 300;
            y2 = 180;
          } else {
            const remaining = teamData.team.length - 3;
            const secondRowIdx = idx - 3;
            x2 = centerX + ((secondRowIdx - (remaining - 1) / 2) * 280);
            y2 = 480;
          }
        }
        
        return (
          <g key={idx}>
            <line
              x1={centerX}
              y1="0"
              x2={x2}
              y2={y2}
              stroke="rgba(96, 165, 250, 0.5)"
              strokeWidth="3"
              strokeDasharray="8,4"
              className="connection-line"
            />
            <circle
              cx={x2}
              cy={y2}
              r="6"
              fill="rgb(96, 165, 250)"
              className="connection-dot"
            />
          </g>
        );
      })}
    </svg>

    {/* Team member layout - No changes needed */}
    
    {/* Desktop SVG - Original calculations */}
    <svg 
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none animated-lines hidden md:block"
      style={{ 
        width: teamData.team.length === 4 ? '800px' : teamData.team.length >= 5 ? '1000px' : '700px',
        height: teamData.team.length === 4 ? '450px' : teamData.team.length >= 5 ? '500px' : '180px',
        top: '-100px',
        zIndex: 5
      }}
    >
      {teamData.team.map((member: any, idx: number) => {
        let x2 = 0, y2 = 0;
        const centerX = teamData.team.length === 4 ? 400 : teamData.team.length >= 5 ? 500 : 350;
        
        if (teamData.team.length === 1) {
          x2 = centerX;
          y2 = 180;
        } else if (teamData.team.length === 2) {
          x2 = idx === 0 ? centerX - 180 : centerX + 180;
          y2 = 180;
        } else if (teamData.team.length === 3) {
          // Desktop: 3 in a row
          x2 = idx === 0 ? centerX - 300 : idx === 1 ? centerX : centerX + 300;
          y2 = 180;
        } else if (teamData.team.length === 4) {
          // Zigzag: row 1 (0,1), row 2 (2,3)
          if (idx < 2) {
            x2 = idx === 0 ? centerX - 280 : centerX + 280;
            y2 = 180;
          } else {
            x2 = idx === 2 ? centerX - 280 : centerX + 280;
            y2 = 440;
          }
        } else {
          // 5+: first 3 in row 1, rest in row 2
          if (idx < 3) {
            x2 = idx === 0 ? centerX - 300 : idx === 1 ? centerX : centerX + 300;
            y2 = 180;
          } else {
            const remaining = teamData.team.length - 3;
            const secondRowIdx = idx - 3;
            x2 = centerX + ((secondRowIdx - (remaining - 1) / 2) * 280);
            y2 = 480;
          }
        }
        
        return (
          <g key={idx}>
            <line
              x1={centerX}
              y1="0"
              x2={x2}
              y2={y2}
              stroke="rgba(96, 165, 250, 0.5)"
              strokeWidth="3"
              strokeDasharray="8,4"
              className="connection-line"
            />
            <circle
              cx={x2}
              cy={y2}
              r="6"
              fill="rgb(96, 165, 250)"
              className="connection-dot"
            />
          </g>
        );
      })}
    </svg>

                {/* Team members layout - Responsive */}
<div className="relative z-10">
  {teamData.team.length === 1 ? (
    <div className="flex justify-center">
      {renderHexagon(teamData.team[0], 'small')}
    </div>
 ) : teamData.team.length === 2 ? (
  <div className="grid grid-cols-2 gap-8 md:gap-20 justify-items-center">
    {teamData.team.map((member: any, idx: number) => (
      <div key={idx}>{renderHexagon(member, 'small')}</div>
    ))}
  </div>
  ) : teamData.team.length === 3 ? (
  <>
    {/* Desktop: All 3 in one row */}
    <div className="hidden md:flex md:flex-row justify-center gap-20">
      {teamData.team.map((member: any, idx: number) => (
        <div key={idx} className="mx-4">{renderHexagon(member, 'small')}</div>
      ))}
    </div>
    {/* Mobile: 2 on top, 1 centered below */}
    <div className="flex flex-col gap-8 items-center md:hidden">
  <div className="grid grid-cols-2 gap-8 justify-items-center">
    <div>{renderHexagon(teamData.team[0], 'small')}</div>
    <div>{renderHexagon(teamData.team[1], 'small')}</div>
  </div>
  <div className="flex justify-center">
    <div>{renderHexagon(teamData.team[2], 'small')}</div>
  </div>
</div>
  </>
) : teamData.team.length === 4 ? (
  <div className="flex flex-col gap-8 md:gap-8 items-center">
    {/* First row: 2 members */}
    <div className="grid grid-cols-2 gap-8 md:gap-96 justify-items-center">
      <div>{renderHexagon(teamData.team[0], 'small')}</div>
      <div>{renderHexagon(teamData.team[1], 'small')}</div>
    </div>
    {/* Second row: 2 members */}
    <div className="grid grid-cols-2 gap-8 md:gap-96 justify-items-center">
      <div>{renderHexagon(teamData.team[2], 'small')}</div>
      <div>{renderHexagon(teamData.team[3], 'small')}</div>
    </div>
  </div>) : (
  <div className="flex flex-col gap-8 md:gap-8">
    <div className="grid grid-cols-2 gap-8 md:gap-20 justify-items-center">
      {teamData.team.slice(0, 3).map((member: any, idx: number) => (
        <div key={idx}>{renderHexagon(member, 'small')}</div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-8 md:gap-20 justify-items-center mt-0 md:mt-16">
      {teamData.team.slice(3).map((member: any, idx: number) => (
        <div key={idx}>{renderHexagon(member, 'small')}</div>
      ))}
    </div>
  </div>
  )}
</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hexagon-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes line-stretch {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: 10;
          }
        }

        @keyframes modal-fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hexagon-container {
          animation: hexagon-float 3s ease-in-out infinite;
        }

        .hexagon-container:nth-child(2n) {
          animation-delay: 0.5s;
        }

        .hexagon-container:nth-child(3n) {
          animation-delay: 1s;
        }

        .animated-lines .connection-line {
          animation: line-stretch 3s ease-in-out infinite;
        }

        .animated-lines .connection-dot {
          animation: hexagon-float 3s ease-in-out infinite;
        }

        .modal-content {
          animation: modal-fade-in 0.3s ease-out;
        }
      ` }} />

      <section 
        id="team" 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden"
      >
        <div className="max-w-7xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-neutral-600 text-base md:text-lg italic">
              "Building the future, one hexagon at a time"
            </p>
          </div>

          {/* Year Selector - Responsive */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full font-semibold transition-all duration-300 ${
                  activeYear === year
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105'
                    : 'bg-white/60 text-neutral-700 hover:bg-white/80 border border-neutral-300'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

{/* Faculty Advisors - Responsive */}
{currentYearData.facultyAdvisors && currentYearData.facultyAdvisors.length > 0 && (
  <div className="mb-16 md:mb-24">
    <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-8 md:mb-12">Faculty Advisors</h3>
    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-4 md:gap-20 flex-wrap">
      {currentYearData.facultyAdvisors.map((member: any, idx: number) => <div key={idx} className="mx-auto md:mx-4">{renderHexagon(member, 'medium')}</div>)}
    </div>
  </div>
)}

{/* Core Team - Responsive */}
{currentYearData.coreTeam && currentYearData.coreTeam.length > 0 && (
  <div className="mb-16 md:mb-24">
    <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-8 md:mb-12">Core Team</h3>
    {currentYearData.coreTeam.length === 3 ? (
      <>
        {/* Desktop: All 3 in one row */}
        <div className="hidden md:flex md:flex-row justify-center gap-20">
          {currentYearData.coreTeam.map((member: any, idx: number) => (
            <div key={idx} className="mx-4">{renderHexagon(member, 'medium')}</div>
          ))}
        </div>
        {/* Mobile: 2 on top, 1 centered below */}
        <div className="flex flex-col gap-6 items-center md:hidden">
          <div className="grid grid-cols-2 gap-6 justify-items-center">
            {currentYearData.coreTeam.slice(0, 2).map((member: any, idx: number) => (
              <div key={idx}>{renderHexagon(member, 'medium')}</div>
            ))}
          </div>
          <div className="flex justify-center">
            <div>{renderHexagon(currentYearData.coreTeam[2], 'medium')}</div>
          </div>
        </div>
      </>
    ) : (
      <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-6 md:gap-20 flex-wrap">
        {currentYearData.coreTeam.map((member: any, idx: number) => (
          <div key={idx} className="mx-auto md:mx-4">{renderHexagon(member, 'medium')}</div>
        ))}
      </div>
    )}
  </div>
)}
          {/* All other teams using renderTeamSection */}
          {renderTeamSection("Operations Team", currentYearData.operations)}
          {renderTeamSection("Events Team", currentYearData.events)}
          {renderTeamSection("Logistics Team", currentYearData.logistics)}
          {renderTeamSection("Web & Tech Team", currentYearData.webTech)}
          {renderTeamSection("Web Team", currentYearData.web)}
          {renderTeamSection("Tech Team", currentYearData.tech)}
          {renderTeamSection("PR & Marketing Team", currentYearData.prMarketing)}
          {renderTeamSection("Social Media Team", currentYearData.socialMedia)}
          {renderTeamSection("Creative Team", currentYearData.creative)}
{/* Student Advisors - Responsive */}
{currentYearData.studentAdvisors && currentYearData.studentAdvisors.length > 0 && (
  <div className="mb-8 md:mb-12">
    <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-8 md:mb-12">Student Advisors</h3>
    {currentYearData.studentAdvisors.length === 3 ? (
      <>
        {/* Desktop: All 3 in one row */}
        <div className="hidden md:flex md:flex-row justify-center gap-20">
          {currentYearData.studentAdvisors.map((member: any, idx: number) => (
            <div key={idx} className="mx-4">{renderHexagon(member, 'medium')}</div>
          ))}
        </div>
        {/* Mobile: 2 on top, 1 centered below */}
        <div className="flex flex-col gap-6 items-center md:hidden">
          <div className="grid grid-cols-2 gap-6 justify-items-center">
            {currentYearData.studentAdvisors.slice(0, 2).map((member: any, idx: number) => (
              <div key={idx}>{renderHexagon(member, 'medium')}</div>
            ))}
          </div>
          <div className="flex justify-center">
            <div>{renderHexagon(currentYearData.studentAdvisors[2], 'medium')}</div>
          </div>
        </div>
      </>
    ) : (
      <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-6 md:gap-20 flex-wrap">
        {currentYearData.studentAdvisors.map((member: any, idx: number) => (
          <div key={idx} className="mx-auto md:mx-4">{renderHexagon(member, 'medium')}</div>
        ))}
      </div>
    )}
  </div>
)}
        </div>
      </section>

      {/* Modal Popup - Responsive */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="modal-content bg-white rounded-3xl p-6 md:p-8 max-w-sm md:max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X size={20} className="text-neutral-600 md:w-6 md:h-6" />
            </button>

            <div className="flex flex-col items-center">
              {/* Large photo */}
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-blue-500 shadow-2xl mb-4 md:mb-6">
                {selectedMember.image ? (
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-4xl md:text-6xl">
                    {selectedMember.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name and role */}
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2 text-center">
                {selectedMember.name}
              </h3>
              <p className="text-blue-600 font-semibold text-base md:text-lg mb-4 md:mb-6 text-center">
                {selectedMember.role}
              </p>

              {/* Social links */}
              <div className="flex gap-3 md:gap-4">
                {selectedMember.instagram && selectedMember.instagram !== '#' && (
                  <a
                    href={selectedMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 md:p-4 bg-gradient-to-br from-pink-500 via-pink-600 to-orange-500 text-white rounded-2xl hover:scale-110 hover:shadow-2xl transition-all shadow-lg"
                  >
                    <Instagram size={24} className="md:w-7 md:h-7" />
                  </a>
                )}
                {selectedMember.linkedin && selectedMember.linkedin !== '#' && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 md:p-4 bg-blue-600 text-white rounded-2xl hover:scale-110 transition-transform shadow-lg"
                  >
                    <Linkedin size={24} className="md:w-7 md:h-7" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamSection;