import { Inter } from "next/font/google";
// import "./globals.css";
import agents from "@/agents"
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const LinkCard = props => {
	return (
		<Link 
			href={props.link}
			className="group 
			bg-red-800
				rounded-lg border border-transparent 
				px-5 py-4 
				h-full
				flex flex-col items-start
				overflow-hidden
				transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
			rel="noopener noreferrer"
			>
			<h2 className={`mb-3 text-2xl font-semibold`}>
				{props.title}{" "}
				<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
				-&gt;
				</span>
			</h2>
			<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
				{props.description}
			</p>
		</Link>
	)
}

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 relative my-16">
			{/* <div className="text-3xl md:text-5xl lg:text-6xl font-bold mt-16 text-center mb-16"> */}
			<div className="text-3xl m-16">
				Focus on your core competency. Delegate to AI. Build a big business. 
			</div>
			{/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
				Get started by editing&nbsp;
				<code className="font-mono font-bold">src/app/page.js</code>
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
				<a
					className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
					href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					By{" "}
					<Image
					src="/vercel.svg"
					alt="Vercel Logo"
					className="dark:invert"
					width={100}
					height={24}
					priority
					/>
				</a>
				</div>
			</div> */}

			<div className="absolute flex place-items-center 
			before:absolute before:h-[300px] before:w-full 
			sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full 
			sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 
			before:lg:h-[360px] 
			z-[-1]">
				{/* <Image	
				className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
				src="/next.svg"
				alt="Next.js Logo"
				width={180}
				height={37}
				priority
				/> */}
			</div>
			<div className="grid justify-center items-center mb-32 text-center grid-cols:3 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				{agents.map(agent => (
					<LinkCard title={agent.name} description={agent.description} link={`/chat/${agent.id}`} />
				))}
				{/* <LinkCard title="Onboarding" description="Learn about how to use the platform's AI assistants to run your business." link="https://chatgpt.com/g/g-lt4YLgDdF-fill-your-content-calendar-text"/> */}
				{/* <LinkCard title="Build a thought partner" description="Create a new AI partner to brainstorm ideas and debate decision with." link="https://chatgpt.com/g/g-NMUsB4UVe-thought-partner-builder"/>
				<LinkCard title="Brand Builder Guidelines" description="Create a brand document to capture details about what you do for all other AI employees." link=""/>
				<LinkCard title="Plan your day" description="Time-block your calendar for today, a habit followed by most successful people." link="https://chatgpt.com/g/g-u26UqZ7I3-calendar-planner"/>
				<LinkCard title="Fill your content calendar (text)" description="Schedule and automate the next month of text posts for X, LinkedIn, Facebook, etc." link="https://chatgpt.com/g/g-lt4YLgDdF-fill-your-content-calendar-text"/>
				<LinkCard title="Terms of service creator" description="Publish the legally required terms of service page for your website." link="https://chatgpt.com/g/g-JWYorVe9u-terms-of-service-creator"/>
				<LinkCard title="Privacy policy creator" description="Publish the legally required privacy policy page for your website." link="https://chatgpt.com/g/g-RyUIJ7hGZ-privacy-policy-creator"/>
				<LinkCard title="Skool Community Manager" description="Create your online Skool community and schedule posts." link="https://chatgpt.com/g/g-Steg9kjAr-skool-community-manager"/>
				<LinkCard title="Keep Regular Updates" description="Share regular updates that inform your AI assistants about what's important right now." link="https://chatgpt.com/g/g-cdHNk3kT7-updates-gpt"/> */}
				{/* <LinkCard title="Build an Email Newsletter" description="Schedule a newsletter to go out to your subscribers." /> */}
				{/* <LinkCard title="Market Research" description="Browse the internet to uncover insights about the industry and your competitors" /> */}
			</div>
		</main>
	);
}
