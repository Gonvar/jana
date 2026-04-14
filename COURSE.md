# Understanding Artificial Intelligence

> A personal course on AI — ten modules, no jargon, no hype.

---

---

## Module 1

There is a version of this story where AI is a mind — curious, conscious, forming opinions about you between conversations. There is another version where it is a monster, about to replace everyone doing creative work. Neither is true. Both make it harder to use well.

What follows is the accurate, unglamorous version. It is also, once you sit with it, more interesting than either story.

## The librarian who has read everything

Imagine a librarian who has spent their entire life reading. Not skimming — reading carefully, deeply, across every subject: architecture journals, recipe books, legal contracts, love letters, instruction manuals, novels, forum arguments, Wikipedia articles, technical papers. Millions of documents. Billions of words.


> **The librarian analogy:** This librarian has read everything ever written, but has never left the library. They have never held a paintbrush, never stood in a room and felt whether the proportions were right, never had a client change their mind at the last minute. They know what people have *said* about all these things — extraordinarily well. But they have not *lived* them.


When you ask this librarian a question, they draw on every pattern, every phrasing, every argument they have ever read and compose a response that fits. It is not retrieved — it is assembled, freshly, from memory. And because they have read so much, the assembly is often surprisingly good.

That librarian is, roughly, what a large language model is.

## Pattern completion, not thinking

The technical reality is even simpler than the analogy. A language model is, at its core, a system trained to predict what comes next in a sequence of text. Given the words *"The client wanted a warm, earthy palette — terracotta, linen, and—"*, the model has seen enough similar writing to know what kinds of words tend to follow. It fills in the blank.

Do this at enormous scale — billions of examples, billions of predictions, constant correction — and something remarkable emerges. The model begins to appear as though it understands language. In some meaningful sense, it does. It has absorbed the structure, the logic, the conventions of how humans communicate ideas.

But it does not understand in the way you do. It has no intention. No memory of last Tuesday. No sense of whether the terracotta you are imagining is the right terracotta. It is making very sophisticated, very fast, very confident guesses about what a good response looks like.


## What it means for how you use it

This distinction — pattern completion vs. genuine understanding — has practical consequences.

It means AI is genuinely excellent at tasks that live in the domain of language and convention: drafting a client email in the right professional register, suggesting five names for a colour that evoke warmth without cliché, restructuring a proposal so the key point lands first. These are tasks where having read an enormous amount of well-written text is the main qualification.

It means AI will sometimes be wrong in ways that feel strange — confidently, fluently wrong. It can describe a sofa that does not exist, cite a regulation that was never written, or give you dimensions that are architecturally impossible. It is not lying. It is pattern-matching its way toward a plausible answer, and "plausible" is not the same as "true."

It also means AI has no aesthetic sense of its own. When it tells you a palette of warm neutrals with a terracotta accent will feel grounding, it is drawing on thousands of similar descriptions — not on any felt sense of what it is like to stand in that room. Your judgment, trained by years of actually doing this work, is doing something categorically different.

## Not magic. Not a threat. A tool with a specific shape.

Every tool has a shape. A straight edge is excellent for measuring and drawing clean lines; it is useless for sanding a curve. AI has a shape too: it is very good with language, convention, and synthesis; it is limited when it comes to facts, physical reality, and genuine aesthetic judgment.

Understanding that shape does not make you a technologist. It makes you a better user of the tool — the same way understanding that linen wrinkles, or that certain paint finishes do not photograph well, makes you better at the decisions that matter.

You have already started using AI — for colour palettes, for technical questions, for checking accessibility. You are doing it intuitively. These modules are about giving you a clearer mental model so you can use it more deliberately, and know when not to use it at all.


> **Try this prompt:** I am working on a living room for a family with two young children. They want something that feels calm and grown-up, but not precious — materials need to be practical. Suggest three distinct colour directions, each with a one-sentence mood description.

> *A good first experiment: notice where the response is useful, and where it stays vague or generic. The gap is instructive.*


**Key idea:** *AI is a very sophisticated pattern-matching system trained on human writing — extraordinarily useful for language tasks, limited by the fact that it has never actually experienced the world.*


---

## Module 2

In the previous module, we established what AI is: a pattern-matching system trained on an enormous amount of human writing. Now let's go one level deeper — not into mathematics, but into the actual mechanic of how it generates a response. This will explain a lot of things that otherwise seem mysterious, including why AI sometimes says something confidently wrong.

## One word at a time

When you send a message to Claude or ChatGPT, the model does not think about your question, retrieve an answer from a database, and send it back. It does something far stranger and more interesting.

It reads your message, and then — one small unit of language at a time — it predicts what should come next.


> **The prediction machine:** Imagine you are mid-sentence and you pause. Someone who knows language well can often guess your next word — not because they know what you mean to say, but because they have heard so many sentences that certain words follow certain other words with predictable frequency. "The client preferred a more—" invites "neutral" or "contemporary" far more than "purple" or "catastrophic". A language model does this, but trained on billions of examples, running at high speed, making thousands of these small predictions in sequence to build a full response.


Each prediction influences the next. The model is not choosing from a pre-written list of possible answers. It is composing your response word by word, each word shaped by everything that came before it.

## How the model was trained

The model did not arrive knowing any of this. It was trained — a process that took months of computation and hundreds of billions of examples.

