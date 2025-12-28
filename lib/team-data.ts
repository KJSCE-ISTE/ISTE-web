import { defaultEasing } from "framer-motion";

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
    }
  };
  

  export default teamData;