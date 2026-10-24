---
layout: page
title: QuantVN
description: Quant research platform for Vietnamese equities — automated market-data pipelines, analysis APIs, a strategy builder and a guarded finance AI assistant.
img: assets/img/projects/quantvn_strategy_forge.png
importance: 1
category: full-stack
github: https://github.com/longhuynh55/Quantwebsite
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Stack:** Python · TypeScript / Next.js · REST APIs · LangGraph · Docker · GitHub Actions — [source on GitHub](https://github.com/longhuynh55/Quantwebsite)

## Overview

QuantVN brings Vietnamese equity research into one workflow: clean market data, tools to explore it, a way to turn ideas into testable strategies, and an AI assistant that answers questions grounded in real market data.

## Problem

Retail and student quant workflows are usually scattered across spreadsheets, scripts and charts. Moving from an idea to a defensible, testable strategy means stitching together tools that don't share data or assumptions.

## What I built

- **Market-data pipelines.** Automated OHLCV pipelines for **500+ Vietnamese stocks over 7+ years**, with data-integrity checks for research-grade quality.
- **Analysis tools and APIs.** Custom computational analysis tools and REST APIs for exploring market data and testing research ideas.
- **Strategy workflow.** Visual strategy builder, backtesting with execution assumptions and cost modeling, screener, charts, and portfolio / factor / risk views.
- **Finance AI assistant.** Built with LangGraph, using multi-provider LLM routing, grounding validation and anti-hallucination guardrails.
- **AI evaluation.** Evaluation workflows that score assistant outputs against market ground truth.

## Engineering

Fully automated CI/CD with Docker and GitHub Actions: lint, type-check, build, plus smoke and integration QA gates before anything is considered deployable.
