# Foundational AI Concepts: Collected Insights
> Reforge Technical Foundations — Module 04 | PM-oriented guide to understanding, evaluating, deploying, and optimizing AI language models

## Sources

| # | Source | Type | Topics |
|---|--------|------|--------|
| 1 | Reforge Technical Foundations — Module 04: Foundational AI Concepts | Course module | LLMs, neural networks, training paradigms, model evaluation, deployment, performance optimization |

## Executive Summary

This module provides product managers with the technical foundation needed to work effectively with AI and machine learning teams. It is not intended to turn PMs into ML engineers, but to give them enough mechanistic understanding to make informed product decisions, set appropriate evaluation criteria, and have productive conversations with technical counterparts. The module covers the full lifecycle of working with AI—from understanding what LLMs are, to training and evaluating models, to deploying them in production and iterating on their performance.

The central thesis is that AI, particularly large language models, operates through a specific and understandable mechanism: statistical prediction over language patterns. An LLM is not a mysterious black box that "understands" language in a human sense. It is a system that has learned, through exposure to vast amounts of text, which words are most likely to follow which other words in which contexts. This prediction mechanism, powered by the transformer architecture's attention mechanism, is what produces the seemingly intelligent outputs that have captured the world's attention. Understanding this mechanism—rather than treating AI as magic—is what separates a PM who can make good decisions from one who either over-trusts or under-leverages the technology.

The module establishes a critical distinction between what makes LLMs powerful and what makes them unreliable. Their power comes from generalization: by learning patterns across billions of text examples, they can handle situations they have never explicitly seen before. Their unreliability comes from the same source: because they are fundamentally predicting probable continuations rather than reasoning from verified facts, they can confidently generate plausible-sounding but entirely incorrect information. This duality—powerful generalization paired with confident hallucination—is the central tension that PMs must navigate when building AI-powered products.

The training and evaluation section establishes the vocabulary PMs need to collaborate with ML teams: supervised vs. unsupervised vs. reinforcement learning, precision vs. recall trade-offs, overfitting vs. underfitting. These are not academic distinctions—they directly shape product decisions. A PM who understands that precision matters more than recall for medical diagnosis but recall matters more for recommendations will make fundamentally different product choices than one who treats "accuracy" as a single undifferentiated metric.

The deployment framework is perhaps the module's most practically valuable contribution. It presents a disciplined 7-step process that begins with defining the user problem (not the AI capability), establishing a non-AI baseline, identifying where AI is specifically an unlock, defining evaluation metrics, assessing hallucination risk, factoring in cost, and iterating. This framework is a systematic guard against the most common failure mode in AI product development: starting from the technology rather than the problem.

Finally, the performance optimization hierarchy gives PMs a clear escalation path: start with the foundation model as-is, add prompt engineering, layer on RAG, consider fine-tuning, and only build custom models as a last resort. The key strategic insight is that each step up the hierarchy increases both capability and cost, and that new foundation models regularly make previous optimization work obsolete—making it critical to invest as little as possible in lower-level optimization while still meeting performance requirements.

The module leaves several important questions open, particularly around the rapidly evolving landscape of AI capabilities, the organizational design implications of AI teams, and the ethical dimensions of deploying AI in products that affect people's lives.

---

## 1. What LLMs Actually Are: From Prediction Engine to Generalization Machine

### Core Concept

A large language model is, at its most fundamental level, a prediction engine. Given some input text, it predicts what comes next. If you type "The sky is," it predicts "blue." This seems simple, but the apparent simplicity is deceptive. What makes LLMs remarkable is not the basic prediction mechanism—which is conceptually straightforward—but the scale at which it operates and the emergent capabilities that scale produces.

An LLM is a language model that has been trained on massive amounts of text data, giving it billions or even trillions of parameters. These parameters are the distilled "knowledge" the model has extracted from its training data—the statistical patterns of how words, phrases, and ideas relate to each other across the entirety of the text it has consumed. The model doesn't store facts the way a database does; instead, it encodes relationships and probabilities. It knows that "Paris" frequently appears in the context of "capital of France" not because someone programmed that fact, but because the pattern appeared consistently across its training data.

The training process itself has two key phases. First, the model is exposed to vast amounts of text and learns by predicting the next word in each sentence, adjusting its parameters whenever it gets a prediction wrong. Over time, through billions of these corrections, it becomes increasingly accurate at capturing the patterns and relationships in language. Second, the model can be fine-tuned on specific tasks—answering questions, summarizing text, following instructions—to improve its performance in targeted areas. This two-phase approach (broad pre-training followed by targeted fine-tuning) is what allows a single model architecture to serve as the foundation for diverse applications.

### Underlying Mechanism

The mechanism through which LLMs handle novel situations—sentences they have literally never seen before—rests on five interlocking capabilities:

**Pattern learning:** During training, LLMs are exposed to such a massive volume of text that they internalize deep patterns about how language works. They learn that "apple" frequently co-occurs with "fruit," "tree," and "eat," and that certain sentence structures are more probable than others. These aren't rules that were programmed in—they are statistical regularities that the model discovered on its own.

**Contextual understanding:** LLMs don't process words in isolation. They consider surrounding words to determine meaning. In "She opened the door and saw a...," the model weights words like "cat," "person," or "box" as likely continuations based on the full context of the sentence, not just the immediately preceding word.

**Statistical probability:** After training, the model has an internal representation of how likely word sequences are. If it has seen thousands of sentences where "barked" follows "The dog," it considers "barked" highly probable in that context. This probabilistic reasoning extends to entirely novel sentences—the model can predict plausible continuations for sentences it has never encountered by drawing on the statistical patterns it has internalized.

**Generalization:** Rather than memorizing every possible sentence (which would be impossible), the model learns the underlying rules and patterns of language. This is the critical capability: it can generate coherent, contextually appropriate text for situations it has never seen, because it has learned the deeper structure that generates language, not just surface-level examples.

**Attention mechanisms:** The transformer architecture's attention mechanism allows the model to focus on different parts of the input text, weighing the importance of each word relative to the prediction it needs to make. In "The cat sat on the mat, and then the dog," the model uses attention to understand that the next word should relate to the dog, not the cat. This selective focus is what enables coherent long-range dependencies in generated text.

### Connections to Other Ideas

Understanding the prediction mechanism is the foundation for everything else in the module. The strengths and limitations of LLMs in real products (Chapter 2) follow directly from how prediction works—the model can generate remarkably coherent and contextually appropriate text (strength) but has no way to verify whether its predictions are factually correct (limitation). The training paradigms (Chapter 4) describe different ways to train models to make better predictions. The deployment framework (Chapter 6) exists precisely because the prediction mechanism, while powerful, requires careful engineering to produce reliable results in production. And the performance optimization hierarchy (Chapter 7) consists of progressively more intensive techniques to improve the quality of the model's predictions for a specific use case.

