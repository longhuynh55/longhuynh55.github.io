---
layout: page
title: Macro-Adaptive Trading System
description: Regime-aware quant trading system — HMM regime detection, Backtrader strategies, robustness tests and a Streamlit cockpit.
img: assets/img/projects/macro_adaptive_trading.png
importance: 2
category: data science
github: https://github.com/longhuynh55/Algorithmic-Trading-System-with-Backtrader
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Stack:** Python · Backtrader · hmmlearn / ruptures · Streamlit · PostgreSQL · Docker · pytest — [source on GitHub](https://github.com/longhuynh55/Algorithmic-Trading-System-with-Backtrader)

## Overview

A quantitative trading system that detects market regime changes and adapts its behavior accordingly, instead of relying on one strategy tuned for one market condition.

## Problem

Static strategies are usually optimized for a single regime. When the market shifts — as in the 2022 bear market — they can suffer large losses.

## Approach

- **Regime detection:** Hidden Markov Models identify latent states (growth, bear, flash crash); CUSUM and Ruptures detect structural breaks; inputs include VIX, Treasury yields and stock–bond correlation.
- **Strategies:** robust adaptive (VIX filter + ATR trailing stop), regime-aware position sizing, momentum (RSI + MA crossover), mean reversion (Bollinger Bands).
- **Anti-overfitting:** strict in-sample / out-of-sample split (2010–2021 vs. 2022+), volatility targeting, VIX entry filter, death-cross emergency exit.
- **Robustness:** Monte Carlo simulation, walk-forward and stress tests.

## Architecture

| Layer       | Purpose                                        | Tools                |
| ----------- | ---------------------------------------------- | -------------------- |
| Data feed   | Market and macro data ingestion                | yfinance             |
| Data layer  | Storage with Parquet backup                    | PostgreSQL, Parquet  |
| Engines     | Regime analysis, strategy backtests, robustness | HMM, Backtrader      |
| Dashboard   | Market view, regime detective, strategy lab    | Streamlit            |

Packaged with Docker Compose and covered by a pytest suite for the data loader, regime analysis, strategies, optimization and reporting modules.
