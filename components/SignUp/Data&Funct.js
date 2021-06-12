export const sideScroll = (element, speed, distance, step) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};

export const showMore = (
  visibleProfileCount,
  setVisibleSignUp,
  setVisibleProfileCount
) => {
  if (visibleProfileCount === 21) {
    setVisibleSignUp(true);
  }
  setVisibleProfileCount((prevValue) =>
    prevValue < 21 ? prevValue + 7 : prevValue
  );
};

export const handleClose = (setShowSignUp) => {
  setShowSignUp(false);
};

export const replaceUnderScore = (str) => {
  return str.replace(/_/g, " ");
};

// Converting height in INCHES
export const convertedHeight = (heightInInch) => {
  const heightInFeet = Math.floor(heightInInch / 12).toString();
  const heightRemainInches = heightInInch % 12;
  return `${heightInFeet}' ${heightRemainInches}"`;
};

export const gender = ["Male", "female"];

export const religion = [
  "HINDU",
  "JAIN_DASH_DIGAMBER",
  "JAIN_DASH_SHWETAMBER",
  "MUSLIM_DASH_SHIA",
  "MUSLIM_DASH_SUNNI",
  "CHRISTIAN",
  "SIKH",
];

export const maritalStatus = [
  "NEVER_MARRIED",
  "DIVORCED",
  "WIDOWED",
  "ANULLED",
  "AWAITING_DIVORCE",
];

export const annualIncome = [
  "NO_INCOME", // 1
  "UPTO_FIFTY_THOUSAND", // Up to 50K
  "FIFTY_THOUSAND_TO_ONE_LAKH", // 50K - 1L
  "ONE_LAKH_TO_TWO_LAKH", // 1L - 2L
  "TWO_LAKH_TO_FIVE_LAKH", //5,  2L - 5L
  "FIVE_LAKH_TO_TEN_LAKH", // 5L - 10L
  "TEN_LAKH_TO_TWENTY_LAKH", // 10L - 20L
  "TWENTY_LAKH_TO_THIRTY_FIVE_LAKH", // 20L - 35L
  "THIRTY_FIVE_LAKH_TO_FIFTY_LAKH", // 35L - 50L
  "FIFTY_LAKH_TO_SEVENTY_FIVE_LAKH", //10,  50L - 75L
  "SEVENTY_FIVE_LAKH_TO_ONE_CRORE", // 75L = 1CR
  "ONE_CRORE_TO_FIVE_CRORE", // 1CR - 5CR
  "FIVE_CRORE_TO_TEN_CRORE", // 5CR - 10CR
  "MORE_THAN_TEN_CRORE", //14, more than 10CR
];

export const Language = [
  "ASSAMESE", // 1
  "AWADHI",
  "BENGALI",
  "BHOJPURI",
  "BODO", // 5
  "DOGRI",
  "ENGLISH",
  "GARHWALI",
  "GUJARATI",
  "HARYANAVI",
  "HIMACHALI",
  "HINDI", // 12
  "KANNADA",
  "KASHMIRI",
  "KONKANI",
  "MAITHILI",
  "MALAYALAM",
  "MARATHI", // 18
  "MARWARI",
  "MEITEI",
  "NEPALI",
  "ODIA",
  "PUNJABI",
  "RAJASTHANI",
  "SANSKRIT", // 25
  "SANTALI",
  "SIKKIMESE",
  "SINDHI",
  "TAMIL",
  "TELUGU", // 30
  "URDU",
  "GERMAN",
  "SPANISH",
  "FRENCH",
  "MANDARIN", // 35
  "RUSSIAN",
  "JAPANESE",
  "PORTUGUESE",
  "OTHER", // 38
];

export const Occupation = [
  "Admin_Professional",
  "Clerk",
  "Operator_or_Technician",
  "Secretary_or_Front_Office",
  "Actor_or_Model",
  "Advertising_Professional",
  "Film_or_Entertainment_Professional",
  "Journalist",
  "Media_Professional",
  "PR_Professional",
  "Agriculture_Professional",
  "Farming",
  "Airline_Professional",
  "Flight_Attendant",
  "Pilot",
  "Architect",
  "Air_Force",
  "Army",
  "Other_Defence_Services",
  "Navy",
  "BPO_or_ITeS_Professional",
  "Customer_Service",
  "Accounting_Professional",
  "Auditor",
  "Banking_Professional",
  "Chartered_Accountant",
  "Finance_Professional",
  "Civil_Services",
  "Analyst",
  "Consultant",
  "Corporate_Communication",
  "Corporate_Planning",
  "HR_Professional",
  "Marketing_Professional",
  "Operations_Management",
  "Product_Manager",
  "Program_Manager",
  "Project_Manager_dash_IT",
  "Project_Manager_dash_Non_IT",
  "Sales_Professional",
  "Sr_Manager_or_Manager",
  "Subject_Matter_Expert",
  "Education_Professional",
  "Educational_Institution_Owner",
  "Librarian",
  "Professor_or_Lecturer",
  "Research_Professional",
  "Research_Assistant",
  "PhD_Student_On_Stipend",
  "Scientist",
  "Teacher",
  "Electronics_Engineer",
  "Hardware_or_Telecom_Engineer",
  "Non_dash_IT_Engineer",
  "Quality_Assurance_Engineer",
  "Hotels_or_Hospitality_Professional",
  "Law_Enforcement_Officer",
  "Police",
  "Lawyer_And_Legal_Professional",
  "Mariner",
  "Merchant_Naval_Officer",
  "Dentist",
  "Doctor",
  "Surgeon",
  "Medical_or_Healthcare_Professional",
  "Nurse",
  "Paramedic",
  "Pharmacist",
  "Physiotherapist",
  "Psychologist",
  "Veterinary_Doctor",
  "Animator",
  "Cyber_or_Network_Security",
  "Project_Lead_dash_IT",
  "Quality_Assurance_Engineer_dash_IT",
  "Software_Professional",
  "UI_or_UX_Designer",
  "Web_or_Graphic_Designer",
  "CXO_or_Chairman_or_President_or_Director",
  "VP_or_AVP_or_GM_or_DGM",
  "Agent",
  "Artist",
  "Beautician",
  "Broker",
  "Business_Owner_or_Entrepreneur",
  "Fashion_Designer",
  "Fitness_Professional",
  "Interior_Designer",
  "Politician",
  "Security_Professional",
  "Singer",
  "Social_Services_or_NGO_or_Volunteer",
  "Sportsperson",
  "Travel_Professional",
  "Writer",
  "Looking_For_Job",
  "Not_Working",
  "Retired",
  "Student",
  "Others",
];