The training process is conceptually simple: show the model a piece of text, hide the last word, ask it to predict what the word should be, compare its guess to the real word, and adjust the model's internal settings slightly so it does a little better next time. Repeat this billions of times across an enormous amount of text.


After enough repetitions, the model develops something that functions like an understanding of language — not because anyone taught it grammar or vocabulary directly, but because patterns in the data made those concepts necessary to predict well. Grammar is not a rule the model was given; it is a structure the model discovered because following it makes better predictions.

## Why it sometimes makes things up

This is the part that surprises most people, and once you understand it, it changes how you work with AI forever.

The model was trained to produce *plausible* next words — not *true* ones. Plausibility and truth overlap a great deal, but they are not the same thing.


> **The very confident intern:** Imagine a very bright, very eager intern on their first week. They have read everything they could find about your industry, they speak fluently about it, and they never say "I don't know" — because they have been trained (in a social sense) to appear competent. When they don't know the answer, they produce a confident-sounding answer assembled from the relevant things they have read. It is often close. Sometimes it is wrong in ways that are hard to spot, because it sounds exactly like how a correct answer would sound.


When an AI model tells you a specific product has a certain fire rating, or that a building regulation requires a specific clearance, it is producing text that *looks like* what that answer would look like. It may be right. It may be subtly wrong. It has no access to a database of facts — only to the patterns of language it was trained on.


This is called hallucination, and it is not a bug the developers forgot to fix. It is a fundamental property of how these models work. The best models hallucinate less than earlier ones, but none hallucinate zero.

**The practical rule:** trust the model with language tasks — tone, structure, phrasing, synthesis. Verify it for facts, measurements, regulations, product specifications, and anything where being wrong has real consequences.

## The model has no memory between conversations

Each conversation starts fresh. The model does not remember that last week you told it your client prefers contemporary Nordic interiors and hates anything that feels cold. Every session begins from zero, with only what you write in the current conversation as context.

This is not a privacy feature or a limitation — it is simply how the architecture works. Within a conversation, the model can build on what has been said. Across conversations, it cannot.

Some tools offer memory features that work around this by injecting notes from previous sessions into new ones. But the underlying model itself has no persistent memory of its own.

## What emerges from all of this

What is remarkable is that something so mechanistic — predict the next word, correct, repeat — produces output that can feel genuinely thoughtful. A well-prompted model can write with clarity, synthesise complex information, find the right tone for a difficult message, and make connections across ideas. Not because it is thinking, but because good thinking, like good language, leaves patterns that can be learned.

This is worth sitting with. It is not lesser for being mechanical. It is impressive precisely because the mechanism is so much simpler than you would expect for the result it produces.


> **Try this prompt:** I'm writing a project summary for a residential client. The project was a full living and dining room renovation. The client was initially hesitant about the dark walls we proposed, but loved the result. Write a two-paragraph summary that's warm but professional, suitable for a portfolio page.

> *Notice: the model will produce something plausible — possibly very good. It doesn't know your client. All the texture comes from what you gave it.*


**Key idea:** *A language model generates responses by predicting what word comes next, one at a time, trained on patterns — not facts. That is why it is brilliant at language and unreliable about truth.*


---

## Module 3

Two small concepts — tokens and context windows — explain a surprisingly large number of AI quirks that would otherwise seem random. Why does a long conversation start going slightly off-track? Why does the model sometimes ignore instructions you gave earlier? Why is there a limit to how long a document you can paste in?

These are not bugs. They are the shape of the tool.

## Tokens: the Lego bricks of language

AI models do not read text the way you do — word by word, letter by letter. They process text broken into small units called **tokens**, which sit somewhere between letters and words.

The word "terracotta" might be a single token. "Extraordinary" might be split into two — "Extra" and "ordinary." Common words like "the" or "of" tend to be their own tokens; unusual or long words get split into parts. Numbers, punctuation, and spaces are also tokenised in their own ways.


Try it below. Type a sentence from your work and see how it gets broken apart:


*[Interactive demo: TokenDemo]*


A few things to notice:
- Common short words tend to be single tokens
- Longer or technical words often get split
- Spaces are usually attached to the word that follows them

This matters because AI models have limits measured in tokens — not words, not characters. When a model has a "200,000 token context window," that translates to roughly 150,000 words — enough for a long novel. Smaller models might have 8,000 tokens — about 6,000 words.

## The context window: the AI's desk

Every conversation you have with an AI model happens within a **context window** — the total amount of text the model can hold in mind at once. Everything in that window, the model can reference. Everything outside it, the model cannot see at all.


> **The desk analogy:** Think of the context window as a physical desk. You can spread things across it — your project brief, the client's reference images translated to text, your earlier conversation, the model's responses. As long as something is on the desk, the model can see it and work with it. When the desk is full, and you add something new, the oldest things fall off the edge. The model can no longer see them — not because it forgot, but because they are no longer in front of it.


*[Interactive demo: ContextWindowDemo]*


This is why very long conversations can subtly degrade. Early instructions, context you established at the start — these drift out of reach as the conversation grows. The model is not getting tired or bored. The early parts of your conversation have literally left the window.

## Practical consequences

**Start fresh for new projects.** A new conversation is a clean desk. If you have been working on a residential project in one thread and you start a new commercial brief, open a fresh conversation rather than continuing in the same one. You will get cleaner results.

