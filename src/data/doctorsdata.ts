export interface DoctorDetails {
  url: string;
  name: string;
  qualification: string;
  designation: string;
  subDesignation?: string;
  experience: string;
  description: string;
  mobileNumberDoctor?: string;
  highlights?: string[];
}

export interface DoctorsDataType {
  [department: string]: {
    [doctorName: string]: DoctorDetails;
  };
}
const DoctorsData: DoctorsDataType = {
  Proctology: {
    "Dr. Rajasekhar": {
      url: "/chiragheroimage.png",
      name: "Dr. Rajasekhar M R",
      qualification: "MBBS, MS General Surgeon",
      experience: "30+ years",
      designation: "Chairman, Chief Colorectal Surgeon & Proctologist",
      description:
        "Dr. Rajasekhar is one of Bangalore’s most respected and experienced colorectal surgeons, with over 30+ years of clinical excellence. He is widely known for his expertise in the comprehensive management of colorectal and anorectal conditions, including piles, fissures, fistula, and other bowel disorders.",
      mobileNumberDoctor: "tel:9380498256",
      highlights: [
        "Senior colorectal surgeon with 30+ years of experience",
        "Comprehensive care for complex anorectal conditions",
        "Advanced laser & minimally invasive procedures",
        "Emphasis on accurate diagnosis and faster recovery",
        "Known for reliable, lasting treatment outcomes",
      ],
    },
    "Dr. Shreedevi": {
      url: "/doctorshreedeviimage.png",
      name: "Dr. Shreedevi KN",
      qualification: "MBBS, MS, FSGE",
      experience: "12 years",
      designation: "CEO – Chirag Global Hospitals",
      subDesignation: "Colorectal Surgeon & Surgical Gastroenterologist",
      description:
        "Dr. Shreedevi K N brings a unique combination of technical expertise and compassionate patient care to colorectal surgery. Her approach focuses on accurate diagnosis, minimally invasive treatment options, and faster recovery times. She specializes in advanced laser procedures and is committed to improving patient outcomes while maintaining affordability and accessibility of care.",
      mobileNumberDoctor: "tel:9380498256",
      highlights: [
        "Laser proctology and minimally invasive procedures",
        "Active contributor to next-generation surgical education",
        "Patient-centric care with precision surgical techniques",
        "Complex colorectal and anorectal conditions",
      ],
    },
  },
};
export default DoctorsData;
