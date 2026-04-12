## Project Overview

SIPRESTA is a web-based system for recording, organizing, and monitoring student achievements. The goal is to make data management more efficient, transparent, and structured.

## Detail Product & Requirement

### What the product must support

- Achievement CRUD (create, read, update, delete)
- Role-based access (admin, teacher, student)
- Evidence uploads (certificates, attachments)
- Reporting / export

### Example acceptance checklist

- [ ] User can submit an achievement with required fields
- [ ] Admin can approve / reject with notes
- [ ] Export generates correct totals

## Research & Planning

### Research summary (dummy)

We compared manual spreadsheet workflows versus a centralized system. The major pain points were duplicated entries, inconsistent formats, and hard-to-track approval statuses.

### Planning artifacts (dummy)

| Artifact | Purpose |
|---|---|
| User flow | Ensure key tasks are short |
| Data model | Normalize achievements & evidence |
| Permission matrix | Reduce mistakes by roles |

## UI Design & Prototype

Store images under `public/projects/sipresta/` and reference them like below.

![Login screen](/projects/sipresta/login.png)

![Achievement form](/projects/sipresta/form.png)

## Usability Test

### Test tasks (dummy)

1. Submit a new achievement and attach evidence
2. Find an approved achievement from last semester
3. Export a report for a class

### Observations (dummy)

- Users need clearer guidance for evidence requirements
- The export button should be easier to find
