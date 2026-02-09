# Interview with Levi Garcia - LAFA

**Date:** February 6, 2026
**Participants:** Levi Garcia (LAFA, Head of Product) and Jose Diaz (candidate)
**Type:** First interview - screening
**Referral chain:** Diego Bideran (ex-JOKR) -> Diego Villalan (Stori) -> JJ (founder LAFA) -> Levi

---

## Executive Summary

### About LAFA
- Founded by JJ (ex-Stori), LAFA manages fleets of Chinese EVs (Geely, JAC, GAC) for platform drivers like DiDi in CDMX
- **Two products:** (1) Driver-as-Employee: the driver only drives, LAFA charges and maintains the car; minimum billing $6K MXN/week. (2) Lease-to-Own (LTO): rent-to-own over 4 years for experienced drivers who bill up to $40K MXN/month
- **Current state:** ~150 cars operating, target of 2,000 by year-end
- **Tech stage:** 0 to 1 - everything is managed through spreadsheets; looking to build internal tools with AI and a team of just 3 people
- **Charging cost:** ~$300 MXN/week vs $1,200-$1,500 for gasoline (roughly 75-80% reduction)

### What they're looking for in a candidate
- Experience building with AI (ideally shipped to production)
- Ability to build efficient internal tools
- Hybrid product + technical profile that replaces a large engineering + PM team

### What Jose presented
- Career path: FAVO (social commerce) -> JOKR/InRetail (quick commerce) -> Yape (super app)
- AI project at Yape: classification of 300K WhatsApp conversations/month with LLM (12% error vs 30% human)
- Personal project: NUMA (SaaS for healthcare professionals with AI)
- Building stack: Replit -> GitHub -> Claude Code in Cursor

### Levi's reaction
- Positive about the Product Management background with strategy
- Interested in the backend and database knowledge
- Engaged with the NUMA demo
- Shared a similar experience: his wife built a ticket classifier for Stori

---

## Full Transcript

### 1. Small Talk - Sports and personal connection

**Levi:** Hi Jose, how's it going?

**Jose:** Hey Levi, nice to meet you. All good? Great.

**Levi:** Sorry about the delay — I swim on Fridays and it ran later than I expected.

**Jose:** No worries. At the pool?

**Levi:** Yeah, at the Olympic pool here in Mexico City.

**Jose:** Nice. My brother was a swimmer in college — he got scholarships and book discounts, the whole thing. My mom always wanted me to be a swimmer too, but I'm a bit of the rebellious younger brother, so I went into martial arts instead.

**Levi:** I just started because my wife grew up on the beach, so she's really comfortable in the water and always wants to be in the water. I wasn't as comfortable — I can swim, I'm not going to drown or anything, but not super comfortable. So yesterday I decided to take classes. I've never really focused on just one sport, I always do whatever I feel like. Right now it's swimming, padel, and maybe yoga here and there to stretch a bit.

**Jose:** Great. Padel was born in Mexico and took off in Spain, Argentina, and here in Peru it's gotten really popular too. I play a lot with people from work — we even have annual padel tournaments. Last year's tournament, we came in second place.

**Levi:** So you're pretty good then. That's awesome. I love it. I've been playing for less than a year and I'm hooked. I'm even taking lessons to improve, and I'm going to open a padel business — I'm going to set up some padel courts.

**Jose:** That's great.

**Levi:** So I'm all-in on padel too.

**Jose:** Nice.

**Levi:** Hopefully in the future it works out and we can have a match.

**Jose:** Absolutely.

---

### 2. Levi's Introduction and LAFA Overview

**Levi:** Hey, so taking advantage of the flow here, let me introduce myself and tell you a bit about me and LAFA. I don't know if anyone's already told you about LAFA, but I'd like to give you that introduction.

I'm Levi Garcia, I've been a Product Manager for about 12-13 years. I started working in startups, always in fintech: payment card issuance, financial products, payment channels. At Clip I also managed the core transactional system, and now at LAFA, I handle all of product as well.