**Front-load important context.** Whatever the model most needs to know — the client's brief, your constraints, the tone — put it near the beginning of your message or conversation. Do not assume it will remember something you mentioned casually twenty messages ago.

**Keep pasted documents lean.** If you paste in a long contract, specification sheet, or previous correspondence, you are spending tokens that could otherwise be used for the conversation itself. Paste only the sections that are relevant to what you are asking.

**Notice degradation and restart.** If a long conversation starts producing slightly off answers — wrong names, ignoring earlier constraints, repeating itself — the most efficient fix is usually a new conversation with the key context re-established at the top.

## Both your words and its words count

One detail that surprises people: the context window counts everything — your messages *and* the model's responses. In a long conversation with detailed back-and-forth, the model's own previous answers are consuming part of the window. This is why very long conversations eat through context faster than you might expect.

Some models handle this by silently summarising older parts of the conversation and replacing the full text with a compressed version. Others simply stop being able to see old content. The behaviour varies by tool.


> **Try this prompt:** Here is the brief for a new project: [paste your actual brief here]. Based only on what I've told you, what are the three most important questions you'd want answered before starting work on a colour palette?

> *Practice giving the model a clean, complete brief at the start — rather than building context gradually across many messages. Notice how much better the response is when the context is clear from the beginning.*


**Key idea:** *The AI can only see what is currently in its context window — give it the most important context upfront, and start a fresh conversation when a project genuinely changes.*


---

## Module 4

The quality of what you get from an AI model is almost entirely determined by the quality of what you put in. This is both the most empowering and the most frustrating thing about working with these tools — there is no magic, only craft.

The good news is that the craft of prompting is not technical. It is the craft of being clear about what you want. And if you have ever written a client brief, or a project specification, or a set of instructions for a colleague — you already know how to do this.

## Think of it as briefing a very capable contractor

The mental model that works best: you are the art director, and the AI is a highly capable contractor who has read an enormous amount about your field, has no prior knowledge of your specific project, and will execute exactly what you describe — no more, no less.


> **The contractor brief:** A good contractor does not read your mind. Give them a vague brief and they will fill the gaps with assumptions — some correct, many not. Give them a specific brief with clear constraints and you will get something usable on the first pass. The more you invest in the brief, the less time you spend on revisions.


A weak prompt: *"Write something about my new project."*

A strong prompt: *"You are a copywriter who specialises in high-end residential interiors. Write a 150-word project summary for a portfolio website. The project was a Modernist apartment renovation in Barcelona. The client wanted warmth and craft without losing the building's original geometric character. Tone: refined, confident, and warm. No superlatives. No exclamation marks."*

The difference is not length — it is specificity. The stronger prompt defines role, task, format, content, tone, and constraints.

## The four elements of a strong prompt

Think of these as the four sections of a good brief:

**Role** — Who is the AI being asked to be? *"You are a professional interior design copywriter..."* or *"Act as a senior project manager reviewing this specification for errors..."*

**Task** — What exactly do you want? Be concrete. Not "write about the project" but "write a 100-word description for an Instagram caption, told in second person, focusing on the transformation of the entrance hall."

**Format** — What should the output look like? A bulleted list? A formal letter? Three options to choose from? A table? If you do not specify, the model will guess — often well, but not always in the way that works for your workflow.

**Constraints** — What must it not do? No jargon. No more than 200 words. Use the client's name, which is Martínez. Avoid the word "journey." Constraints are as important as instructions — they prevent the model from filling your brief with things you do not want.

## Temperature: precise or creative?

There is a setting in most AI tools — rarely labelled obviously — that controls how exploratory or conservative the model's outputs are. At low temperature, the model produces the most predictable, reliable response. At high temperature, it takes more risks, makes less expected connections, and is sometimes more interesting.

In practice, you can simulate this in your prompt: *"Give me five wildly different options"* will push the model toward variety; *"Give me the single most appropriate option"* will pull it toward precision.


*[Interactive demo: TemperatureDemo]*


For functional tasks — checking a document, reformatting a spec sheet, writing a formal email — lower temperature (more predictable) is usually better. For creative tasks — colour direction names, concept descriptions, marketing copy — giving the model permission to explore often produces better results.

## Three worked examples

### 1. Mood board narrative

**The prompt:**


> **Try this prompt:** You are an interior design writer. I am creating a mood board for a residential bedroom renovation. The client is a woman in her early 40s who works in fashion. She wants the room to feel like a retreat from her busy life — quiet, sensory, deeply personal. The references I have gathered include: raw linen, dried botanicals, aged brass, very dark walls (almost black-green), and a single low platform bed. Write a 120-word mood board narrative that captures the feeling of this direction. Tone: poetic but grounded. No clichés about 'sanctuary' or 'haven'.

> *Notice the specific instruction to avoid clichés — this is a constraint. Without it, the model will default to exactly the words you want to avoid.*


### 2. Client email


> **Try this prompt:** Write an email to a client informing them that the custom sofa they ordered has been delayed by 6 weeks due to a supply issue with the fabric. The client is warm but values transparency and directness. Offer one concrete alternative: we can proceed with a different fabric from our existing stock that is similar in quality and texture. Keep the email under 200 words. Professional but personal tone — we have an established relationship.

> *Give the model the emotional register of the relationship ('established', 'warm but direct'). This shapes the tone more than any adjective you could use.*


### 3. Specification check


