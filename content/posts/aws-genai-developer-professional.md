---
title: AWS Certified Generative AI Developer (Professional) — my study path
description: A practical, exam-aligned breakdown of how I prepared for the AWS Generative AI Developer Professional certification — Bedrock, RAG, evaluation, safety, and cost trade-offs.
date: 2026-07-15
tags: AWS, Generative AI, Certification, Bedrock
---

I passed the **AWS Certified Generative AI Developer — Professional** certification (and held the Early Adopter badge from the earlier track). This is the study path that worked for me, organised the way the exam actually tests you.

## What the exam really measures

It is not a trivia quiz about model names. The Professional tier expects you to **design and operate** GenAI solutions: pick patterns, put them in production, evaluate them, and control cost and safety. Every question had a "what would you do first" flavour.

## The four blocks I studied

### 1. Model access and selection on Bedrock
Know the trade-off matrix cold: latency vs. quality, on-demand vs. provisioned throughput, and when *not* to use the largest model. Multi-model strategy (route cheap requests to small models) showed up repeatedly.

### 2. RAG architecture
The core pattern. Chunking strategies, embedding model choice, hybrid search (semantic + keyword), reranking, and metadata filtering. Be able to diagnose a RAG pipeline that returns technically-similar but factually-wrong passages — usually a chunking or ranking problem, not a model problem.

### 3. Evaluation and safety
Offline vs. online evaluation, building a golden dataset, guardrails, prompt-injection defences, and content filtering. This block carried the most "production readiness" questions — the stuff that separates a demo from a shipped feature.

### 4. Cost and scaling
Token accounting, caching repeated context, right-sizing models, and monitoring with CloudWatch. I actually built a small usage-tracking dashboard for a client project, and the cost questions were much easier after that.

## How I studied

- **Two weeks, ~1 hour/day.** Consistency beat cramming.
- **Hands-on over videos.** Every concept got a tiny Bedrock experiment — a RAG notebook, a guardrail test, a cost calculation.
- **Practice exams for pacing only.** They teach you to read the question stem carefully, not the content.
- **Built projects with the patterns.** Applying retrieval and evaluation to a real portfolio project cemented far more than any slide deck.

## Would I recommend it?

If you are already shipping LLM features and want a structured, AWS-flavoured mental model for production GenAI — yes. If you have never called an API with a prompt, start smaller first.

The certification is a checkpoint. The actual skill is knowing **why** a pipeline behaves the way it does.