I'm a mechatronics engineer by training and I worked in Mexico's metalworking industry. I like to think I was doing a bit of Product Management back then because my job was to assess processes, define what could be automated, and program cells, recommending the necessary machines. In a way, I like to think I was doing some PM work even then, but formally in fintech areas it's been 12 years.

Currently, LAFA was founded by a friend of mine from Stori — I don't know if you're familiar with Stori in Mexico. He invited me to collaborate at LAFA, and I'm also a car enthusiast, so I really liked the idea and that's why I'm here working with JJ. I think you know JJ.

**Jose:** No, actually I don't. My former boss is Diego Villalan, he was at Stori — I don't know if you knew him. I had a former boss at JOKR named Diego Bideran, and after JOKR he moved to Stori, met JJ there, and that's how I got to you. But I haven't spoken with JJ yet — you're my first point of contact.

**Levi:** Got it. OK, yeah, the idea is that since you'd be working with me, we start with this first interview with me.

---

### 3. LAFA's Business Model

**Levi:** LAFA was born from this idea of exploring the market in Mexico that needs effective and eco-friendly mobility. After exploring several ideas, JJ landed on this concept of getting into fleets. There's already a successful case — well, several successful cases. Exactly like us there's VEMO which works with Uber, and there are others that work for independent operators who don't necessarily work on platforms like Uber or DiDi.

We started with the **Driver-as-Employee** product: we have the fleets, the cars, we charge the car, we maintain it — you just have to show up and drive your car during your shift, make sure you bill at least **6,000 pesos a week**, and you're set. That was the first model we launched, already with a DiDi partnership.

Then in December we launched **LTO (Lease-to-Own)**: we lease the car with the option to own it after four years. Obviously these are much more experienced, low-risk drivers who know how to drive, who bill up to **40,000 pesos a month** — they're really good.

The idea is to build an ecosystem where we manage fleets very efficiently and drivers only need to focus on driving. We ensure high service quality, cars in good condition at all times, electric cars that make sense for a city like Mexico City.

Eventually we want to build out an entire EV ecosystem: charging centers, maintenance, tires for these models. We work exclusively with Chinese models — **Geely, JAC, GAC** — and eventually we'll evaluate other partnerships with other Chinese brands.

That's how it started. It launched last year and we currently have about **150 cars operating** with a goal of **2,000 this year**.

---

### 4. The Technology Challenge (What they're looking for)

**Levi:** But what stage are we at? We're at a stage where operationally it already works, but **everything is managed through spreadsheets** and we want to start building the internal tools that help us have an efficient, well-managed process with crystal-clear transparency for stakeholders, enabling better decisions and relieving the operational burden.

We want to do this through a proper platform, and taking advantage of the fact that LAFA is in a **0-to-1 stage** where nothing exists and we can build whatever we want. We want to leverage this to build more efficiently with **an AI platform, a team of three people**. We believe we can build everything without needing a large engineering team and product managers. That's the challenge.

We're looking for candidates who've already played with AI and have built something — ideally shipped it to production — and can share their experiences.

So that brings me to: go ahead and introduce yourself, tell me about you, your experience, and what your experience is with AI platforms.

---

### 5. Jose demonstrates prior knowledge of LAFA

**Jose:** Great. Quick note about LAFA first. I've been researching you guys and I find the model quite innovative. I think JJ has strong founder-market fit because he learned Risk Scoring at One Capital, then learned the local Mexican market, and I believe he was also on the advisory board at Megametrics, which is asset-heavy leasing. And now he's in China building partnerships with these brands.

**Levi:** And we work with China directly, with DiDi. There's definitely a real flow of things with the Chinese side.

**Jose:** Right. And looking at it from the driver's side: I was seeing that gasoline costs are roughly 40-50% of their income, and converting to EV, to electricity, could reduce that by about 70-80%. So it's truly a game changer for this segment of people and it's completely tangible.