> **Try this prompt:** Review the following room specification for internal inconsistencies — things that contradict each other, dimensions that seem implausible, or missing information that a contractor would need. List any issues you find as bullet points. Do not rewrite the specification — only flag problems.\n\n[Paste your specification here]

> *Using AI as a second pair of eyes on documents is one of its most reliable uses. It is pattern-matching for inconsistency — something it does well.*


## Iteration is the method

Rarely will your first prompt produce exactly what you want. That is not failure — it is the process. Read the output, notice what is wrong or missing, and refine. *"That is good, but make the opening line stronger and remove the mention of timeline — the client does not need to know that."*

This is no different from reviewing a colleague's work and giving feedback. The skill is in reading what you received and knowing what to ask for next.


**Key idea:** *Prompt like you brief: give the AI a role, a clear task, a format, and your constraints — then iterate the same way you would with any creative collaborator.*


---

## Module 5

One of the most useful things you can do early in your relationship with AI tools is build an honest map of where they help and where they mislead. The hype cycle makes this difficult — it alternates between "AI will do everything" and "AI is useless," neither of which helps you get work done.

The reality is a specific shape: there are tasks where AI is genuinely excellent, tasks where it is mediocre, and tasks where it is confidently, dangerously wrong. Knowing which is which protects you and lets you move faster on the things where AI actually helps.

## Where AI genuinely excels

**AI is reliable for these**
- AI is reliable for these
- Drafting client emails in the right professional register — especially when you describe the relationship and tone
- Generating palette names, concept descriptions, and evocative language around a direction you have defined
- Restructuring and reformatting text — turning a bullet list into a paragraph, or a long email into a concise summary
- Reviewing documents for inconsistencies, missing information, or unclear instructions
- Translating technical information into plain language for clients who are not industry professionals
- Brainstorming: generating five options when you need to explore directions, even if you use none of them verbatim
- Explaining concepts — what a specific finish does, how a structural approach works — in simple terms
- Checking grammar, tone, and consistency across a long document


The common thread: these are all tasks that live in language. AI has been trained on an enormous amount of well-written professional text, and it has learned the patterns of how these outputs should look and sound.

## Where AI is unreliable

**Verify carefully here**
- Verify carefully here
- Specific product availability, pricing, or lead times — it does not have access to real-time data
- Exact building regulations or fire safety codes — it may produce plausible-sounding rules that are incorrect or outdated
- Dimensions and spatial relationships — it can describe space in words but has no understanding of physical proportion
- Material properties that require physical experience — how a fabric drapes, how a stone feels underfoot, how light moves across a surface
- Sourcing specific items from specific suppliers — it may hallucinate product names, ranges, or prices
- Aesthetic judgment about whether something is right — it can describe what others have said about an aesthetic, but it cannot feel it
- Recent events, new products, or anything that happened after its training data was collected


## The confidently wrong problem

The most important thing to understand about AI errors is how they present themselves. When a person does not know something, they often signal uncertainty — a hesitation, a qualification, a "I'm not sure, but..." When an AI model does not know something, it usually does not signal uncertainty at all. It produces a fluent, confident answer that looks exactly like a correct answer.


> **The confident wrong turn:** Imagine asking a colleague for directions, and they give you very clear, detailed, turn-by-turn instructions in a confident voice — but they have never actually been to that neighbourhood and are assembling the directions from what they think makes sense. The confidence of the delivery tells you nothing about the accuracy of the information.


This is not a moral failure. The model is doing exactly what it was trained to do — produce plausible next words. The problem is that "plausible" and "true" are different things, and nothing in the model's output reliably marks the difference.

**The practical rule:** for anything where being wrong has real consequences — a specification that will be sent to a contractor, a fire regulation that affects building safety, a product dimension that will go into a drawing — treat AI output as a first draft that requires verification, not a source of truth.

## What this means for your workflow

The most effective way to use AI in professional design work is to let it handle the parts that are slow and frustrating while preserving your judgment for the parts that require real knowledge and real aesthetic sense.

A useful mental distinction: **AI handles the language, you handle the decisions.**

Let it draft the client email. You decide what the email says.
Let it generate five name options for a colour direction. You choose which one is right.
Let it check the specification document for inconsistencies. You decide how to resolve them.
Let it rephrase a supplier brief. You decide what goes into the brief.

This keeps AI in a support role — fast, tireless, available at any hour — while your expertise remains the thing that actually drives the project.


> **Try this prompt:** Review this paragraph from a project specification and tell me: (1) Is anything ambiguous enough that a contractor might misinterpret it? (2) Is any measurement or quantity missing that they would need? List issues only — do not rewrite.\n\n'The kitchen island to be finished in a honed Calacatta marble, 30mm thick. Waterfall edge on both sides. Undermount sink, position to be confirmed. Appliances to be integrated.'

> *A concrete example of using AI as a checking tool rather than an authoring tool. Notice that you stay in control of what the specification says.*


**Key idea:** *Trust AI with language tasks — drafting, formatting, synthesising, checking tone. Verify everything where being wrong has real consequences. The confidence of the output tells you nothing about its accuracy.*


---

## Module 6

One of the fastest ways to feel lost in AI is to read about it. Every week brings new releases, new benchmarks, new claims about which model is now the best. If you try to keep up with the specific products, you will burn time that should go to actual work.

The better approach is to understand the landscape by *criteria* rather than by product names. The criteria change slowly. The products change constantly.

