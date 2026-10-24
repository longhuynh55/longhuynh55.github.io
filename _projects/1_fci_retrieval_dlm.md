---
layout: page
title: FCI-Retrieval-DLM
description: Retrieval-guided Bayesian forecasting under structural breaks — first-author paper, PAKDD 2026 Workshop (Springer LNCS).
img: assets/img/projects/fci_retrieval_dlm.png
importance: 1
category: research
related_publications: true
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Research question.** Can retrieval of historically similar macro-financial episodes — guided by the Financial Conditions Impulse on Growth (FCI-G) index — help Bayesian forecasters adapt faster after policy-driven structural breaks?

## Problem

Bayesian Dynamic Linear Models produce coherent probabilistic forecasts, but their sequential learning can adapt too slowly after abrupt policy-driven regime shifts. Transient bias appears exactly when accurate predictions matter most.

## Approach

FCI-Retrieval-DLM:

1. Retrieves historically similar macro-financial episodes, guided by the FCI-G index.
2. Applies a reliability-gated correction to the baseline predictive mean within event windows.

A **Shuffled-Retrieval Control** keeps the entire intervention pipeline intact but destroys semantic alignment between query and retrieved episodes — a placebo-style negative control that isolates the contribution of context-guided matching itself.

## Evaluation

Walk-forward NASDAQ forecasting compares FCI-Retrieval-DLM against Base-DLM and the shuffled control on point and distributional accuracy (CRPS, log predictive density).

## Findings and limitations

Improvements are modest and directional, concentrated in onset-centered post-event windows. Differences relative to the shuffled control remain small under the current configuration, so evidence for a distinct semantic retrieval advantage is not yet conclusive.

## Publication

{% cite lieu2026fciretrieval %} — [Springer](https://link.springer.com/chapter/10.1007/978-981-92-2014-4_27) · DOI [10.1007/978-981-92-2014-4_27](https://doi.org/10.1007/978-981-92-2014-4_27)
