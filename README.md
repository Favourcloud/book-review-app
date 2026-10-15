# Book Review App — Docker Compose

Eze Favour · DMI Week 11 Assignment 6 · 15 October 2026

Fork of [Pravin Mishra's Book Review App](https://github.com/pravinmishraaws/book-review-app). Codex prepared and tested this revision under the learner's authorization. This is a teaching application with synthetic users and reviews.

The Compose stack runs MySQL, an Express API and a production Next.js frontend. The backend waits for a successful MySQL query; the frontend waits for the backend's database-aware health endpoint. MySQL has no published port and sits on an internal network. The frontend and backend run as non-root users.

## Run

1. Copy `.env.example` to an untracked `.env` and generate unique passwords and a JWT secret.
2. Set `FRONTEND_ORIGIN` to `http://YOUR_VM_IP:3000` and `NEXT_PUBLIC_API_URL` to `http://YOUR_VM_IP:3001/api`. The `/api` suffix is required. Open only the frontend/API ports and restrict SSH to your own address; leave MySQL private.
3. Run `docker compose config --quiet`, then `docker compose build` and `docker compose up -d --wait`.
4. Open the frontend, register a synthetic account, log in, select a book and submit a review.
5. Run `docker compose down` and `docker compose up -d --wait`; log in again and verify the same review.

Next.js embeds `NEXT_PUBLIC_API_URL` during the image build. Changing the value requires rebuilding the frontend. `.env`, dependency folders and build output are excluded from Git and image build contexts. Older commits inherited from upstream contain a sample environment file; this revision removes it from tracking and does not use its values.

## Teardown and recovery

`docker compose down` removes this project's containers and networks while preserving `mysql_data`.
The MySQL files live in that named volume, so newly created containers reuse the same database.
Removing the volume deletes the stored users and reviews; an image rebuild does not restore them.
A full reset is useful only for a disposable test environment or an intentional database reset.
Capture and verify persistence evidence before considering a full reset.
Back up data before any destructive operation; a successful image build is not a database backup.

## Verified status

The 15 October **local Docker Desktop run passed 13 integration checks**, including authenticated review creation, allowed/refused CORS origins, preflight, and preservation of the same user and review after down/up. Browser registration, login and review creation were also performed. The assignment repository holds dated evidence and explicitly identifies it as local execution.

The public AWS deployment is **pending**. No VM URL in this README is presented as a verified running deployment. This lab follows the assignment's separate HTTP frontend/API ports; use synthetic data only, and add TLS and production authentication controls before real use.

[Week 11 submission and evidence](https://github.com/Favourcloud/devops-micro-internship-pravinmishra/tree/main/week-11-docker)
