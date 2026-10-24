---
layout: page
title: VietNova Banking Data Platform
description: End-to-end synthetic banking data platform — Python ELT, MinIO / PostgreSQL landing layers and five contract-tested dbt marts.
img: assets/img/projects/vietnova_banking_platform.png
importance: 2
category: data science
---

{% include figure.liquid loading="eager" path=page.img class="img-fluid rounded z-depth-1" alt=page.title %}

**Stack:** Python · SQL · PostgreSQL · MinIO · dbt · Docker Compose

## Overview

VietNova is a **100% synthetic** retail-banking data platform built end to end, to practice the engineering standards a real bank's analytics stack needs: immutable raw data, versioned contracts, protected identities and pipelines that refuse to publish bad data.

## Architecture

| Layer          | What it does                                                   | Tools              |
| -------------- | -------------------------------------------------------------- | ------------------ |
| Sources        | 6 source domains, 16 entities of synthetic banking data        | Python             |
| Ingestion      | Python ELT into immutable landing and raw layers               | MinIO, PostgreSQL  |
| Transformation | Modeled layers with versioned contracts, tokenized identity and lineage | dbt        |
| Marts          | 5 business marts (below)                                       | dbt, PostgreSQL    |
| Runtime        | Reproducible local stack                                       | Docker Compose     |

**Marts:** Customer 360 · Acquisition · Growth funnel · Campaign performance · Digital banking

## Reliability

- **17 golden cases** and **471 selector checks** validate the models end to end.
- **Idempotent replay** — re-running a load produces the same result.
- **Reconciliation and quarantine** — mismatched or invalid records are isolated instead of flowing downstream.
- **Fail-closed publication** — marts are only published when every check passes.