### Practical Application

For a PM, understanding the prediction mechanism changes how you think about AI capabilities. Instead of asking "can the AI do X?" you can ask a more precise question: "is X the kind of task where predicting probable continuations of text would produce a good result?" This reframing immediately clarifies why LLMs excel at drafting emails (probable continuations of professional language patterns) but struggle with precise mathematical reasoning (where the "most probable" continuation is not necessarily the correct one). It also explains why providing more context in a prompt improves results—you're giving the model more signal to condition its predictions on.

When evaluating an AI-powered feature proposal, mentally trace it back to the prediction mechanism. What is the model actually predicting? What patterns in the training data would support good predictions? Where might the model's predictions diverge from what users actually need? This mechanistic thinking is far more useful than treating the model as a magical capability that either "works" or "doesn't."

### Nuances & Limitations

The prediction framing, while accurate, can be misleading if taken too literally. LLMs exhibit emergent behaviors—capabilities that weren't explicitly trained but arise from the scale and complexity of the model—that go beyond simple "next word prediction." Chain-of-thought reasoning, analogical thinking, and multi-step problem solving are examples of behaviors that emerge from the prediction mechanism but aren't easily explained by it. The module is correct to ground the explanation in prediction, but PMs should also be aware that the gap between "predicting the next word" and "what the model can actually do" is wider than it might initially seem.

> "A language model is a type of artificial intelligence (AI) that is trained to understand and generate human language. It works by predicting the next word in a sentence based on the words that came before it." — Reforge, Module 04

> "LLMs learn by analyzing text from a variety of sources, such as books, articles, websites, and social media. The more text they analyze, the better they become at understanding the context and meaning of words and sentences." — Reforge, Module 04

> "Instead of memorizing every possible sentence, the model learns the underlying rules of language. This allows it to generate new sentences that follow these rules, even if they're different from anything the model has seen before." — Reforge, Module 04

---

## 2. LLMs in Real Products: Capabilities, Strengths, and Limitations

### Core Concept

The module transitions from "how LLMs work" to "what PMs can do with them" through a practical inventory of applications and an honest assessment of strengths and limitations. The applications inventory—customer support, content generation, data analysis, translation, personalized recommendations—represents the current mainstream use cases, each of which leverages the prediction mechanism in a slightly different way. Customer support chatbots predict appropriate responses given a user's query and conversation history. Content generation tools predict likely continuations of a writer's initial text. Translation systems predict the most probable rendering of a source text in a target language.

What unifies these applications is that they all operate in domains where "the most statistically probable continuation" is a reasonable proxy for "a good answer." This is the key insight for PMs: LLMs are most effective in domains where probable = useful, and most dangerous in domains where probable ≠ correct.

### Underlying Mechanism

The strengths and limitations of LLMs in products are direct consequences of the prediction mechanism:

**Contextual understanding** means LLMs can maintain coherent conversations, follow complex instructions, and generate text that feels natural and relevant. This is not true understanding in the human sense, but the practical effect—text that responds appropriately to context—is enormously valuable for product applications.

**Versatility** arises because the model has been trained on text spanning virtually every domain of human knowledge. The same model that can answer a customer support query can draft marketing copy, summarize a research paper, or translate a document. This versatility means a single technology investment can power multiple product features.

**Scalability** is a practical advantage: once deployed, an LLM can handle thousands of concurrent requests, making it economically viable for high-volume applications like customer support or content recommendations.

The limitations are equally important. **Accuracy is not guaranteed**—LLMs generate the most probable text, not the most truthful text, and they can produce confident-sounding nonsense. **Bias is inherited** from the training data, which reflects the biases present on the internet. **Resource intensity** is real—both training and running inference on LLMs requires significant computational resources, which translates directly to operational cost.

### Connections to Other Ideas

The strengths map directly to the applications (Chapter 1's prediction mechanism producing useful outputs at scale), while the limitations map to the deployment challenges (Chapter 6's emphasis on hallucination assessment, baselines, and metrics). The accuracy limitation in particular is why the evaluation framework (Chapter 5) emphasizes precision vs. recall—understanding which type of error matters more for your use case is critical when the model will sometimes be wrong. The resource-intensity limitation connects to the deployment framework's explicit step on factoring in cost (Chapter 6, Step 6) and the performance optimization hierarchy's emphasis on starting simple (Chapter 7).

### Practical Application

When evaluating whether to use an LLM for a product feature, map the use case against the strengths and limitations. Ask: does this use case tolerate occasional inaccuracy? (If not, you'll need heavy guardrails.) Does the training data likely contain bias that would harm users in this context? (If so, you'll need mitigation strategies.) Can you afford the inference costs at the scale you expect? (If not, consider whether a simpler solution suffices.)

A useful heuristic: LLMs are excellent for tasks where a human would review the output (content drafts, suggestions, recommendations) and risky for tasks where the output is consumed directly without review (automated medical advice, legal decisions, financial transactions).

### Nuances & Limitations

The applications listed in the module represent early mainstream use cases, but the field is evolving rapidly. New capabilities—multimodal understanding, autonomous tool use, long-context reasoning—are expanding the set of viable applications. PMs should treat the current application landscape as a floor, not a ceiling, while maintaining the discipline of evaluating each new capability against real user problems.

> "LLMs can power chatbots and virtual assistants that handle customer inquiries, reducing the workload on human agents." — Reforge, Module 04

> "While LLMs are impressive, they are not perfect. They can occasionally generate incorrect or nonsensical answers, especially for very specific or niche queries." — Reforge, Module 04

> "Because LLMs are trained on large datasets from the internet, they can inadvertently learn and reproduce biases present in the data. Ensuring that LLMs produce fair and unbiased outputs is an ongoing challenge." — Reforge, Module 04

---

## 3. Neural Networks & Deep Learning: The Technical Foundation

### Core Concept

The module provides a deliberately high-level treatment of neural networks and deep learning, positioning them as necessary vocabulary rather than deep technical knowledge. A neural network is a model architecture inspired by the structure of biological neurons—it has an input layer, one or more hidden layers of interconnected nodes, and an output layer. Data flows through these layers, being transformed at each step, until it produces an output.

Deep learning is the specific advancement that made modern AI possible. It refers to neural networks with many hidden layers—"deep" networks—rather than the shallow networks (one or two hidden layers) that preceded them. The critical insight is that a set of mathematical techniques made it possible to effectively train these deep networks, which previously would fail to learn properly beyond a few layers. This was not a conceptual breakthrough but a practical one: the idea of deep networks had existed for decades, but the ability to train them reliably is what unlocked the current era of generative AI.

