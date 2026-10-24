---
layout: page
title: CASK Database Rebuild
description: Industry case study — consolidating Zoho CRM and Google Analytics into one PostgreSQL source of truth, with a Dagster ELT pipeline feeding Power BI.
img: assets/img/projects/cask_database_rebuild.png
importance: 1
category: data science
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Stack:** Supabase / PostgreSQL · Dagster · Zoho CRM · Google Analytics · Power BI · SQL · Python<br>
**Context:** Data Analyst at CASK, Jan–May 2026 — working primarily with Marketing, alongside Sales and the Board of Directors

## Problem

Customer data lived in **Zoho CRM** and marketing performance in **Google Analytics**, with recurring reports assembled by hand across SQL, Excel, Power BI and Python. With no shared data layer, the same KPI could come out differently depending on which source and which report it was pulled from — and every monthly cycle cost hours of manual work.

## What I built

1. **One source of truth.** Consolidated CRM customer data and Google Analytics marketing data into a unified **Supabase / PostgreSQL** database that every report reads from.
2. **Automated ELT.** Built the ingestion pipeline in **Dagster**, with automated triggers plus validation checks for data freshness and pipeline reliability.
3. **Standardized KPI logic.** Defined reusable KPI logic, data cleaning rules and validation checks, so metrics mean the same thing in every view.
4. **Rebuilt reporting on the new layer.** Validated and remodeled the **Power BI** data models and dashboards on top of the standardized layer.
5. **Documentation and refresh process.** Wrote documentation and refresh procedures for recurring management reporting and data-quality review.

## Impact

- Cut monthly manual reporting effort by **approx. 8–10 hours** by automating recurring SQL, Excel, Power BI and Python workflows.
- Reduced reporting inconsistencies: dashboards, KPI views and recurring reports for Marketing, Sales and the Board now come from the same validated layer.

<p class="text-muted small">Company data is confidential; the diagram above is a simplified illustration of the architecture.</p>