## Three categories that matter

Most AI tools fall into one of three categories based on what kind of content they work with:

**Text models** — these read and generate language. Claude, ChatGPT, Gemini, and most of the tools you have probably used fall here. They are what this course has been mostly about.

**Image models** — these generate, edit, or describe images. Midjourney, ChatGPT Images (powered by gpt-image-1), Flux, Adobe Firefly, Ideogram. We will look at these more closely in the next module.

**Multimodal models** — these handle both. Claude and ChatGPT, for example, can accept an image as an input and respond to it in text. You can photograph a space, paste the image, and ask for palette suggestions based on what is in the room.

The boundaries between categories are dissolving quickly — most major models are becoming multimodal. But the distinction still matters for understanding what a tool was built to do well.

## The criteria that age well

Rather than comparing current features (which will be outdated before this course is revised), here are the questions worth asking about any AI tool you consider using:


*[Interactive demo: CompareProviders]*


**Text vs. image vs. video** — What kind of content does the task require? Do not use a text model to generate visual concepts if an image model exists; do not use an image model for a document task.

**Privacy and data handling** — What happens to the content you paste in? For client work containing sensitive information — contracts, personal details, unreleased project images — read the terms carefully. Free tiers often use your inputs to improve the model. Paid tiers and enterprise agreements typically offer stronger protections.

**Cost vs. quality for the task** — The most capable models are rarely the most expensive for every task. A sophisticated model is ideal for nuanced, high-stakes writing; a faster, cheaper model may handle simple reformatting just as well. Over time it is worth noticing where premium capability actually changes your output and where it does not.

**Access and reliability** — A tool you access easily and trust to be available matters more than a marginally better tool you have to navigate bureaucracy to reach.

## A note on comparing models

Model comparison benchmarks are a genre of content that sounds rigorous and is often misleading. They measure performance on standardised tests, which may have little to do with the tasks you actually need to do.

The most useful comparison is one you run yourself: take a specific prompt from your actual work, run it through two or three models, and compare the outputs. The result will be more useful to you than any published ranking.

## The three tools worth knowing now

Without endorsing specific versions (which will be outdated), there are three areas of the landscape worth being aware of:

**Claude (Anthropic)** — strong at nuanced, long-form writing, reasoning, and careful instruction-following. The model this platform was built around. Tends to be thoughtful about acknowledging uncertainty.

**ChatGPT (OpenAI)** — the most widely used, with the broadest ecosystem of integrations. Strong general capability, with native image generation, voice mode, and a wide range of connected tools.

**Midjourney / image generators** — Midjourney, ChatGPT Images, Flux, and Adobe Firefly are all worth knowing. Each has a slightly different aesthetic sensibility. Not for final deliverables, but excellent for generative inspiration. We cover these in Module 8.

The instinct to find the "best" single tool is understandable but usually not useful. Most people who work with AI professionally use two or three tools, each for different tasks.


> **Try this prompt:** I need to quickly assess whether a new AI tool is worth trying for my interior design practice. What three questions should I ask about it before I invest time learning it?

> *Let the model help you build your own evaluation framework. Then compare its three questions to the criteria in this module — notice where they align and where they differ.*


**Key idea:** *Choose AI tools by what you need to do — text, image, or both — and by privacy, reliability, and fit for the task. Specific product comparisons age in months; these criteria do not.*


---

## Module 7

Up to this point, we have mostly talked about AI as a conversation: you write something, the model responds. That is the version most people know. But there is a second mode of working with AI that is more powerful and, once understood, changes what you think is possible.

This is the world of agents, tools, and skills.

## What an "agent" actually is

The word "agent" sounds more dramatic than it is. An AI agent is simply an AI that can do things in the world, not just talk about them.


> **The sous-chef analogy:** A skilled sous-chef can receive a dish description from the head chef and handle the entire execution: source ingredients, prep components, coordinate timing, plate, and present. They are not simply waiting to answer questions about what to cook. They are taking actions in sequence, using whatever tools are at hand, to produce a result. An AI agent works similarly — it receives a goal, breaks it into steps, uses available tools to execute those steps, and returns a result. The difference from a conversational AI is that the agent can *act*, not just respond.


An AI agent can:
- Search the web and synthesise what it finds
- Read a document you point it to
- Run code that does a calculation
- Call an external service (like a calendar or a database)
- Chain multiple steps together to complete a complex task

The conversation you have with a regular AI model stays in the chat window. An agent reaches outside it.

## Tools: what agents use to act

An agent's capabilities depend on what tools it has access to. Tools are specific abilities the AI can invoke — a web search tool, a code execution tool, a file reading tool, a calendar tool.


When Arnau set up the accessibility checking and Chirtike skills, he was essentially giving an AI agent access to specific tools for those tasks. The agent does not just talk about accessibility — it can run the check.

## MCP: the standard that makes this work

You may have heard the term MCP — Model Context Protocol. It sounds technical, but the idea is straightforward.


> **The universal plug:** Imagine if every country had a different plug socket, and every device needed a different adapter for every country. That is what the world of AI tools looked like before standards emerged. MCP is an attempt at a universal plug — a common language for AI models to connect to external tools. A tool built to the MCP standard can, in principle, work with any AI that supports MCP, rather than being built specifically for one model.