An LLM, in this framing, is a neural network with a specific architecture (the transformer), an enormous number of layers, trained using deep learning techniques on massive text datasets. The depth of the network is what enables the powerful generalization capability—the ability to find patterns that span multiple domains (medical, legal, scientific, creative) simultaneously, much as a human brain draws connections across different areas of knowledge.

### Underlying Mechanism

The mechanism is hierarchical feature learning. Each layer in a deep network learns to recognize increasingly abstract patterns. In an image classifier, early layers might detect edges, middle layers detect shapes, and deep layers detect objects. In a language model, early layers process individual tokens, middle layers capture syntactic patterns, and deep layers capture semantic relationships and cross-domain connections. The depth of the network directly determines the level of abstraction the model can reach—and therefore the complexity of patterns it can discover.

The historical constraint was that training algorithms could not effectively propagate learning signals through many layers. The gradients—the mathematical signals that tell each layer how to adjust—would either vanish (becoming too small to be useful) or explode (becoming too large to be stable). The mathematical techniques that solved this problem (batch normalization, residual connections, improved optimization algorithms) are what the module refers to as the "key technical insight" behind the AI revolution.

### Connections to Other Ideas

This chapter provides the architectural context for understanding LLMs (Chapter 1). When the module says an LLM "generalizes" across domains, the mechanism is the deep learning architecture—many layers extracting increasingly abstract patterns. It also contextualizes the training paradigms (Chapter 4): supervised, unsupervised, and reinforcement learning are all methods for training neural networks, and deep learning is the technique that makes these training methods effective at scale. The performance optimization discussion (Chapter 7) also connects: fine-tuning modifies the weights of a pre-trained deep network, while prompt engineering works within the network's existing capabilities without changing its weights.

### Practical Application

For a PM, the practical value of understanding this distinction is primarily communicative and conceptual. When your ML team says "we need a deeper model," they mean more layers and more parameters, which means more training data, more compute, and more time—but potentially better performance. When they say "deep learning enables this," they're referencing the specific mathematical techniques that allow training of complex networks. Understanding these terms at the conceptual level prevents misunderstandings and allows the PM to ask better questions: "How many layers does the model have? How does that compare to alternatives? What would we gain from a deeper architecture?"

The key takeaway is that deep learning is not a type of AI—it is a training technique that unlocked the potential of neural networks by enabling them to be much larger and more complex. Every modern LLM, image generator, and AI system you interact with is built on this foundation.

### Nuances & Limitations

The module's treatment is intentionally simplified. Real neural network architectures involve many technical details (activation functions, dropout, learning rate schedules, architecture-specific innovations) that PMs generally don't need to understand. However, PMs working deeply in AI should be aware that "deep learning" is a broad category, and that different architectures within deep learning (CNNs for images, transformers for language, diffusion models for generation) have very different strengths and characteristics. The transformer architecture specifically is what powers LLMs, and it has unique properties (the attention mechanism, parallel processing of sequences) that distinguish it from other deep learning approaches.

> "A neural network is a particular type of model that mimics the structure of neurons being connected to each other in the brain, with an input layer, one or more 'hidden' layers of connected neurons, and an output layer." — Reforge, Module 04

> "Deep learning is, basically, the key technical insight that has unlocked the recent craze in generative AI." — Reforge, Module 04

> "As a result of this large number of layers in the network, the models are able to discover generalized patterns in the training data and make connections that span multiple different fields—for example, medical questions, legal questions, and high school physics all at the same time—similar to the way a human brain works." — Reforge, Module 04

---

## 4. Training Paradigms: How AI Models Learn

### Core Concept

The module introduces three fundamental approaches to training machine learning models, each suited to different types of problems and data conditions. Understanding which training paradigm is being used—and why—gives PMs the vocabulary to collaborate with ML teams on data strategy, feature design, and product decisions that directly affect model quality.

**Supervised learning** is the most intuitive approach. The model is given inputs paired with labeled outputs—images labeled "cat" or "dog," customer reviews labeled "positive" or "negative"—and it learns to predict the correct label for new, unseen inputs. The goal is generalization: learning patterns from the labeled examples that transfer to any new input. The critical dependency for supervised learning is high-quality labeled data. Without enough good labels, the model cannot learn effectively. This creates a direct product implication: PMs can design features that capture labeled data as a byproduct of normal user interaction. The module cites the famous example of reCAPTCHA, which generates labeled image data (users identify motorcycles, crosswalks, etc.) while also serving as a security measure. This dual-purpose design—useful product feature that also generates training data—is one of the most powerful patterns a PM can deploy.

**Unsupervised learning** operates on data without labels, seeking to discover hidden structure or patterns. Rather than learning to classify inputs into predetermined categories, it finds natural groupings, anomalies, or relationships in the data. For PMs, the primary applications are exploratory: discovering user segments you didn't know existed, detecting fraudulent transactions that deviate from normal patterns, or identifying clusters of similar behavior that might inform product design. The value of unsupervised learning is in surfacing insights that you wouldn't have thought to look for, because you didn't have the labels to define the search.

**Reinforcement learning** takes a fundamentally different approach. Instead of learning from labeled data or discovering hidden patterns, the model learns by taking actions in an environment and receiving reward or punishment signals based on outcomes. The model iterates through many rounds of action and feedback, gradually learning which actions maximize reward. The module notes that reinforcement learning powered AlphaGo and is particularly useful when there is a clear goal to achieve. For PMs, the most relevant application is personalized recommendations—the system learns which recommendations users engage with (reward) and which they ignore (implicit punishment). The module also flags a forward-looking application: training AI agents to autonomously accomplish real-world goals, such as an AI executive assistant that can complete tasks independently.

### Underlying Mechanism

The three paradigms differ in their information requirements and the types of problems they solve. Supervised learning requires the most human effort upfront (creating labels) but produces the most predictable outputs. Unsupervised learning requires no labeling but produces insights rather than predictions. Reinforcement learning requires a reward function but can learn complex sequential behaviors that neither of the other paradigms can capture.

The common thread is that all three paradigms involve adjusting model weights (parameters) based on feedback. In supervised learning, the feedback is "you got the label wrong." In unsupervised learning, the feedback is internal (optimizing some measure of pattern coherence). In reinforcement learning, the feedback is the reward signal. The weights are updated to reduce errors or increase rewards, and over many iterations, the model converges on a useful representation of the problem.

### Connections to Other Ideas