**Levi:** The drivers tell us they used to spend $1,200-$1,500 on gasoline per week and now they're spending **$300 pesos**. Well, they don't spend it — we do — but it's $300 pesos in charging per week. It's a pretty significant reduction.

**Jose:** Right. And on top of that, there are global trends pushing toward a more circular, eco-friendly economy. I was also looking at a regulation in Mexico City where if you have a gasoline car doing taxi services, you can't operate seven days a week — only six max. So that takes away flexibility from the driver.

**Levi:** Exactly, yes. The driver doesn't have to worry about the car — he just shows up and knows that at the start of his shift there'll be a car ready for him to drive.

**Jose:** Yeah, I found the model really impressive, and I saw that a lot of people are from Stori, so they're moving as a pack — there's already trust built up and all of that.

---

### 6. Jose's Background - Career Path

**Jose:** OK, so let me tell you about myself. I studied Business Administration at Universidad del Pacifico here in Peru. Midway through my degree I realized I liked the startup world, the tech world, and wanted to work at that intersection of business and technology.

But my entire environment — I'm talking about 2018 or so — revolved around traditional coursework: restaurant operations or marketing plans for a protein bar. Very traditional stuff.

That year I had the opportunity to travel to San Francisco for a global **Singularity University** conference and I learned a lot about exponential technologies: AI, nanotechnology, biotechnology, computer vision, blockchain, etc. It really transformed my perspective and vision. I also visited the headquarters of Airbnb, Google, etc. And it reaffirmed that I wanted to dedicate myself to the startup and innovation world.

#### FAVO (Social Commerce)
I worked at FAVO, a startup, as one of the first 10 employees. It was social commerce — selling grocery products through a direct-sales network of entrepreneurs. We gave them the virtual store, and when the entrepreneur generated sales, we delivered the products to their home so they could distribute to others. I was there for about two years, between the pre-Seed round and I left after Peru's largest fundraising round. By then we were operating in Peru and Brazil with over 400 people. It was an incredible experience.

#### JOKR -> InRetail (Quick Commerce)
Then I joined JOKR, where I met Diego. JOKR was astronomically crazy — it was a global startup. In total we raised about **$500 million dollars**. Gone in two years.

**Levi:** Wow. The burn rate was insanely high.

**Jose:** It was Quick Commerce. I don't know if you have Rappi/Turbo there — that's kind of what we were trying to do. In Latin America and in some parts of the US too. And just as fast as we raised the money, it was gone. We burned through many markets, shut down many.

We sold the Peru operation to a local player called **InRetail**. InRetail bought the brand and the operation, but not the technology. So 70 of us transferred to this InRetail team and we had to rebuild everything from scratch. Fortunately, we already had the playbook of what we wanted to build, but heavily leveraged on the teams and technology the group already had.

There were three rounds of layoffs. Fortunately I kept my role and started taking on responsibilities beyond **growth** into **data** and **product**. That's where my 360-degree business expertise begins:

- **Growth:** seeing how many users we needed to acquire, how many to retain, designing coupon campaigns, sending communications. I had a small team, led growth.
- **Data:** I led the Data Lake migration from **Snowflake to BigQuery** (for compatibility with the InRetail group). We had to connect all the backend tables, payment gateway, microservices.
- **Product:** I took on the Product Manager role for the JOKR Peru app (customer app) and for **Internal Tools**:
  - **Commercial Back Office:** where analysts could upload products, stock, prices, promotions
  - **Heart (CMS):** Content Manager for the app, where we could create banner campaigns, group products, design drag-and-drop algorithms to personalize the app by user segments and improve conversion rates

**Levi:** Order Status and all that. Why did you decide to move off Snowflake?

**Jose:** Because the group was already using BigQuery, so we had to migrate.

**Levi:** So it was for compatibility? Yeah, that surprised me. But if it was legacy, compatibility.

#### Yape (Super App - Current)
**Jose:** After that, for the past two years I've been at **Yape**. I don't know if you've heard of Yape. Yape is Peru's super app. Our parent company is Banco de Credito del Peru, the largest bank here. And Yape has **18 million users in a country of 33 million people**. We're like the Venmo of the US but in Peru, with a huge market share because we have massive distribution through the bank.

