---
draft: false
title: "Financial-Condition-Guided Retrieval for Adaptive Bayesian Decision Forecasting Under Structural Breaks"
authors:
  - name: "Liêu Hoài Phúc"
    role: "first author"
  - name: "Binh Nguyen Y. Tran"
  - name: "Ngoc Thi Anh Nguyen"
  - name: "Kim Le Bao Pham"
  - name: "Tin Nguyen Tri Phan"
  - name: "Son Phuc Nguyen"
venue: "DMO Fintech Workshop @ PAKDD 2026 — Trends and Applications in Knowledge Discovery and Data Mining, Springer LNCS (LNAI 16603), pp. 337–348"
reviewStatus: accepted
publicationStatus: published
publishedAt: 2026-07-14
eventDate: 2026-06-01
summary: "First-author workshop paper (PAKDD 2026, Springer LNCS) extending Bayesian Dynamic Linear Models with FCI-guided retrieval of similar macro-financial episodes and a reliability-gated correction, evaluated by walk-forward NASDAQ forecasting with a shuffled-retrieval placebo control."
researchQuestion: "Can retrieval of historically similar macro-financial episodes — guided by the Financial Conditions Impulse on Growth (FCI-G) index — help Bayesian forecasters adapt faster after policy-driven structural breaks?"
contribution: "FCI-Retrieval-DLM: retrieves similar historical episodes via the FCI-G index and applies a reliability-gated correction to the baseline predictive mean within event windows. A Shuffled-Retrieval Control preserves the full intervention pipeline while destroying semantic alignment, serving as a placebo-style negative control."
limitations: "Walk-forward NASDAQ forecasting shows modest directional improvements concentrated in onset-centered post-event windows; differences relative to the shuffled control remain small under the current configuration, so evidence for a distinct semantic retrieval advantage is not yet conclusive."
paperUrl: "https://link.springer.com/chapter/10.1007/978-981-92-2014-4_27"
featured: true
sortOrder: 1
---

## Publication record

Published in the PAKDD 2026 conference proceedings — *Trends and Applications in Knowledge Discovery and Data Mining*, Springer Lecture Notes in Computer Science (LNAI, volume 16603), pp. 337–348. First online 14 July 2026. DOI: [10.1007/978-981-92-2014-4_27](https://doi.org/10.1007/978-981-92-2014-4_27).

Authors: **Liêu Hoài Phúc** (first author), Binh Nguyen Y. Tran, Ngoc Thi Anh Nguyen, Kim Le Bao Pham, Tin Nguyen Tri Phan, Son Phuc Nguyen — University of Economics and Law and Vietnam National University, Ho Chi Minh City.

## What the paper does

Bayesian Dynamic Linear Models produce coherent probabilistic forecasts, but their sequential learning can adapt too slowly after abrupt policy-driven regime shifts — transient bias appears exactly when accurate predictions matter most.

FCI-Retrieval-DLM addresses this by:

1. Retrieving historically similar macro-financial episodes, guided by the Financial Conditions Impulse on Growth (FCI-G) index.
2. Applying a reliability-gated correction to the baseline predictive mean within event windows.

## Evaluation design

A Shuffled-Retrieval Control keeps the entire intervention pipeline intact but destroys semantic alignment between the query and retrieved episodes — a placebo-style negative control that isolates the contribution of context-guided matching itself.

Walk-forward NASDAQ forecasting compares FCI-Retrieval-DLM against Base-DLM and the shuffled control on point and distributional accuracy (CRPS, log predictive density).
