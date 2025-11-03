import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const internshipsData = [
  {
    title: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    description: "Work on building scalable web applications using MERN stack. You'll collaborate with senior developers to create features for our SaaS platform.",
    tags: ["web-development", "full-stack", "remote"],
    techStack: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    location: "Remote",
    stipend: "₹15,000/month",
    duration: "3-6 months",
    applyLink: "https://example.com/apply/1"
  },
  {
    title: "Frontend Developer Intern",
    company: "DesignHub",
    description: "Create beautiful and responsive user interfaces using React and Tailwind CSS. Work closely with designers to implement pixel-perfect designs.",
    tags: ["frontend", "ui-ux", "remote"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Redux", "JavaScript"],
    location: "Bangalore",
    stipend: "₹12,000/month",
    duration: "3 months",
    applyLink: "https://example.com/apply/2"
  },
  {
    title: "Backend Developer Intern",
    company: "DataFlow Inc",
    description: "Build robust APIs and microservices using Node.js and PostgreSQL. Learn about system design and scalable architecture.",
    tags: ["backend", "api", "database"],
    techStack: ["Node.js", "PostgreSQL", "Express", "Docker", "JavaScript"],
    location: "Hyderabad",
    stipend: "₹18,000/month",
    duration: "6 months",
    applyLink: "https://example.com/apply/3"
  },
  {
    title: "Machine Learning Intern",
    company: "AI Innovations",
    description: "Work on cutting-edge ML projects involving NLP and computer vision. Implement and train models using TensorFlow and PyTorch.",
    tags: ["machine-learning", "ai", "research"],
    techStack: ["Python", "TensorFlow", "PyTorch", "NumPy", "Pandas"],
    location: "Remote",
    stipend: "₹20,000/month",
    duration: "6 months",
    applyLink: "https://example.com/apply/4"
  },
  {
    title: "DevOps Intern",
    company: "CloudScale",
    description: "Learn about CI/CD pipelines, containerization, and cloud infrastructure. Work with AWS, Docker, and Kubernetes.",
    tags: ["devops", "cloud", "infrastructure"],
    techStack: ["Docker", "Kubernetes", "AWS", "Jenkins", "Linux"],
    location: "Pune",
    stipend: "₹16,000/month",
    duration: "4 months",
    applyLink: "https://example.com/apply/5"
  },
  {
    title: "Mobile App Developer Intern",
    company: "AppMakers",
    description: "Develop cross-platform mobile applications using React Native. Build features for our e-commerce mobile app.",
    tags: ["mobile", "react-native", "cross-platform"],
    techStack: ["React Native", "JavaScript", "Redux", "Firebase"],
    location: "Mumbai",
    stipend: "₹14,000/month",
    duration: "3-4 months",
    applyLink: "https://example.com/apply/6"
  },
  {
    title: "Data Science Intern",
    company: "Analytics Pro",
    description: "Analyze large datasets and create data visualizations. Work on predictive modeling and statistical analysis projects.",
    tags: ["data-science", "analytics", "visualization"],
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "SQL"],
    location: "Delhi",
    stipend: "₹17,000/month",
    duration: "5 months",
    applyLink: "https://example.com/apply/7"
  },
  {
    title: "UI/UX Design Intern",
    company: "Creative Studios",
    description: "Design user interfaces and experiences for web and mobile applications. Create wireframes, prototypes, and design systems.",
    tags: ["design", "ui-ux", "creative"],
    techStack: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
    location: "Bangalore",
    stipend: "₹10,000/month",
    duration: "3 months",
    applyLink: "https://example.com/apply/8"
  },
  {
    title: "Cybersecurity Intern",
    company: "SecureNet",
    description: "Learn about network security, penetration testing, and vulnerability assessment. Work on securing web applications.",
    tags: ["security", "cybersecurity", "networking"],
    techStack: ["Python", "Kali Linux", "Wireshark", "Metasploit"],
    location: "Remote",
    stipend: "₹19,000/month",
    duration: "6 months",
    applyLink: "https://example.com/apply/9"
  },
  {
    title: "Blockchain Developer Intern",
    company: "CryptoTech",
    description: "Develop smart contracts and decentralized applications. Learn about blockchain technology and Web3.",
    tags: ["blockchain", "web3", "smart-contracts"],
    techStack: ["Solidity", "Ethereum", "Web3.js", "JavaScript", "React"],
    location: "Remote",
    stipend: "₹22,000/month",
    duration: "4-6 months",
    applyLink: "https://example.com/apply/10"
  },
  {
    title: "Python Developer Intern",
    company: "AutomateX",
    description: "Build automation scripts and backend services using Python. Work with Django and Flask frameworks.",
    tags: ["python", "backend", "automation"],
    techStack: ["Python", "Django", "Flask", "PostgreSQL", "Redis"],
    location: "Chennai",
    stipend: "₹13,000/month",
    duration: "3 months",
    applyLink: "https://example.com/apply/11"
  },
  {
    title: "Game Development Intern",
    company: "GameForge Studios",
    description: "Create 2D/3D games using Unity or Unreal Engine. Work on game mechanics, physics, and graphics.",
    tags: ["game-development", "unity", "graphics"],
    techStack: ["Unity", "C#", "Unreal Engine", "Blender"],
    location: "Bangalore",
    stipend: "₹15,000/month",
    duration: "4 months",
    applyLink: "https://example.com/apply/12"
  },
  {
    title: "Quality Assurance Intern",
    company: "TestPro",
    description: "Perform manual and automated testing of web applications. Write test cases and identify bugs.",
    tags: ["testing", "qa", "automation"],
    techStack: ["Selenium", "Jest", "Cypress", "JavaScript", "Postman"],
    location: "Noida",
    stipend: "₹11,000/month",
    duration: "3 months",
    applyLink: "https://example.com/apply/13"
  },
  {
    title: "IoT Developer Intern",
    company: "SmartDevices Inc",
    description: "Work on Internet of Things projects involving sensors, microcontrollers, and cloud integration.",
    tags: ["iot", "embedded", "hardware"],
    techStack: ["Arduino", "Raspberry Pi", "Python", "C++", "MQTT"],
    location: "Pune",
    stipend: "₹14,000/month",
    duration: "5 months",
    applyLink: "https://example.com/apply/14"
  },
  {
    title: "Cloud Engineer Intern",
    company: "CloudFirst",
    description: "Learn cloud computing with AWS, Azure, or GCP. Work on deploying and managing cloud infrastructure.",
    tags: ["cloud", "aws", "infrastructure"],
    techStack: ["AWS", "Azure", "Terraform", "Python", "Linux"],
    location: "Remote",
    stipend: "₹18,000/month",
    duration: "6 months",
    applyLink: "https://example.com/apply/15"
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.recommendationLog.deleteMany();
  await prisma.internship.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Seed internships
  for (const internship of internshipsData) {
    await prisma.internship.create({
      data: internship,
    });
  }

  console.log(`✅ Created ${internshipsData.length} internships`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