The training paradigms are the mechanism through which the neural network architecture (Chapter 3) acquires its capabilities. A deep neural network with random weights is useless—it's the training paradigm that shapes the weights into a useful model. The choice of paradigm also directly affects the model evaluation strategy (Chapter 5): supervised learning models are evaluated on classification accuracy (precision, recall), unsupervised models on cluster quality or anomaly detection rates, and reinforcement learning models on cumulative reward or goal achievement.

For PMs, the training paradigm choice has direct product implications. If your team is doing supervised learning, your job is to help ensure a steady supply of high-quality labeled data—potentially by designing product features that generate it. If they're doing reinforcement learning, your job is to help define the reward function that represents what users actually want, not just what's easy to measure.

### Practical Application

When your ML team describes a project, one of your first questions should be: "What training paradigm are we using?" The answer immediately tells you what the team needs from you:

- **Supervised learning:** "We need labeled data. How can we get more of it? Can we build a product feature that generates labels?" Think about reCAPTCHA-style patterns where user interaction naturally produces training data.
- **Unsupervised learning:** "We're exploring the data to find patterns. The output will be clusters or anomalies, not predictions." Set expectations accordingly—this is a discovery tool, not a prediction engine.
- **Reinforcement learning:** "We need a well-defined reward function. What does 'success' look like for the user?" Work closely with the team to ensure the reward signal accurately captures user value, not a proxy metric that optimizes for something users don't actually want.

### Nuances & Limitations

The three paradigms are presented as distinct categories, but in practice they are often combined. Modern LLMs use all three: pre-training is self-supervised (a variant of unsupervised learning), fine-tuning is supervised, and alignment with human preferences uses Reinforcement Learning from Human Feedback (RLHF). PMs working with AI teams should understand that real-world model training often involves multiple paradigms applied in sequence, each addressing a different aspect of model quality.

> "The goal of supervised learning is to learn a model that can generalize from those inputs to do the same work with any other input. When doing supervised learning, what's important is having lots of good quality training data with proper labels." — Reforge, Module 04

> "Unsupervised learning is particularly helpful when doing exploratory analysis of data—for example, you might use unsupervised learning to see if you can find clusters of different user types for your product." — Reforge, Module 04

> "Reinforcement learning is useful when there is a clear goal to achieve. As a PM, one of the primary use cases for reinforcement learning is making personalized recommendations to users." — Reforge, Module 04

> "One famous example is the reCAPTCHA protocol that asks users to select which images contain particular features (like motorcycles or sidewalks). This provides valuable training data for image classifiers." — Reforge, Module 04

---

## 5. Model Evaluation: Measuring What Matters

### Core Concept

Evaluating a trained model is where PM judgment becomes most consequential. The module introduces the fundamental evaluation concepts that PMs need to understand, not to conduct evaluations themselves, but to ensure the right things are being measured. The core insight is that "accuracy" is not a single metric—it decomposes into multiple dimensions, and which dimension matters most depends entirely on the product context.

The module focuses on precision and recall as the illustrative pair. **Precision** measures how often the model is right when it makes a positive prediction—out of all the times the model says "it's a dog," how often is it actually a dog? Low precision means the model makes too many false positives (mistakes of commission: saying things that aren't true). **Recall** measures how often the model catches all the real positives—out of all actual dogs in the dataset, how many does the model correctly identify? Low recall means the model makes too many false negatives (mistakes of omission: leaving out things that are true).

The critical PM insight is that precision and recall are often in tension, and the right balance depends on the use case. A medical diagnostic tool should prioritize precision—it's better to say "I don't know" than to give a wrong diagnosis. An autocomplete feature should prioritize recall—it's better to offer a suggestion that might be wrong (the user can easily ignore it) than to rarely show suggestions at all. The F1 metric (the harmonic mean of precision and recall) exists for cases where you need both, but most real products have a clear bias toward one or the other.

### Underlying Mechanism

The mechanism is that every prediction model makes two types of errors—false positives and false negatives—and the cost of these errors is asymmetric in virtually every real-world application. A spam filter with high precision but low recall will let some spam through (annoying but tolerable); one with high recall but low precision will put legitimate emails in spam (potentially catastrophic). The PM's job is to determine the relative cost of each error type in their specific context and communicate this clearly to the ML team before training begins.

Beyond precision and recall, the module introduces two systemic failure modes: **underfitting** and **overfitting**. Underfitting occurs when the model is too simple to capture the patterns in the data—it makes crude generalizations (any four-legged animal is a dog). This typically happens when the model isn't large enough, the training algorithm is too simple, or there isn't enough training data. Overfitting occurs when the model memorizes the training data instead of learning generalizable patterns—it performs perfectly on training examples but fails on new inputs. This typically happens when the model is too large relative to the training data.

Both issues can be invisible during training and only surface in production. A model that overfits will look excellent on training metrics but perform poorly on real-world inputs. This is why models are evaluated on a holdout group—data that was deliberately excluded from training—to test whether the model has actually learned generalizable patterns.

### Connections to Other Ideas

Model evaluation is the bridge between training (Chapter 4) and deployment (Chapter 6). The training paradigm determines what's possible, and evaluation determines whether it was successful. The deployment framework explicitly includes "define what metrics you will use to evaluate model performance" as Step 4—and this chapter provides the conceptual foundation for that step. The precision/recall trade-off also connects to the LLM limitations discussion (Chapter 2): hallucinations are essentially precision failures (the model says something that isn't true), and the severity of this failure varies dramatically depending on the use case.

### Practical Application

Before your ML team begins training, have a structured conversation about evaluation metrics. Ask: "In our use case, what's the cost of a false positive? What's the cost of a false negative?" Then ask: "Which matters more?" The answer should drive the choice of evaluation metric.

The module offers concrete guidance: use precision when "you're reliant on the output of the model to make a decision (so you want it to be right)." Use recall when "you want to make a suggestion (so the user can choose to ignore it if it's wrong)." For balanced needs, use the F1 metric. But the PM's real value is in translating user needs into the right metric choice—not in calculating the metrics themselves.

For underfitting and overfitting: if your model performs poorly on holdout data, ask the ML team whether the issue is underfitting (model too simple) or overfitting (model too complex relative to data). The solutions are different: underfitting typically requires a larger model or more training data, while overfitting may require regularization, more training data, or a simpler model. As a PM, you can directly influence the "more training data" solution by investing in product features that capture more or higher-quality data, or that increase data representation from under-served user segments.

### Nuances & Limitations

The module focuses on precision and recall as representative metrics, but notes that "there are a whole lot of different evaluation metrics out there for different types of problems." PMs should not feel they need to learn all possible metrics; instead, the module's advice to "work with your ML team to define what matters to the user in your use case" and then "pick the right set of evaluation metrics based on that" is the appropriate approach. The PM's role is to ensure the metric being optimized reflects actual user value, not to select the metric themselves.