In practice, this means the tools Arnau has built — the accessibility checker, the Chirtike colour analysis — can be connected to Claude or potentially other MCP-compatible AI applications in the future. The skill is not locked to a single tool.

## The skills you are already using

You have been using AI agents without necessarily thinking of them that way. The accessibility and Chirtike skills that Arnau set up are agents: they take an input (your design), use a tool (the specific checking logic), and return a structured result (the accessibility report, the colour analysis).

This is what makes them more powerful than simply asking Claude to "check the accessibility of this design." A conversational model can make reasonable guesses based on general knowledge. An agent with the right tool can actually run the check.

As AI tooling matures, the number of available tools will grow. Today there are tools for searching current information, reading PDFs, querying databases, and generating images. Tomorrow there will be tools for current product availability from specific suppliers, real-time material pricing, or drawing file interpretation. The underlying model is the same — what changes is what tools it has access to.

## What this means practically

You do not need to build agents. Arnau does that. What is useful is understanding:

**Why a skill works better than a conversation.** When Arnau runs an accessibility check, the result is reliable in a way that asking Claude casually would not be — because it is using a defined tool with defined inputs and outputs, not a general language model making educated guesses.

**What to ask for next.** Now that you have a mental model of what agents can do, you can think about what other repetitive, well-defined tasks in your workflow might benefit from a dedicated tool rather than an open-ended conversation.

**Why these tools get better over time.** The model underneath may stay the same, but adding new tools to it expands what it can do without any fundamental change to the model.


> **Try this prompt:** Think of one task in your design workflow that is: (1) repetitive, (2) has a clear input and a clear desired output, and (3) currently takes you more time than it should. Describe it in a paragraph. What would an AI agent that handled this task need to be able to do?

> *This is a useful exercise in identifying where an agent could genuinely help — versus where a conversation is already sufficient.*


**Key idea:** *An agent is an AI that can take actions, not just talk. The skills Arnau built are agents — they use specific tools to do real tasks, not just describe how those tasks should be done.*


---

## Module 8

So far this course has focused on text: language models that read and generate words. But AI can also generate images, and for someone working in a visual profession, this is often the part that feels most immediately relevant — and most confusing.

Image models work differently from text models. Understanding how they work changes how you use them: what to expect, what to ask for, and why certain limitations exist.

## How diffusion works: the darkroom analogy

Most contemporary image AI — Midjourney, ChatGPT Images, Flux, Adobe Firefly, and similar tools — uses a technique called diffusion. The name comes from the physics of how particles spread through a medium, but the practical intuition is best understood through a different image entirely.


> **Developing a photograph:** In a traditional darkroom, you begin with photographic paper that appears blank. You expose it to an image, then submerge it in developer solution. Gradually, out of apparent chaos — a uniform grey surface — an image begins to resolve. Forms emerge, then details, then tonal relationships. The final photograph was always latent in the paper; the process was one of progressive revelation.

Diffusion image models work in a structurally similar way, but in reverse and then forward again. During training, the model learned what it looks like to progressively add random visual noise to an image until nothing recognisable remains. During generation, it runs this process backwards: starting from pure noise and gradually removing it, guided by your text description, until an image resolves.


This is why the output is generative rather than retrieved. The model is not finding an image that matches your description from a library. It is synthesising a new image, pixel region by pixel region, guided by what your prompt suggests the result should look like.

## What image models are genuinely good for

For interior design work, image AI has several legitimate uses that fit into a professional workflow:

**Useful in a design practice**
- Useful in a design practice
- Moodboard concept images — generating an atmospheric image that captures a feeling or direction, used as a starting point for discussion with a client
- Texture and material exploration — generating visual references for surface qualities, patterns, or material combinations that are hard to describe in words
- Spatial atmosphere sketches — rough impressions of how a light quality, colour direction, or furniture configuration might feel in a space
- Inspiration beyond your image library — generating something adjacent to a reference you already have, but shifted in tone or period
- Presentation backgrounds and context images — generic architectural photography-style images for presentation decks when you do not have photography


The common thread: these are all *generative inspiration* uses. The AI is a tool for expanding visual vocabulary, not for producing final deliverables.

## Where image models fail — and why

**Where image AI struggles**
- Where image AI struggles
- Accurate text in images — generated text is almost always wrong, garbled, or non-existent. Do not expect correct product labels, signage, or captions
- Realistic human hands and fingers — hands remain a persistent challenge; they routinely appear with the wrong number of fingers or in anatomically impossible positions
- Specific real products — asking for a specific sofa from a specific brand will produce something that looks vaguely similar, not an accurate representation
- Architectural accuracy — generated spaces look plausible but rarely comply with real proportions, structural logic, or building physics
- Consistent characters or spaces across images — generating the same room twice, or the same person twice, is not reliably possible without specific techniques
- Fine material detail — the general impression of marble, linen, or aged brass may be good; the specific grain or weave will be invented


Most of these limitations trace back to the same root: the model is not rendering reality — it is synthesising a plausible image from patterns it has learned. Hands are hard because their exact configuration varies enormously and the model averages across this variation in ways that produce extra fingers. Text is hard because letterforms require precise spatial relationships that the pixel-level synthesis process does not naturally preserve.

## Prompting for image models

Image model prompting is its own discipline, somewhat different from text prompting. A few principles that transfer directly from design practice:

