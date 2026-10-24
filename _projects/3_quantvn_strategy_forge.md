---
layout: page
title: QuantVN Strategy Forge
description: Web platform for Vietnamese equity quant research — visual strategy builder, backtesting engine and AI assistant.
importance: 1
category: full-stack
github: https://github.com/longhuynh55/Quantwebsite
---

**Stack:** TypeScript · Next.js · React · Docker · GitHub Actions — [source on GitHub](https://github.com/longhuynh55/Quantwebsite) · **Status:** functional prototype

## Overview

QuantVN Strategy Forge unifies Vietnamese equity quant research in one product: design a strategy visually, backtest it with explicit execution assumptions, inspect the universe with screener and chart tools, and validate with portfolio, factor and risk views — on HOSE datasets (2018–2025).

## Problem

Most retail and student quant workflows are fragmented across spreadsheets, scripts and charts. Moving from an idea to a defensible, testable strategy usually means stitching together tools that don't share state or assumptions.

## Core modules

| Module                    | Purpose                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| Strategy Builder          | Node-graph editor to assemble strategy logic                     |
| Backtesting               | Metrics, equity curve, trade logs, diagnostics with cost modeling |
| Screener + Charts         | Universe filtering and technical inspection                      |
| Portfolio / Factor / Risk | Portfolio construction and risk checks                           |
| Assistant                 | Guided Q&A with grounding and reliability gates                  |

## Engineering

Next.js (App Router) in strict TypeScript, with Zustand + React Query for state, Recharts and Lightweight Charts for visualization. Docker images are built and validated in CI — lint, type-check, build, plus smoke and integration QA gates before anything is considered deployable.

## Status

The full workflow runs locally and in Docker with CI-green builds. It is not yet a hosted public deployment.
