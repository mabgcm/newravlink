export const coldCallerModules = [
  {
    id: "call-objective",
    title: "Understand Your Job",
    content: [
      { type: "p", text: "Rav Link helps small and medium-sized businesses improve their online presence through services such as website development, SEO, Google Business Profile optimization, lead generation, and digital marketing." },
      { type: "p", text: "Your first call is not a sales presentation. Your main objective is to find the person responsible for the company’s website, marketing, or online presence. This may be the owner, a manager, a marketing manager, an office manager, or another responsible person." },
      { type: "p", text: "If that person is unavailable, your goal is usually to obtain useful contact information, especially an email address. Keep the first call short. Do not explain every service, give prices, make promises, or pressure the business. Move the conversation to the right person." },
    ],
    questions: [
      { id: "q1", type: "choice", category: "Call Objective", prompt: "What is the main objective of the first call?", options: ["Sell an SEO package", "Explain all Rav Link services", "Identify and reach the right person", "Give the business a website quote"] },
      { id: "q2", type: "choice", category: "Call Objective", prompt: "Which person should you always ask for?", options: ["The owner only", "The receptionist", "Whoever handles the website, marketing, or online presence", "The accountant"] },
    ],
  },
  {
    id: "simple-conversation", title: "Keep the Conversation Simple",
    content: [
      { type: "p", text: "When a receptionist or employee asks, “What is this regarding?”, do not immediately start a sales pitch." },
      { type: "quote", text: "It’s regarding the company’s website and online presence. I was hoping to speak with whoever handles that." },
      { type: "p", text: "This explains the subject without unnecessary information. Your goal is not to impress the receptionist; it is to reach the correct person." },
    ],
    questions: [{ id: "q3", type: "choice", category: "Communication Judgment", prompt: "The receptionist asks, “What exactly do you want?” Which response is best?", options: ["We provide SEO, website design, Google optimization and social media management.", "I wanted to speak with whoever handles the company’s website or online presence.", "Your website has several problems.", "I need the owner’s email address."] }],
  },
  {
    id: "truthfulness", title: "Do Not Invent Information",
    content: [
      { type: "p", text: "Never make something up just to continue the conversation. Unless you were specifically given the information, do not claim a website is broken, has a security problem, is losing customers, has bad SEO or serious errors, or is being penalized by Google." },
      { type: "quote", text: "I’m not sure, and I don’t want to give you the wrong information." },
      { type: "p", text: "The appropriate Rav Link person can provide details. Being accurate is more important than sounding knowledgeable." },
    ],
    questions: [
      { id: "q4", type: "choice", category: "Accuracy", prompt: "The receptionist asks, “Is there something wrong with our website?” You have no information confirming a problem. What should you say?", options: ["Yes, there are several serious issues.", "Yes, your website is probably losing customers.", "I can’t say that without the right information. I just wanted to reach the person responsible for the website or online presence.", "Yes, but Rav Link can fix it."] },
      { id: "q5", type: "choice", category: "Accuracy", prompt: "The owner asks for an SEO price, but you have not been given pricing. What should you do?", options: ["Estimate a price", "Say Rav Link is cheaper than competitors", "Say you are not sure and avoid giving incorrect information", "Choose a package you think fits"] },
    ],
  },
  {
    id: "gatekeepers", title: "Working With a Gatekeeper",
    content: [
      { type: "p", text: "A receptionist, administrative assistant, office administrator, dispatcher, or customer service employee may be a gatekeeper. Be polite. Do not argue or try to trick them. They may help identify the correct decision maker." },
      { type: "quote", text: "Who normally handles your website or online marketing?" },
      { type: "p", text: "If the owner does not handle it, ask who does. The objective remains the same even when the person changes." },
    ],
    questions: [{ id: "q6", type: "choice", category: "Communication Judgment", prompt: "The receptionist says, “The owner doesn’t deal with the website.” What should you do?", options: ["End the call immediately", "Ask for the owner’s email anyway", "Ask who normally handles the website or marketing", "Start explaining Rav Link’s SEO services"] }],
  },
  {
    id: "sales-question", title: "When They Ask If It Is a Sales Call",
    content: [
      { type: "p", text: "Do not become defensive or lie, and do not launch into a sales presentation. Keep your answer focused on the purpose of this call." },
      { type: "quote", text: "I’m calling regarding the company’s website and online presence. I just need to reach whoever handles that." },
      { type: "p", text: "Never pretend Rav Link is Google, a government organization, the company’s existing service provider, or another organization. Always represent Rav Link accurately." },
    ],
    questions: [{ id: "q7", type: "choice", category: "Communication Judgment", prompt: "The receptionist asks, “Are you trying to sell us SEO?” Which response is best?", options: ["Yes. We have very affordable SEO packages.", "I’m calling regarding the company’s online presence. I was trying to reach the person who handles that.", "No. Rav Link never sells anything.", "Just transfer me to the owner."] }],
  },
  {
    id: "decision-maker", title: "When You Reach the Decision Maker",
    content: [
      { type: "p", text: "Reaching the decision maker does not mean starting a long presentation. Respect their time." },
      { type: "quote", text: "Hi Mike, this is Anna from Rav Link. I’m calling regarding your company’s online presence. I don’t want to take much of your time. I’d like to send you some information. What’s the best email address for you?" },
      { type: "p", text: "If they continue, listen and answer only what you know. The first call should create the correct next step." },
    ],
    questions: [{ id: "q8", type: "choice", category: "Call Objective", prompt: "The decision maker asks, “Okay. What are you selling?” Which response best follows the first-call objective?", options: ["Our SEO packages start at $500.", "I don’t want to give you a full sales presentation on this call. I wanted to send you the information so you can review it.", "We guarantee more leads.", "We’re better than most marketing agencies."] }],
  },
  {
    id: "stay-focused", title: "Stay Focused on the Objective",
    content: [
      { type: "p", text: "Calls do not always follow a script. If someone says they already have a marketing company, do not argue, criticize the company, or claim Rav Link is cheaper." },
      { type: "quote", text: "That’s completely fine. I’m not asking you to change anything. I just wanted to send the information to the person responsible." },
      { type: "p", text: "Remembering the objective matters more than trying to win every argument." },
    ],
    questions: [{ id: "q9", type: "choice", category: "Call Objective", prompt: "The receptionist says, “We already have a marketing company.” What is the best response?", options: ["They’re probably not doing a very good job.", "That’s fine. I’m not asking you to change anything. I just wanted to reach the person responsible.", "How much are you paying them?", "Rav Link is probably cheaper."] }],
  },
  {
    id: "know-when-stop", title: "Know When to Stop",
    content: [
      { type: "p", text: "Persistence does not mean ignoring clear instructions. Do not argue with “I’m not interested.” If someone clearly says, “Please don’t call us again,” end politely and record it accurately in the CRM." },
      { type: "quote", text: "Understood. Thank you for your time." },
      { type: "p", text: "Never keep trying to obtain an email after a clear no-further-contact request." },
    ],
    questions: [{ id: "q10", type: "choice", category: "Instruction Following", prompt: "The owner says, “Please don’t call us again.” What should you do?", options: ["Ask for their email before hanging up", "Ask why they are not interested", "Politely end the call and record the request in the CRM", "Try again next week"] }],
  },
  {
    id: "crm-job", title: "The CRM Is Part of the Job",
    content: [
      { type: "p", text: "Making the call is only half the task. Rav Link uses a shared CRM Google Sheet for assigned leads. You are only expected to complete the columns highlighted in yellow." },
      { type: "p", text: "Unless specifically instructed, do not delete rows, move leads, change company information, modify formulas or formatting, overwrite another caller’s information, or edit unassigned columns. Enter only what actually happened." },
    ],
    questions: [{ id: "q_crm_yellow", type: "choice", category: "CRM Understanding", prompt: "Which CRM fields should you complete?", options: ["Every empty field", "Only the yellow-highlighted columns assigned to you", "Company information and formulas", "Any columns that seem useful"] }],
  },
  {
    id: "useful-notes", title: "CRM Notes Must Be Useful",
    content: [
      { type: "p", text: "A team member who was not on the call should be able to understand what happened and what comes next. “Called” or “Talked to lady. Owner busy.” is not enough." },
      { type: "quote", text: "Jennifer answered. Owner Mark handles marketing. Mark unavailable. Received email mark@example.com. Jennifer said mornings are best for callback." },
      { type: "p", text: "Keep notes short, factual, clear, and useful. Describe what happened, not how you felt. Instead of “Receptionist was rude,” write “Receptionist declined to provide decision-maker information.”" },
    ],
    questions: [{ id: "q11", type: "choice", category: "CRM Understanding", prompt: "Jennifer says owner Mark handles marketing, is unavailable, provides mark@abcroofing.ca, and says mornings are best. Which note is best?", options: ["Called ABC Roofing.", "Jennifer answered. Owner Mark handles marketing. Mark unavailable. Email: mark@abcroofing.ca. Best callback time: mornings.", "Owner wasn’t there.", "Jennifer was nice and helped me."] }],
  },
  {
    id: "actual-events", title: "Record What Actually Happened",
    content: [
      { type: "p", text: "Never enter information because you think it is probably correct. If a receptionist says, “I think Steve handles marketing,” do not record “Steve is the Marketing Manager.”" },
      { type: "quote", text: "Receptionist believes Steve may handle marketing; not confirmed." },
      { type: "p", text: "Accuracy matters because the CRM guides future calls and follow-ups." },
    ],
    questions: [{ id: "q12", type: "choice", category: "Accuracy", prompt: "The receptionist thinks Sarah handles the website but is not sure. What should you record?", options: ["Sarah — Website Manager", "Sarah definitely handles the website.", "Receptionist believes Sarah may handle website; not confirmed.", "Nothing"] }],
  },
  {
    id: "collect-needed", title: "Only Collect What You Need",
    content: [
      { type: "p", text: "Do not turn every call into an investigation. If your instructions say to end after receiving the decision maker’s email, thank the receptionist, record it, and end unless there is a clear reason to continue." },
      { type: "p", text: "Do not automatically ask for mobile numbers, arrival times, website suppliers, marketing spend, or SEO providers. More questions are not always better." },
    ],
    questions: [{ id: "q13", type: "choice", category: "Instruction Following", prompt: "You receive the decision maker’s name and email, and your instructions say to end the call. What should you do?", options: ["Ask for a mobile number too", "Ask five marketing questions", "Thank the receptionist, record the information, and end the call", "Start explaining Rav Link services"] }],
  },
  {
    id: "recording-mandatory", title: "Call Recording Is Mandatory",
    content: [
      { type: "p", text: "Every completed call must have its call recording link entered into the appropriate yellow CRM field. It lets Rav Link verify calls, coach callers, review difficult situations, confirm accuracy, and improve future calls." },
      { type: "list", items: ["Make sure the recording exists.", "Copy its link into the correct yellow column.", "Confirm it belongs to the correct lead.", "Complete the other required yellow fields."] },
      { type: "p", text: "Never use another business’s recording, enter a fake link, or leave the field empty. No recording link means the call record is incomplete." },
    ],
    questions: [{ id: "q14", type: "choice", category: "CRM Understanding", prompt: "You entered perfect notes but forgot the call recording link. Is the task complete?", options: ["Yes, because the notes are enough", "Yes, if you remember what happened", "No, the call recording link is mandatory", "Only if the customer answered"] }],
  },
  {
    id: "crm-final-check", title: "CRM Final Check",
    content: [
      { type: "p", text: "Before moving to the next lead, check that you filled only assigned yellow fields, used the correct business row, recorded the actual result, included useful notes and accurate contact information, and added the correct recording link." },
      { type: "p", text: "This takes seconds and prevents mistakes. Speed is useful; accuracy is more important." },
    ],
    questions: [{ id: "q15", type: "choice", category: "CRM Understanding", prompt: "You entered the recording link in the next company’s row. What should you do?", options: ["Leave it because the recording exists", "Correct it before continuing", "Add it to both businesses", "Delete the entire row"] }],
  },
  {
    id: "practical", title: "Practical Situation",
    content: [
      { type: "p", text: "You call Premier Windows & Doors in Mississauga, Ontario. Answer each stage as though you are speaking on the call. These recordings let us hear your spoken English, clarity, confidence, and professional judgment." },
    ],
    questions: [
      { id: "voice1", type: "voice", prompt: "The receptionist answers: “Premier Windows, how can I help you?” Record what you would say." },
      { id: "voice2", type: "voice", prompt: "The receptionist asks: “What is this regarding?” Record your response." },
      { id: "voice3", type: "voice", prompt: "The receptionist says: “Our owner is very busy. Are you selling something?” Record your response." },
      { id: "voice4", type: "voice", prompt: "The receptionist says: “David handles our marketing. He’s not here today.” Record your response." },
      { id: "voice5", type: "voice", prompt: "The receptionist gives you david@premierwindows.ca. Record what you would say next." },
      { id: "practical_crm", type: "textarea", prompt: "Write the CRM note you would enter after this call. Include only information actually provided.", placeholder: "Write a short, factual CRM note…" },
    ],
  },
  {
    id: "final-judgment", title: "Final Judgment Test",
    content: [
      { type: "p", text: "When a situation differs from the examples, remember the priorities: be truthful, stay focused, be concise, respect the person, follow instructions, record the result accurately, and include the recording for every completed call." },
    ],
    questions: [{ id: "q16", type: "choice", category: "Instruction Following", prompt: "Which statement best describes a good Rav Link cold caller?", options: ["Someone who talks for as long as possible", "Someone who aggressively tries to sell on every call", "Someone who understands the objective, communicates clearly, follows instructions, and records the result accurately", "Someone who follows the exact same sentence regardless of what the other person says"] }],
  },
];

export const requiredAnswerIds = coldCallerModules.flatMap((module) => module.questions.map((question) => question.id));