What we're building is a super app. The core feature was peer-to-peer payments. Just with your phone number you could transfer money. But then we started creating an ecosystem of features: lending, insurance, retail, e-commerce.

I joined as **Product Owner for CX Retail Strategy**. For me it was something completely new because I was going from a growth role, to product, to CX:
- In **growth** you have to be an optimizer focused on revenue
- In **product** you have to be a builder
- In **CX strategy** I had to be a guardian of how to improve the user experience

Basically my role at Yape is to look after two business verticals: **commerce** and **insurance**. With my team, we analyze experience metrics — NPS, contact rate, complaints, etc. — and co-design root cause solutions with the product teams.

And in recent months I started getting into **Artificial Intelligence** projects within the bank.

**Levi:** Because what you've told me so far, I mean it's quite interesting, but it's entirely a Product Management story — which looks great. Product Management with a lot of strategy, I'm impressed. And with your backend and database knowledge, quite good. But yeah, let's keep going.

---

### 7. AI Project at Yape - Conversation Classification

**Jose:** Great. At Yape I did a project to reclassify WhatsApp conversations between yaperos (our users) and advisors. Since Yape is a super app, we have **25 different features** and over **1,000 contact reasons**. The advisor has to tag that contact reason manually.

**Levi:** We always had that problem at Stori. No matter how much you train people, no matter how well you build a cause tree, people end up putting whatever they want, and then you listen to the conversations and go "that's completely off" — the ticket wasn't classified with what the customer actually wanted. And yeah, actually my wife built something similar for Stori that classifies everything really well. So you built something like that.

**Jose:** Yes, we're classifying **300,000 contacts per month** (WhatsApp conversations) across the 25 features and 1,000 typologies (we reduced them to about 450). The advisor error rate was **30%**, our AI is getting it wrong about **12%**. Both make mistakes, but the AI makes far fewer.

**Levi:** And the AI can keep improving, learning more. If you build your own model, it keeps getting better.

**Jose:** And not just that — it doesn't just tag, it also provides **summaries** of:
- The yapero's pain point during the conversation
- The solution the advisor provided
- The **emotion** the yapero was left with at the end (frustrated, anxious, worried, satisfied, etc.)

**Levi:** So what you do is send agents to analyze all the calls, all the text gets converted to text, you analyze everything and extract sentiment. And you're learning. Are you doing some kind of loop to retrain your agents, or haven't you gotten there yet?

**Jose:** No. Here's how it works: the business advisor uses **Zendesk** as the CRM and all Zendesk messages flow to our data lake, which is **Databricks**. In Databricks we have the worksheet, which is the AI model with all the prompts that classifies the conversations.

What we do to train the model is maintain a **Golden Dataset** — tickets manually classified by a human so we can compare the AI results and see whether prompt iterations are working or not. We're not doing reinforcement learning retraining — that's a more advanced phase.

**Levi:** But a kind of manual tuning in a way.

**Jose:** That's the AI side at Yape.

---

### 8. Personal Project - NUMA (Demo)

**Levi:** Tell me about personal projects. I saw the link they sent me — it's interesting. Tell me about NUMA.

**Jose:** Sure. Last year I got the itch to apply for an MBA and head to the US, but several things happened and I said: this is a unique opportunity to actually learn technology and become a builder. I decided I can do an MBA at any point in my life. I'm going to dedicate a year to really understanding and learning AI, studying seriously, and then decide what to do.

I want an AI role and I'm going to learn in my free time, my evenings, my weekends until I land the full-time role.

What I did was first sign up for **Reforge** (education platform).

**Levi:** I've heard of it but never used it.

**Jose:** There I learned the foundations of reasoning, memory, knowledge, etc. How LLMs work, tokens, context windows. Then I learned how to apply AI to growth, product, or technology. And once I reached that point, I said OK, time to build.