**Describe the feeling, not just the objects.** "A living room with a navy sofa and brass coffee table" produces a generic result. "A living room at dusk, a navy sofa catching the last light through tall windows, a worn brass coffee table with the patina of years" produces something with atmosphere.

**Reference styles, periods, and photographic qualities.** "Shot on medium format film, late afternoon light" gives the model compositional and tonal vocabulary. "In the style of Axel Vervoordt's atmospheric photography" provides aesthetic direction.

**Iterate quickly.** The first output is almost never the final one. Generate several variations, notice what is working, and refine. The workflow is closer to mood board curation than final production.

**Treat it as a starting point.** The most effective use of image AI in professional practice is not to generate finished work, but to generate raw material — something to react to, edit, or use as a direction-setting reference.


> **Try this prompt:** A quiet bedroom in a converted warehouse apartment. Exposed concrete ceiling, warm wood floors, a single low bed with undyed linen. Late morning light from a large north-facing window. The mood is monastic but not cold — lived-in, personal, calm. Shot on medium format film.

> *Try this in Midjourney, ChatGPT Images, or Flux. Then generate three variations — notice how small changes in the description shift the output.*


**Key idea:** *Image models synthesise new images from noise, guided by your description — they are excellent for generative inspiration and atmospheric reference, not for accurate representations of real products, spaces, or text.*


---

## Module 9

This module is different from the others. Rather than principles, it offers recipes — specific, repeatable workflows for tasks that come up regularly in interior design practice. Each one is ready to use today.

The goal is not completeness. It is to give you five concrete workflows that work, so you can see the pattern and adapt it to the tasks in your own practice that feel slow or repetitive.

## Recipe 1: Palette from a photograph

**When to use:** You have a reference image — a fabric swatch, a landscape, a piece of art — and you want to extract a colour palette with names and character descriptions.

**The workflow:**
1. Open a new conversation with Claude
2. Upload the photograph
3. Use the prompt below


> **Try this prompt:** I'm attaching an image that captures the colour mood I want for a living room project. Analyse the colours present in the image and propose a interior design palette based on it. For each colour: give it a name that would work on a specification sheet, describe its character in one sentence, and suggest a primary use (wall, textile, accent, etc). I want 5-6 colours total, including at least one dark and one near-neutral. Format as a simple list.

> *The key move: asking for a specification-ready name and a primary use alongside the description. This makes the output immediately usable, not just poetic.*


**What to do with the output:** The AI's colour names are a starting point, not final. Use them as the brief for your own selection from actual material samples. The character descriptions are useful for client presentations.

---

## Recipe 2: Accessibility and contrast check

**When to use:** Before finalising a colour scheme, you want to check that text, wayfinding, or key visual elements meet accessibility standards.

This is where the dedicated accessibility skill Arnau built is more reliable than a general conversation — it runs an actual check rather than guessing. But if you want a quick conversational assessment:


> **Try this prompt:** I'm specifying a colour scheme for a retail interior. The primary wall colour is a warm off-white (approximately #F5F0E4). The signage and wayfinding text will be in a deep terracotta (approximately #8B3A1E). The floor is a medium warm oak. Can you assess whether this combination is likely to meet basic accessibility standards for visual contrast? Be specific about which pairings work and which might be borderline — and what I should test properly before finalising.

> *Use hex codes when you have them — they are far more precise than colour names, which the model interprets inconsistently.*


**Note:** A conversational model can give you a useful preliminary assessment, but formal accessibility compliance requires verification with proper contrast-checking tools. The AI is helping you identify where to focus your checking, not replacing the check.

---

## Recipe 3: Client email rewriter

**When to use:** You have written a draft email to a client, but it is too long, too blunt, or the tone is off. Or you have a difficult message to deliver and you want help finding the right language.


> **Try this prompt:** Rewrite the following email to a client. The situation: we need to inform them that the custom rug they ordered has a 10-week delay. We are proposing that in the meantime, we install a temporary sisal rug we have in our warehouse, which will allow the rest of the installation to proceed on schedule. The client is warm but formal — they appreciate professionalism. Keep the email under 180 words. Do not open with 'I hope this email finds you well.' End with a clear next step.\n\n[Paste your draft here, or leave blank for a fresh draft]

> *If you are starting from scratch rather than rewriting, remove '[Paste your draft here]' and the model will write from the brief alone. If you have a draft, paste it and it will improve it.*


**Variation — difficult message:**


> **Try this prompt:** I need to tell a client that their budget will not accommodate the specification they have approved, and that we need to have a conversation about where to adjust. I want to be honest without being alarming, and I want to open the door to a constructive conversation rather than just delivering bad news. Draft an email that does this in under 200 words. The client has been easy to work with and we have a good relationship.

> *AI is particularly useful for difficult messages — it helps you find language that is clear without being blunt, and warm without being evasive.*


---

## Recipe 4: Specification sheet tidier

**When to use:** You have a rough specification — either written quickly, assembled from notes, or received in a messy format from a supplier — and you want to make it clear and consistent before it goes out.


> **Try this prompt:** Tidy the following room specification. Make it consistent in format and language, flag anything that is ambiguous or that a contractor might misinterpret, and note any information that seems to be missing. Do not change what it says — only how it says it, and point out problems.\n\n[Paste specification here]

> *The instruction 'do not change what it says' is essential. Without it, the model may helpfully invent details to fill gaps — which is worse than leaving them as gaps.*


---