A significant gap in the module is the evaluation of generative AI specifically. Precision and recall apply cleanly to classification problems, but evaluating the quality of generated text, images, or code is more complex and often requires human evaluation. PMs working with generative AI will need additional evaluation approaches beyond what this module covers.

> "Good precision means how often a model correctly labels a particular type of input—out of all the times the model says, 'it's a dog', how often is it right?" — Reforge, Module 04

> "Good recall means that a model labels most or all instances of a particular classification—out of all the dogs in the input, how often does the model label them as dogs?" — Reforge, Module 04

> "Precision matters a lot when you're reliant on the output of the model to make a decision (so you want it to be right), whereas recall matters more when you want to make a suggestion (so the user can choose to ignore it if it's wrong)." — Reforge, Module 04

> "You'd want a medical diagnosis to be precise—better to say 'I don't know' than give a wrong diagnosis to a patient. On the other hand, you'd want an auto-completion to have high recall—better to make a suggestion that can be ignored than to rarely show suggestions." — Reforge, Module 04

> "As a PM working with a ML team, you don't need to know every possible evaluation metric up front. Instead, focus on working with your ML team to define what matters to the user in your use case, work with them to pick the right set of evaluation metrics based on that." — Reforge, Module 04

> "Overfitting means learning the details of the training data too well so that the model can't actually generalize properly." — Reforge, Module 04

---

## 6. Production Deployment: The 7-Step Framework

### Core Concept

The module's deployment framework is structured as a sequential 7-step process that systematically guards against the most common failure modes in AI product development. Its fundamental orientation is problem-first, not technology-first. The framework begins by insisting that the PM define a specific user problem before touching any AI, and it proceeds through a series of checks and decisions that ensure the AI deployment is justified, measured, and sustainable.

**Step 1: Define the user problem.** This seems obvious but is violated constantly. The module warns against vague goals like "letting users access AI from our product," which produces half-baked features that don't solve real needs. The problem definition must be specific enough to evaluate: you need to be able to look at the deployed solution and determine whether it's actually solving the problem.

**Step 2: Establish baselines and confirm AI is necessary.** Before building an AI solution, build the simplest possible solution that doesn't use AI. A rules-based chatbot might handle simple queries as effectively as an LLM at a fraction of the cost. This baseline serves two purposes: it might turn out to be sufficient (saving enormous effort), and if AI does outperform it, the baseline provides a rigorous comparison point for measuring AI's actual value-add.

**Step 3: Identify where AI is an unlock.** AI rarely provides a complete end-to-end solution. More commonly, it solves a specific sub-problem that enables a broader solution. For chat support, the AI can identify the core of a user's request and generate human-like responses—but it still needs domain knowledge, access to account information, and integration with support workflows. The PM's job is to identify which specific sub-problem AI solves and how that fits into the larger solution.

**Step 4: Define evaluation metrics.** Before deploying, establish what "good" looks like. This requires understanding which aspects of performance matter most to the business and communicating these priorities to the ML team. The module explicitly connects this to the precision/recall discussion: a cancer prediction model should minimize both false negatives and false positives, while a shopping recommendation system can tolerate many false negatives because screen space is limited anyway.

**Step 5: Ensure LLM limitations aren't blockers.** Specifically assess hallucination risk. Is your problem space one where hallucinations are likely (the model is generating fact-heavy text without source material)? Is it one where hallucinations would be dangerous (medical, legal, financial contexts)? If so, design safeguards—human review loops, verification steps, constrained output formats—before deploying.

**Step 6: Factor in cost.** Unlike most engineering projects where the primary cost is engineering time, AI projects have significant ongoing costs for model training and inference. It may be worth investing more engineering time to reduce inference costs at scale. This economic calculation should be explicit, not an afterthought.

**Step 7: Iterate and improve.** Once the initial deployment is live and either outperforming the baseline or showing promise, focus on improving model performance for the specific use case. This connects to the performance optimization hierarchy (Chapter 7).

### Underlying Mechanism

The framework's power comes from its sequencing. Each step depends on the previous one, and skipping steps leads to predictable failures. Without a defined problem (Step 1), you can't establish a baseline (Step 2). Without a baseline, you can't identify where AI specifically adds value (Step 3). Without understanding where AI adds value, you can't define the right metrics (Step 4). The sequential structure creates a cascade of accountability—each step checks the assumptions of the previous one.

### Connections to Other Ideas

The deployment framework operationalizes the evaluation concepts from Chapter 5 (metrics, precision/recall) into a practical workflow. It connects to the LLM limitations from Chapter 2 (Step 5 directly addresses hallucinations and accuracy). And it sets up the performance optimization hierarchy (Chapter 7) as the natural continuation of Step 7. The framework also embodies the module's overarching theme: the PM's role is to anchor AI work to business value, not to chase technical novelty.

### Practical Application

Use this framework as a literal checklist for any AI deployment. Before greenlighting an AI project, ensure you have clear answers for each step. In practice, Steps 1-3 should be documented before any ML work begins. Steps 4-6 should be agreed upon between PM and ML teams before serious development starts. Step 7 is the ongoing operational phase.

A particularly powerful application of Step 2 (establishing baselines) is that it often reveals that the problem has a simpler solution. Many teams skip this step because they're excited about AI, only to discover months later that a rules-based approach would have been 80% as effective at 10% of the cost. The discipline of building the baseline first is one of the highest-ROI practices a PM can adopt.

### Nuances & Limitations

The framework is presented as sequential, but in practice, some steps may need to be revisited as you learn more. For example, defining evaluation metrics (Step 4) may cause you to revisit your problem definition (Step 1) if you realize you can't measure what matters. The framework should be treated as a structured thinking tool, not a rigid waterfall process.

The framework also doesn't address organizational challenges—securing ML team capacity, managing stakeholder expectations around AI capabilities, or navigating the political dynamics of AI projects within an organization. These are significant practical concerns that fall outside the module's technical scope.

> "As exciting as AI is, users do not want AI-powered products that don't solve problems they actually have. Before deciding to deploy AI, make sure that you're deploying it to solve a user problem, rather than for the sake of using AI." — Reforge, Module 04

> "It's often the case that while the exploration of a problem begins with the assumption that AI is necessary, there are often simpler solutions that don't require any AI at all, or require only minimal AI." — Reforge, Module 04

> "It's rare that you can simply plug in an AI and it will be a drop-in end-to-end solution." — Reforge, Module 04

> "LLMs are particularly prone to hallucinations, so you should assess whether your problem space is one where hallucinations are likely to be common or where hallucinations could be particularly dangerous." — Reforge, Module 04