That's when I decided to build **NUMA**. Why? In December I started caring a lot more about my health. I started seeing a nutritionist, a psychologist, and a dentist, and all three had the same problems:
1. They sent me messages that weren't personalized
2. Scheduling was terrible
3. I had no clarity on my treatments and payments

**Levi:** Yeah, there's a similar one in Mexico called Doctoralia.

**Jose:** Yeah, I benchmarked it. Doctoralia is more of a marketplace — it connects patients with doctors. I was focusing more on a **SaaS for healthcare professionals** to manage their practice.

**Levi:** On Doctoralia the doctor can manage their calendar, open their schedule so you can book, and also start generating more personalized communication channels. They can request information in advance, medical studies, etc. There's some calendar functionality, which was the big problem before Doctoralia in Mexico.

**Jose:** Right, NUMA hadn't gotten that far yet. Let me do a quick demo.

#### Development Tools

**Levi:** I think to build it, it looks like you used Replit or V0, or did you use Lovable?

**Jose:** I used Replit, but the way I did it was: I deployed or wrote the initial prompt with **Replit, Lovable, Figma Make, and v0 at the same time** — same prompt — compared which one I liked best and went with Replit. Then from Replit, when I wanted to do more advanced things, I pushed the project to **GitHub** and started using **Claude Code inside Cursor** to keep editing.

**Levi:** You know, that's something I'm just learning right now. I think the recipe that's going to emerge is: even if you create your first version in Replit or Lovable, eventually move your code to GitHub, keep it on GitHub as the hub of your repository, and edit from Replit when it's something that can be done from Replit, but sometimes you'll need to edit from Claude Code. You can use different tools with GitHub as the central repository. I just arrived at that exact same point — awesome.

#### NUMA Demo

**Jose:** This is the onboarding. Here I can register my practice, I can say I'm in Peru, that I'm a psychologist, that I'm independent, that it's just me, that I'm the owner/admin. And I can configure my services — the individual session that lasts 50 minutes and I charge 150 soles — or I can add new services. And then I can configure my availability. For example, on Fridays I can say I don't want to work, or on Mondays I have a double shift.

Once I finish configuring this, I arrive at the **professional portal**. I can share a public link, which is like the Calendly part, where I can share on social media so people can book a session.

And here's the patient authentication. Basically the patient can decide whether they want the professional to **use AI during sessions or not**. I'll show you in a moment why that's important.

**Levi:** Let me give you a use case to keep in mind. Maybe it's not that common in Peru yet, but this just happened to us yesterday. My wife is American, so sessions with doctors are usually in Spanish and she understands 80-90% of what's said, but with that 10-20% she doesn't catch, she loses the general idea. If we had a **bilingual summary**, that would be great for these cases. And here in Mexico there are already so many foreigners in Mexico City that international relationships are very common.

**Jose:** Right, yeah — you're right next to the US after all. I'm going to add a patient. Each patient here you'll see as "invited." Once I authenticate as a patient, it shows as active. That's the patient profile — I can have their personal information, documents, billing history, and I can **generate notes with artificial intelligence** before the session takes place.

The idea is that the patient can see sessions, the notes history, and have traceability of their entire clinical history.

Basically I have **ChatGPT running in the background via API**, which records the session and at the end transcribes it and generates a summary in whatever format the healthcare professional needs.

---

## Key Data Points

| Data | Value |
|------|-------|
| Cars currently operating | ~150 |
| Target cars for 2026 | 2,000 |
| Minimum weekly billing (Driver-as-Employee) | $6,000 MXN |
| Top driver monthly billing (LTO) | $40,000 MXN |
| Weekly EV charging cost | ~$300 MXN |
| Weekly gasoline cost (before) | $1,200-$1,500 MXN |
| EV brands | Geely, JAC, GAC |
| Main partnership | DiDi |
| Planned tech team size | 3 people |
| Tech stage | 0 to 1 (spreadsheets) |
| LTO product launched | December 2025 |

## Next Steps
- Interview with JJ (founder) pending
- Jose would report directly to Levi
