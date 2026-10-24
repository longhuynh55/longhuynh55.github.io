---
layout: page
title: HCMC Last-Mile Data Platform
description: Warehouse-first analytics pipeline for last-mile delivery — Polars, SQL marts, BigQuery, Looker Studio.
img: assets/img/projects/hcmc_last_mile.png
importance: 1
category: data science
github: https://github.com/longhuynh55/GHN-portfolio
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Stack:** Python · Polars · SQL · BigQuery · Looker Studio — [source on GitHub](https://github.com/longhuynh55/GHN-portfolio)

## Overview

An end-to-end analytics-engineering pipeline for last-mile delivery operations in Ho Chi Minh City. It generates a realistic operational dataset, cleans and enriches event-level data, models KPI marts in SQL, publishes to BigQuery and surfaces them in Looker Studio.

The dataset is **synthetic and clearly labeled as such** — built around real ward-level HCMC geography with synthetic operational zones, so no company data is exposed.

## Problem

Last-mile operations produce fragmented data — orders, delivery attempts, hub movements, returns. Core KPIs (on-time delivery rate, first-attempt success, SLA breach, return-to-sender, hub backlog, failure-reason mix) tend to end up scattered across spreadsheets, with reporting done by hand.

## Architecture

| Layer      | Purpose                                                           | Tools          |
| ---------- | ----------------------------------------------------------------- | -------------- |
| Generation | Synthetic operational dataset with controlled dirty-data patterns | Python         |
| Transform  | Event cleaning, deduplication, derived shipment metrics           | Polars         |
| Staging    | Conformed fact tables (`fct_*`)                                   | SQL            |
| Marts      | KPI marts per domain + QA assertions                              | SQL, BigQuery  |
| BI         | Dashboard-ready daily marts, insight memo                         | Looker Studio  |

`mart_dashboard_*` tables exist specifically to prevent incorrect BI-side aggregation such as naive `AVG(rate)`.

## Dataset scale

- 90 days of operations, 100,000 orders and shipments
- 700k+ tracking events, 120k+ delivery attempts
- 14 operational zones, 10 delivery hubs, 250 drivers

## Results

Reporting moves from manual work to a validated pipeline. The mart layer is the single source of truth for core last-mile KPIs, with QA checks asserting data quality before anything reaches a dashboard.