> "Unlike most engineering projects, where your goal is to minimize engineering effort to achieve a particular output, with AI related projects you need to explicitly factor in these other costs." — Reforge, Module 04

---

## 7. Performance Optimization Hierarchy: From Simple to Complex

### Core Concept

The module presents a clear hierarchy of techniques for improving model performance, ordered from simplest to most complex. This hierarchy is not just a technical recommendation—it is a strategic framework for managing the trade-off between performance gains and investment risk. Each level up the hierarchy offers potentially greater performance improvement but at greater cost, complexity, and risk of obsolescence.

**Level 1: Foundation models without modifications.** Start here. Modern foundation models are remarkably capable out of the box. For many use cases, the baseline performance of a frontier model is sufficient, and the PM's job is to determine whether the unmodified model meets the performance bar before investing in optimization.

**Level 2: Prompt engineering.** If the baseline falls short, prompt engineering—crafting carefully designed prompts that guide the model's behavior—is the first optimization to try. This includes techniques like few-shot learning (providing examples of desired outputs within the prompt) and chain-of-thought reasoning (asking the model to break problems into step-by-step reasoning). Prompt engineering is fast to implement, requires no additional training data or compute, and is easily adaptable to new requirements. Its main limitations are the model's context window and potential inconsistency across queries.

**Level 3: Chain of Thought reasoning** is highlighted as a specific prompt engineering technique worthy of separate attention. By instructing the model to show its reasoning step by step, you get both better performance on complex multi-step problems and enhanced explainability—the intermediate steps make the model's reasoning visible and auditable. For PMs, this is particularly valuable because it facilitates human review: if the reasoning is visible, a human can identify where the model went wrong and intervene.

**Level 4: Retrieval Augmented Generation (RAG).** If prompt engineering isn't enough, RAG enhances the model by connecting it to an external knowledge base. When a user submits a query, the system first retrieves relevant documents or data, then feeds that information to the model alongside the query. This addresses two key limitations: it provides the model with up-to-date, domain-specific information that wasn't in its training data, and it reduces hallucinations by grounding the model's responses in retrieved facts.

RAG is typically combined with prompt engineering: prompts steer the model's behavior, while RAG provides the domain knowledge. However, the module notes an important constraint—both compete for space in the model's context window, so using RAG limits prompt complexity.

**Level 5: Fine-tuning.** If all the above don't meet requirements, fine-tuning modifies the model's weights using task-specific training data. This can produce better performance on specialized tasks and better handling of domain-specific terminology, and it can enable smaller, more efficient models. But it requires significant high-quality data, is computationally expensive, and—critically—may become obsolete when a new base model is released.

**Level 6: Waiting for next-generation models.** The module explicitly includes "wait" as a strategy. New frontier models are released regularly and often provide performance improvements that eliminate the need for optimization work.

**Level 7: Building custom models from scratch.** Maximum control but maximum cost. Only justified when no existing model can meet requirements.

### Underlying Mechanism

The hierarchy is ordered by the principle of minimum effective intervention. Each technique higher on the list is cheaper, faster, and more resistant to obsolescence. Prompt engineering survives model upgrades (though new models may reduce the need for carefully tuned prompts). RAG infrastructure survives model upgrades because the knowledge base is external. Fine-tuning does not survive model upgrades—when a new base model is released, fine-tuning work may need to be redone from scratch. Custom models require the most investment and offer the least flexibility.

The strategic insight is that the AI landscape is moving so fast that over-investing in optimization at any point in time carries significant obsolescence risk. The PM should always ask: "Can we achieve our performance target with a simpler approach?" before escalating to a more complex one.

### Connections to Other Ideas

This chapter is the natural continuation of the deployment framework's Step 7 (Chapter 6). It also connects to the evaluation chapter (Chapter 5): you need clear evaluation metrics to know whether each level of optimization is achieving the required performance improvement. The hierarchy embodies the module's broader theme of disciplined, problem-first AI development—don't fine-tune when prompt engineering will do, and don't build a custom model when a fine-tuned foundation model will suffice.

### Practical Application

When your model isn't performing well enough, walk up the hierarchy systematically. Start by improving prompts. If that's not enough, add RAG. If that's still not enough, consider fine-tuning—but also consider whether waiting for the next model release might solve the problem at zero cost. At each step, measure performance against your defined metrics (Chapter 5) to determine whether you've achieved the required level.

A practical trap to avoid: jumping directly to fine-tuning because it feels like a more "serious" solution than prompt engineering. In many cases, well-crafted prompts with RAG outperform fine-tuned models at a fraction of the cost and with much greater flexibility.

### Nuances & Limitations

The hierarchy assumes the PM is working with existing foundation models. For organizations building truly novel AI capabilities (not covered by existing models), the hierarchy may not apply. Additionally, the module doesn't address the emerging practice of combining multiple techniques simultaneously—for example, using prompt engineering + RAG + fine-tuning together, each addressing different aspects of performance. Real production systems often layer multiple techniques rather than choosing one.

The "wait for next-gen models" strategy, while pragmatic, creates a tension with time-to-market pressures. PMs must balance the cost of optimization today against the likelihood that a better model will make that optimization unnecessary tomorrow.

> "PMs should be aware of the following hierarchy of AI implementation approaches, ranging from easiest to most complex." — Reforge, Module 04

> "Generally, PMs should start with simpler approaches and only move to more complex methods if baseline performance doesn't meet the identified needs." — Reforge, Module 04

> "New frontier models are likely to be released regularly and work you put into fine tuning may be wasted." — Reforge, Module 04

> "While effort put into prompt engineering is likely to remain valuable with new models, new models will often reduce the need for carefully tuned prompts." — Reforge, Module 04

> "RAG will typically be combined with prompt engineering where prompt engineering is used to steer the specific behavior of the model, and RAG is used to provide the key domain-specific context that the model needs to respond with relevant information." — Reforge, Module 04

---

## 8. The PM's Role in AI: Business Value Anchor

### Core Concept

Woven throughout the module is a consistent meta-theme: the PM's role in AI product development is fundamentally about ensuring that technical capabilities serve business value and user needs. This is not a platitude—it is a specific and actionable principle that manifests differently at each stage of the AI lifecycle.

During problem definition, the PM's role is to resist the pull of technology-driven thinking. The temptation to deploy AI "because it's exciting" or "because competitors are doing it" is strong, and the PM is the organizational function best positioned to insist on a clear user problem before any AI work begins. The module repeatedly emphasizes this: "users do not want AI-powered products that don't solve problems they actually have."

