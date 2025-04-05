import { useState } from "react";
import ChatBot from "./components/ChatBot";
import { Flow } from "./types/Flow";
import { Params } from "./types/Params";

function App() {
	const [name, setName] = useState("");
	const [career, setCareer] = useState("");
	const [enrollment, setEnrollment] = useState("");
	const [totalCredits, setTotalCredits] = useState(0);

	// Sample courses for a Data Scientist
	const courses = [
		{ name: "Intro to Python", credits: 3, prereq: null },
		{ name: "Data Structures", credits: 4, prereq: "Intro to Python" },
		{ name: "Machine Learning", credits: 3, prereq: "Data Structures" },
	];

	const creditLimit = enrollment === "full-time" ? 9 : 6;

	const flow: Flow = {
		start: {
			message: "Hi! What’s your name?",
			path: "save_name",
		},
		save_name: {
			message: (params: Params) => `Nice to meet you, ${params.userInput}!`,
			function: (params: Params) => setName(params.userInput),
			chatDisabled: true,
			path: "ask_id",
		},
		ask_id: {
			message: "Please enter your 6-digit student ID:",
			isSensitive: true,
			path: (params: Params) =>
				params.userInput.length === 6 ? "ask_enrollment" : "invalid_id",
		},
		invalid_id: {
			message: "Invalid ID. Please enter a 6-digit student ID:",
			path: "ask_id",
		},
		ask_enrollment: {
			message: "Are you a full-time or part-time student?",
			options: ["full-time", "part-time"],
			function: (params: Params) => setEnrollment(params.userInput),
			chatDisabled: true,
			path: "ask_career_goal",
		},
		ask_career_goal: {
			message: "Which career are you aiming for?",
			options: ["Data Scientist", "UX Designer", "Product Manager"],
			function: (params: Params) => setCareer(params.userInput),
			chatDisabled: true,
			path: "show_courses",
		},
		show_courses: {
			message: () => {
				if (career === "Data Scientist") {
					return `Here are recommended courses:\n1. Intro to Python\n2. Data Structures\n3. Machine Learning`;
				}
				return "Courses for this career path are coming soon!";
			},
			path: "select_course",
		},
		select_course: {
			message: "Select a course to add (max 9 credits for full-time / 6 for part-time):",
			options: courses.map((course) => course.name),
			path: async (params: Params) => {
				const selectedCourse = courses.find((c) => c.name === params.userInput);
				if (!selectedCourse) return "select_course";

				if (
					selectedCourse.prereq &&
          !window.confirm(`This course requires ${selectedCourse.prereq}. Have you completed it?`)
				) {
					await params.injectMessage("No worries! Please select another course.");
					return "select_course";
				}

				const newTotal = totalCredits + selectedCourse.credits;
				if (newTotal > creditLimit) {
					await params.injectMessage(`Credit limit exceeded (${creditLimit} credits allowed).`);
					return "select_course";
				}

				setTotalCredits(newTotal);
				await params.injectMessage(
					`${selectedCourse.name} added! Total credits: ${newTotal}`
				);

				if (
					(enrollment === "full-time" && newTotal === 9) ||
          (enrollment === "part-time" && newTotal === 6)
				) {
					return "confirm_plan";
				}

				return "select_course";
			},
		},
		confirm_plan: {
			message: () => `You're all set, ${name}! Would you like to confirm your course plan?`,
			options: ["Yes", "No"],
			path: (params: Params) =>
				params.userInput.toLowerCase() === "yes" ? "thank_you" : "select_course",
		},
		thank_you: {
			message: "Thank you! Your optimal course list has been saved. Good luck this semester!",
			path: "loop",
		},
		loop: {
			message: "Type anything to restart!",
			path: "start",
		},
	};

	return (
		<div className="App">
			<header className="App-header">
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: `calc(20vh)`,
					}}
				>
					<ChatBot
						id="chatbot-id"
						flow={flow}
						settings={{
							audio: { disabled: false },
							chatInput: { botDelay: 1000 },
							userBubble: { showAvatar: true },
							botBubble: { showAvatar: true },
							voice: { disabled: false },
							sensitiveInput: { asterisksCount: 6 },
						}}
					></ChatBot>
				</div>
			</header>
		</div>
	);
}

export default App;
