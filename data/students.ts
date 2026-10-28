export interface Student {
    id: string;
    name: string;
    studentId: string;
    department: string;
    bio: string;
    skills: string[];
    avatarUrl: string;
}

export const STUDENTS: Student[] = [
    {
        id: "1",
        name: "Rakib Rahman",
        studentId: "22-12345-1",
        department: "Computer Science",
        bio: "Passionate about mobile development and building tools that make everyday life easier.",
        skills: ["React Native", "TypeScript", "Node.js"],
        avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "2",
        name: "Ayesha Rahman",
        studentId: "22-67890-2",
        department: "Computer Science",
        bio: "Interested in AI and full-stack web development.",
        skills: ["Python", "Machine Learning", "React"],
        avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: "3",
        name: "Tariq Hassan",
        studentId: "22-11111-3",
        department: "Software Engineering",
        bio: "Backend enthusiast with a love for system design and databases.",
        skills: ["Java", "Spring Boot", "PostgreSQL"],
        avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
        id: "4",
        name: "Nusrat Jahan",
        studentId: "22-22222-4",
        department: "Computer Science",
        bio: "UI/UX focused developer who loves turning wireframes into polished products.",
        skills: ["Figma", "React", "CSS"],
        avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "5",
        name: "Rafiq Islam",
        studentId: "22-33333-5",
        department: "Software Engineering",
        bio: "Competitive programmer who enjoys algorithmic challenges.",
        skills: ["C++", "Algorithms", "Python"],
        avatarUrl: "https://i.pravatar.cc/150?img=8",
    },
    {
        id: "6",
        name: "Sumaiya Akter",
        studentId: "22-44444-6",
        department: "Computer Science",
        bio: "Interested in cloud computing and DevOps practices.",
        skills: ["AWS", "Docker", "Linux"],
        avatarUrl: "https://i.pravatar.cc/150?img=9",
    },
	{
        id: "7",
        name: "Kamal Hossain",
        studentId: "22-55555-7",
        department: "Software Engineering",
        bio: "Full-stack developer with a passion for creating scalable applications.",
        skills: ["JavaScript", "React", "Node.js"],
        avatarUrl: "https://i.pravatar.cc/150?img=10",
    },
	{
		id: "8",
		name: "Farhana Sultana",
		studentId: "22-66666-8",
		department: "Computer Science",
		bio: "Data scientist with a love for extracting insights from complex datasets.",
		skills: ["Python", "R", "Machine Learning"],
		avatarUrl: "https://i.pravatar.cc/150?img=11",
	},
	{
		id: "9",
		name: "Jahid Hasan",
		studentId: "22-77777-9",
		department: "Software Engineering",
		bio: "Mobile app developer who enjoys creating intuitive user experiences.",
		skills: ["Flutter", "Dart", "Firebase"],
		avatarUrl: "https://i.pravatar.cc/150?img=12",
	},
	{
		id: "10",
		name: "Shamima Akter",
		studentId: "22-88888-10",
		department: "Computer Science",
		bio: "Cybersecurity enthusiast with a focus on ethical hacking and penetration testing.",
		skills: ["Kali Linux", "Wireshark", "Python"],
		avatarUrl: "https://i.pravatar.cc/150?img=13",
	},
];
export interface Student {
  id: string;
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}
 