During model training and evaluation, the PM's role is to translate user needs into technical requirements. This means working with the ML team to select evaluation metrics that reflect what users actually care about—not what's easiest to measure. The precision vs. recall trade-off is a perfect example: the right choice depends entirely on the product context, and only the PM has the combination of user understanding and technical vocabulary to make this call well.

During deployment, the PM's role is to manage the full stack of concerns—not just model performance, but hallucination risk, cost, integration with existing workflows, and the user experience of interacting with an AI-powered feature. The deployment framework (Chapter 6) is essentially a checklist of PM responsibilities.

During optimization, the PM's role is to maintain discipline against over-engineering. The performance hierarchy exists because it's tempting to jump to complex solutions (fine-tuning, custom models) when simpler approaches would suffice. The PM should always advocate for the minimum effective intervention.

### Underlying Mechanism

The mechanism is role complementarity. ML engineers optimize for model performance; PMs optimize for business value. Without the PM's perspective, the ML team may build a technically impressive model that doesn't solve a real problem, or optimize for the wrong metric, or over-invest in optimization that a new model release will make obsolete. The PM doesn't replace the ML team's technical judgment—they complement it with user and business judgment.

### Connections to Other Ideas

This theme connects to every other chapter in the module. It motivates the deployment framework (Chapter 6), governs metric selection (Chapter 5), guides the optimization hierarchy (Chapter 7), and provides the "why" behind understanding LLMs (Chapter 1), architectures (Chapter 3), and training paradigms (Chapter 4). The PM doesn't need to understand these technical concepts for their own sake—they need to understand them to make better product decisions.

### Practical Application

Maintain a set of "PM checks" throughout any AI project:
- **Before starting:** "What user problem does this solve? How will we know it's solved?"
- **Before training:** "What metrics matter? Which errors are more costly? What data do we need?"
- **Before deploying:** "Does this outperform the non-AI baseline? Are hallucination risks managed? Can we afford the inference costs?"
- **During optimization:** "Is the current approach meeting user needs? Do we need to go further, or is this good enough?"

The PM who consistently asks these questions—and insists on clear answers before proceeding—will prevent the most common AI product failures.

### Nuances & Limitations

The module presents a somewhat idealized view of PM-ML collaboration. In practice, organizational dynamics, technical debt, stakeholder pressure, and market timing create situations where the disciplined approach the module advocates is difficult to maintain. PMs will sometimes face pressure to ship AI features without adequate evaluation, to skip baselines because "we know AI is better," or to over-invest in optimization to justify AI team headcount. The framework provides the right principles, but applying them requires organizational influence and stakeholder management skills that go beyond the module's technical scope.

> "Users do not want AI-powered products that don't solve problems they actually have." — Reforge, Module 04

> "Focus on working with your ML team to define what matters to the user in your use case, work with them to pick the right set of evaluation metrics based on that, and make sure you really understand the implications of the metrics being chosen to ensure it matches what the user would actually want." — Reforge, Module 04

> "If you get this right, then your ML team can go off and improve the quality of the model and when they do give you a model, it's more likely to be useful." — Reforge, Module 04

---

## Connections Map

The eight themes in this module form a complete lifecycle framework for PM engagement with AI, and the connections between them reveal a coherent philosophy about how product managers should approach AI-powered products.

The foundation is mechanistic understanding. Chapters 1-3 (LLM prediction, real-world applications, neural networks/deep learning) establish what AI actually is and how it works. This understanding is not academic—it directly enables the PM judgment required in later chapters. A PM who understands the prediction mechanism can reason about when LLMs will perform well (domains where probable = useful) and when they'll fail (domains where accuracy requires factual verification). A PM who understands the strengths and limitations can honestly assess whether AI is the right tool for a given problem. A PM who understands deep learning can communicate meaningfully with ML engineers about model architecture and training decisions.

The middle layer is process and evaluation. Chapters 4-5 (training paradigms, model evaluation) give PMs the vocabulary and frameworks to collaborate effectively with ML teams. The training paradigm determines what data the team needs, and the PM can directly influence data quality through product design (the reCAPTCHA pattern). The evaluation framework determines what "good" means, and the PM's job is to ensure "good" is defined in terms of user value, not just technical metrics. The precision vs. recall trade-off is the canonical example: the right answer depends on the product context, not the technology.

The outer layer is action. Chapters 6-7 (deployment, optimization) translate understanding and evaluation into a concrete workflow for shipping AI products. The deployment framework provides the discipline (problem-first, baseline-first, metric-first), and the optimization hierarchy provides the escalation path (simple-first, escalate only when necessary). Together, they create a systematic approach that minimizes waste—waste of engineering time, waste of compute resources, and waste of time-to-market.

Holding the entire structure together is Chapter 8's meta-theme: the PM as business value anchor. Every technical decision in the module—which training paradigm to use, which metric to optimize, which optimization level to invest in—should ultimately be evaluated against user value and business outcomes. This is not anti-technical; it is a specific and necessary role that enables the technical team to do their best work by ensuring they're solving the right problems.

The one tension that runs through the module is between depth and discipline. The module wants PMs to understand AI deeply enough to make good decisions (Chapters 1-5), but also to maintain the discipline to avoid being seduced by technological possibility at the expense of business value (Chapters 6-8). The resolution is that depth serves discipline: the PM who understands the prediction mechanism, the training paradigms, and the evaluation metrics is better equipped to resist technological hype and insist on evidence-based decisions. Understanding the technology is what enables you to not be dazzled by it.

---

## Action Items

### Immediate
- **Learn the prediction mechanism at a conceptual level.** Understand that LLMs predict probable text continuations based on patterns learned from training data. This framing will immediately improve your ability to evaluate AI feature proposals—ask "is this a case where probable = useful?" for every proposed use case.
- **Memorize the precision vs. recall distinction.** For every AI feature you work on, ask: "What's the cost of a false positive vs. a false negative in our context?" This single question will dramatically improve your metric selection conversations with ML teams.
- **Review the 7-step deployment framework.** Before any AI project kickoff, walk through all seven steps. Ensure Steps 1-3 (problem definition, baseline, AI unlock identification) are documented before any ML work begins.

### Short-term
- **Establish a non-AI baseline for your current AI project.** If your team is building an AI-powered feature, ensure a simpler alternative has been evaluated. If not, advocate for building one—it will either prove AI is unnecessary (saving resources) or provide a rigorous comparison point.
- **Audit your evaluation metrics.** Are the metrics your ML team is optimizing actually aligned with what users want? If you're optimizing for precision when recall matters more (or vice versa), the model will improve on the wrong dimension.
- **Explore data generation opportunities in your product.** Identify places where user interaction could naturally generate labeled training data (the reCAPTCHA pattern). This is one of the most valuable contributions a PM can make to AI product quality.