## Recipe 5: Source-list idea generator

**When to use:** You are in the early stages of a project and want to expand your sourcing options beyond your usual suppliers — or you want a first pass on what categories to source before doing the actual sourcing.


> **Try this prompt:** I am specifying a kitchen for a residential project. The aesthetic direction is quiet Nordic modernism — natural materials, restrained palette, very high quality but not ostentatious. The client has a generous budget. Give me a sourcing list: the categories of items I need to specify (not specific products — categories), organised by: (1) primary structure and surfaces, (2) fittings and hardware, (3) lighting, (4) textiles and soft elements. For each category, note any material or finish direction that fits the brief.

> *This is a useful starting framework for a new project type or a category you are less familiar with. The model has read an enormous amount about sourcing conventions across different aesthetic territories.*


## The pattern behind the recipes

Every workflow above follows the same logic:
- Give the model a clear role and context
- Define the output format explicitly
- Include the constraints that protect you (do not change what it says, flag problems rather than resolve them, keep under X words)
- Treat the output as raw material, not a finished product

That last point is important. The fastest users of AI in professional practice are not the ones who accept the first output — they are the ones who iterate quickly, treating the model as a fast collaborator who needs good direction.


**Key idea:** *The goal of AI in your workflow is to spend less time on language and formatting, and more time on the decisions that require your actual expertise — the ones no model can make for you.*


---

## Module 10

If you have read this far, you have built a mental model of AI that will serve you well. But there is one more skill worth developing, and it is the one that protects everything else: knowing how to stay informed without being overwhelmed.

The AI industry moves at a pace designed to make you feel perpetually behind. New models, new tools, new benchmarks, new breathless announcements. Most of it does not require your attention. Almost none of it requires you to immediately learn something new.

Here is how to tell the difference.

## Why this course will not go out of date

The content in this course is deliberately about principles, not products. The specific version of Claude you are using today will be replaced by a newer one. The specific features of Midjourney will change. The relative rankings of models will shift.

But the following things will remain true:
- Language models predict text by pattern-matching against their training data
- Context windows determine what a model can hold in mind at once
- Prompting is fundamentally a briefing exercise
- AI is reliable for language tasks and unreliable for factual claims
- The best tool for a task depends on the nature of the task, not the hype cycle

These are properties of how the technology works, not features of a particular release. Understanding them means you can evaluate any new tool, update in seconds, without reading another course.

## The ten-minute evaluation framework

When a new AI tool appears and someone tells you it will change everything, here are three questions to ask before you invest any time in it:

**1. What does it do that tools I already use cannot?**

This sounds obvious, but most new AI tools do one of a small number of things: generate text, generate images, search the web, edit video, or combine these. If you already have a reliable tool for a category, the question is whether the marginal improvement is worth the switching cost.


> **The new supplier:** When a new tile supplier opens and a colleague says you should try them, you do not immediately change all your sourcing. You ask: do they have something my current suppliers do not? Is the quality genuinely different? Is the relationship worth building? You apply a light but real filter before investing. Do the same with AI tools.


**2. Can I try it on a real task in ten minutes?**

Most good tools earn their keep immediately. Take a prompt from your actual work — a client email, a specification check, a palette description — and run it through the new tool. Compare the output to what you get from the tool you already use. If the new tool is meaningfully better for that specific task, note it. If it is not, move on.

Benchmarks and blog posts about AI tools are rarely as useful as this simple test. Your specific use case matters more than the average case.

**3. Does it fit how I already work, or does it require me to change how I work?**

Tools that require significant workflow changes to deliver value are worth treating with skepticism unless the value they deliver is substantial. The best AI tools fit into the shape of what you already do — they speed up a task or improve its quality without adding new complexity.

## What actually requires your attention

Not all AI news is equal. The following kinds of developments are worth paying attention to:

**New capabilities in tools you already use.** If Claude gains a new feature — better image understanding, longer context, a new integration — this is directly relevant to you and worth exploring briefly.

**A new category of tool that addresses a specific pain point.** If a tool appears that does something genuinely useful that previously required significant manual effort — and it is reliable — this is worth investigating.

**A significant change in pricing or accessibility.** If a capability that was previously expensive becomes free, or a tool you rely on changes its terms significantly, this affects your practice.

What does *not* require your attention: new model releases that score slightly higher on benchmarks, speculative reports about what AI might do in five years, and tools in categories that are not relevant to your work.

## A personal note on independence

This course exists because Arnau wanted to give you something more useful than a tool: a clear enough understanding of how AI works that you can make your own judgments, without having to ask whether a new thing is worth your time.

The goal was never to make you an AI enthusiast or an AI skeptic. It was to make you independent — someone who can pick up a new tool, run it through a real task, and decide for themselves whether it earns a place in their workflow.

That independence is more durable than any specific recommendation. The specific tools will change. The ability to evaluate them clearly will not.


> **Try this prompt:** A new AI tool has just been released. It is described as 'a revolutionary AI assistant for creative professionals.' Using the three-question framework from this module, what would you need to know about it before deciding whether it was worth trying? What would the ten-minute test look like for someone in interior design?

> *Let the model help you stress-test the framework itself. Does its answer match what you would do? Where does it add something useful, and where does it miss the point?*


**Key idea:** *Principles outlast products. Understand how the technology works and you can evaluate any new tool yourself — no course, no influencer, and no hype cycle required.*