### Strategic
- **Build fluency in the optimization hierarchy.** When performance isn't meeting requirements, resist the urge to jump to fine-tuning. Walk up the hierarchy systematically: prompt engineering first, then RAG, then fine-tuning—and always consider whether waiting for the next model generation might solve the problem at zero cost.
- **Develop a hallucination risk assessment practice.** For every AI-powered feature, explicitly evaluate: How likely are hallucinations in this context? How dangerous would they be? What safeguards are needed? Document this assessment as part of your product requirements.
- **Create an AI deployment playbook for your organization.** Adapt the module's 7-step framework into a template that your team uses for every AI project. Include the evaluation metric selection process and the optimization hierarchy as standard components.

---

## Critical Gaps & Limitations

- **Generative AI evaluation:** The module's evaluation framework (precision/recall) applies cleanly to classification problems but doesn't address the much harder problem of evaluating generative AI quality. How do you measure whether generated text is "good"? This is a significant gap for PMs working with LLMs in production.
- **Multi-modal AI:** The module focuses exclusively on language models. Modern AI increasingly involves multi-modal systems (text + image + audio + video), and the PM considerations for these systems are different in important ways.
- **AI ethics and safety:** The module mentions bias briefly but doesn't address the broader landscape of AI ethics, safety, alignment, and responsible deployment. These are increasingly critical PM concerns that deserve deeper treatment.
- **Organizational dynamics:** The module assumes a cooperative PM-ML relationship with clear role boundaries. In practice, organizational politics, misaligned incentives, and unclear ownership create challenges that the framework doesn't address.
- **Rapidly evolving landscape:** The AI field moves so fast that specific technical details (model capabilities, cost benchmarks, best practices for prompt engineering) may be outdated quickly. The module's frameworks and principles are more durable than its specific technical claims.
- **Agent-based AI:** The module briefly mentions AI agents (in the reinforcement learning section) but doesn't address the rapidly emerging paradigm of autonomous AI agents that use tools, plan, and execute multi-step workflows—a major area of current PM relevance.
- **Cost modeling:** Step 6 of the deployment framework mentions cost but doesn't provide frameworks for estimating inference costs, comparing the economics of different optimization approaches, or modeling the total cost of ownership of an AI-powered feature.

---

## Appendix: Key Quotes

| Topic | Quote | Source |
|-------|-------|--------|
| LLM definition | "A large language model (LLM) is a language model that has been trained on massive amounts of text data, making it extremely capable of understanding and generating complex language." | Reforge, Module 04 |
| Prediction mechanism | "At the core, LLMs work by making predictions. Given some input text, the model predicts what comes next." | Reforge, Module 04 |
| Transformers | "Most large language models today are built using a technology called transformers." | Reforge, Module 04 |
| Attention mechanism | "The transformer uses an attention mechanism to focus on different parts of the input text, helping it understand which words are most important in the context of the sentence." | Reforge, Module 04 |
| Generalization | "Instead of memorizing every possible sentence, the model learns the underlying rules of language." | Reforge, Module 04 |
| Context understanding | "LLMs are designed to understand context, meaning they can generate coherent responses that are relevant to the conversation or task at hand." | Reforge, Module 04 |
| Accuracy limitation | "While LLMs are impressive, they are not perfect. They can occasionally generate incorrect or nonsensical answers." | Reforge, Module 04 |
| Bias | "Because LLMs are trained on large datasets from the internet, they can inadvertently learn and reproduce biases present in the data." | Reforge, Module 04 |
| Deep learning insight | "Deep learning is, basically, the key technical insight that has unlocked the recent craze in generative AI." | Reforge, Module 04 |
| Cross-domain generalization | "The models are able to discover generalized patterns in the training data and make connections that span multiple different fields." | Reforge, Module 04 |
| Model weights | "When a model is trained, what is actually being done is that the model weights are being updated again and again to improve the performance of the model based on the training data." | Reforge, Module 04 |
| Supervised learning | "The goal of supervised learning is to learn a model that can generalize from those inputs to do the same work with any other input." | Reforge, Module 04 |
| reCAPTCHA pattern | "One famous example is the reCAPTCHA protocol that asks users to select which images contain particular features. This provides valuable training data for image classifiers." | Reforge, Module 04 |
| Unsupervised learning | "Unsupervised learning is particularly helpful when doing exploratory analysis of data." | Reforge, Module 04 |
| Reinforcement learning | "Reinforcement learning is useful when there is a clear goal to achieve." | Reforge, Module 04 |
| Precision | "Good precision means how often a model correctly labels a particular type of input." | Reforge, Module 04 |
| Recall | "Good recall means that a model labels most or all instances of a particular classification." | Reforge, Module 04 |
| Precision use case | "You'd want a medical diagnosis to be precise—better to say 'I don't know' than give a wrong diagnosis to a patient." | Reforge, Module 04 |
| Recall use case | "You'd want an auto-completion to have high recall—better to make a suggestion that can be ignored than to rarely show suggestions." | Reforge, Module 04 |
| PM metric role | "Focus on working with your ML team to define what matters to the user in your use case." | Reforge, Module 04 |
| Overfitting | "Overfitting means learning the details of the training data too well so that the model can't actually generalize properly." | Reforge, Module 04 |
| Problem-first deployment | "Users do not want AI-powered products that don't solve problems they actually have." | Reforge, Module 04 |
| Non-AI baselines | "There are often simpler solutions that don't require any AI at all, or require only minimal AI." | Reforge, Module 04 |
| AI as partial solution | "It's rare that you can simply plug in an AI and it will be a drop-in end-to-end solution." | Reforge, Module 04 |
| Hallucination risk | "LLMs are particularly prone to hallucinations, so you should assess whether your problem space is one where hallucinations are likely to be common." | Reforge, Module 04 |
| AI cost | "Unlike most engineering projects, where your goal is to minimize engineering effort to achieve a particular output, with AI related projects you need to explicitly factor in these other costs." | Reforge, Module 04 |
| Optimization hierarchy | "PMs should start with simpler approaches and only move to more complex methods if baseline performance doesn't meet the identified needs." | Reforge, Module 04 |
| Fine-tuning obsolescence | "New frontier models are likely to be released regularly and work you put into fine tuning may be wasted." | Reforge, Module 04 |
| Prompt engineering durability | "Effort put into prompt engineering is likely to remain valuable with new models, new models will often reduce the need for carefully tuned prompts." | Reforge, Module 04 |
| RAG + prompt engineering | "RAG will typically be combined with prompt engineering where prompt engineering is used to steer the specific behavior of the model, and RAG is used to provide the key domain-specific context." | Reforge, Module 04 |
